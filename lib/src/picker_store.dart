part of lunch_picker;

class PickerStore extends flux.Store {
  FirebaseClient fbClient;

  List<Group> _groups;
  List<Group> get groups => new List.from(_groups);

  List<GroupItem> _groupItems;
  List<GroupItem> get groupItems => new List.from(_groupItems);

  Group _activeGroup;
  Group get activeGroup => _activeGroup;

  bool get activeGroupHasItems => _groupItems.any((GroupItem item) => item.group.name == activeGroup.name);

  List<GroupItem> getItemsInGroup(Group group) {
    return _groupItems.where((GroupItem item) => item.group.name == group.name);
  }

  Map<String, Map<String, List<int>>> _teamMemberPickDates;

  bool get canCreateMember => _activeGroup != null;

  /// Returns true if there is an active group, and that group has members.
  bool get canPick => _activeGroup != null && activeGroupHasItems;

  List<int> pickDates(String team, String member) {
    if (_teamMemberPickDates.containsKey(team) && _teamMemberPickDates[team].containsKey(member)) {
      return _teamMemberPickDates[team][member];
    }
    return new List<int>();
  }

  /// Returns the name of the member with the most recent pick from the active team.
  GroupItem get lastPick {
    int oldestDate = new DateTime.now().millisecondsSinceEpoch;
    GroupItem lastItem;
    getItemsInGroup(activeGroup).forEach((GroupItem item) {
      if (item.lastPicked < oldestDate) {
        oldestDate = item.lastPicked;
        lastItem = item;
      }
    });

    return lastItem;
  }

  PickerStore(PickerActions actions) {
    _groups = new List<Group>();
    _groupItems = new List<GroupItem>();

    fbClient = new FirebaseClient();
    fbClient.signIn();

    // firebase subs
    fbClient.fbGroups.onChildAdded.listen(groupAdded);
    fbClient.fbGroupItems.onChildAdded.listen(groupItemAdded);

    // action subs
    actions
      ..createGroup.listen(_createGroup)
      ..removeGroup.listen(_removeGroup)
      ..selectGroup.listen(_selectGroup)
      ..createGroupItem.listen(_createGroupItem)
      ..removeGroupItem.listen(_removeGroupItem)
      ..selectGroupItem.listen(_selectGroupItem)
      ..toggleGroupItemActive.listen(_toggleGroupItemActive)
      ..pick.listen(_pick);
  }

  // Firebase child listeners
  void groupAdded(firebase.QueryEvent event) {
    _groups.add(new Group.fromJson(event.snapshot.val()));
    trigger();
  }

  void groupItemAdded(firebase.QueryEvent event) {
    _groupItems.add(new GroupItem.fromJson(event.snapshot.val()));
    trigger();
  }

  // Action Handlers

  _createGroup(String groupName) {
    Group group = new Group(groupName);
    _activeGroup = group;
    fbClient.createGroup(group);
    trigger();
  }

  _removeGroup(Group group) {
    fbClient.removeGroup(group);
  }

  _selectGroup(Group group) {
    _activeGroup = group;
    trigger();
  }

  _createGroupItem(String groupItemName) {
    if (activeGroup == null) return;

    var groupItem = new GroupItem(groupItemName, activeGroup);
    fbClient.createGroupItem(groupItem);
    trigger();
  }

  _removeGroupItem(String member) {}

  _selectGroupItem(String member) {}

  _toggleGroupItemActive(String member) {}

  _pick(_) {}
}
