part of picker_core;

const String NO_GROUP_ADDED = "";

class PickerStore extends flux.Store {
  PickerClient _client;

  List<Group> _groups;
  List<Group> get groups => new List.from(_groups);

  List<GroupItem> _groupItems;
  List<GroupItem> get groupItems => new List.from(_groupItems);

  String _addedGroupName = NO_GROUP_ADDED;

  Group _activeGroup;
  Group get activeGroup => _activeGroup;

  bool get activeGroupHasItems => _groupItems.any((GroupItem item) => item.group.name == activeGroup.name);

  List<GroupItem> getItemsInGroup(Group group) {
    return new List<GroupItem>.from(_groupItems.where((GroupItem item) => item.group.name == group?.name));
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

    // resolve persistence method
    switch (Uri.base.queryParameters['mode']) {
      case 'prod':
        _client = new FirebaseClient();
        break;
      case 'local':
        _client = new LocalPickerClient();
        break;
      default:
        if (Uri.base.host == 'localhost') {
          _client = new LocalPickerClient();
        } else {
          _client = new FirebaseClient();
        }
    }

    _client
      ..groupAdded.listen(_groupAddedHandler)
      ..groupRemoved.listen(_groupremovedHandler)
      ..groupItemAdded.listen(_groupItemAddedHandler)
      ..groupItemRemoved.listen(_groupItemRemovedHandler);

    _client.signIn();
  }

  // Client event handlers

  void _groupAddedHandler(Group newGroup) {
    _groups.add(newGroup);
    if (newGroup.name == _addedGroupName) {
      _activeGroup = newGroup;
      _addedGroupName = NO_GROUP_ADDED;
    }
    print("_groupAddedHandler $newGroup : ${groups}");
    trigger();
  }

  void _groupremovedHandler(Group oldGroup) {
    print("_groupremovedHandler $oldGroup : ${groups}");
  }

  void _groupItemAddedHandler(GroupItem newGroupItem) {
    _groupItems.add(newGroupItem);
    print("_groupItemAddedHandler $newGroupItem : ${groupItems}");
    trigger();
  }

  void _groupItemRemovedHandler(GroupItem oldGroupItem) {
    print("_groupItemRemovedHandler $oldGroupItem : ${groupItems}");
  }

  // Action Handlers

  _createGroup(String groupName) {
    print("_createGroup ($groupName)");
    Group group = new Group(groupName);
    _addedGroupName = groupName;
    _client.createGroup(group);
  }

  _removeGroup(Group group) {
    print("_removeGroup ($group)");
    _client.removeGroup(group);
  }

  _selectGroup(Group group) {
    print("_selectGroup ($group)");
    _activeGroup = group;
    trigger();
  }

  _createGroupItem(String groupItemName) {
    print("_createGroupItem ($groupItemName)");
    if (activeGroup == null) return;
    if (groupItemName.isEmpty) return;

    var groupItem = new GroupItem(groupItemName, activeGroup);
    _client.createGroupItem(groupItem);
  }

  _removeGroupItem(String member) {
    print("_removeGroupItem ($member)");
  }

  _selectGroupItem(String member) {
    print("_selectGroupItem ($member)");
  }

  _toggleGroupItemActive(String member) {
    print("_toggleGroupItemActive ($member)");
  }

  _pick(_) {
    print("_pick");
  }
}
