part of lunch_picker;

class PickerStore extends flux.Store {
  FirebaseClient fbClient;

  List<Group> _groups;
  List<Group> get groups => new List.from(_groups);

  List<GroupItem> _groupItems;
  List<GroupItem> get groupItems => new List.from(_groupItems);

  Map<String, List<String>> _teamMembers;

  Map<String, Map<String, List<int>>> _teamMemberPickDates;

  String _activeTeam;

  String _activeMember;

  List<String> members(String team) => new List<String>.from(_teamMembers[team]);

  String get activeTeam => _activeTeam ?? TEAM_NOT_FOUND;

  String get activeMember => _activeMember ?? TEAM_MEMBER_NOT_FOUND;

  bool get canCreateMember => _activeTeam != null;

  /// Returns true if there is an active team, and that team has members.
  bool get canPick => _activeTeam != null && members(_activeTeam).isNotEmpty;

  List<int> pickDates(String team, String member) {
    if (_teamMemberPickDates.containsKey(team) && _teamMemberPickDates[team].containsKey(member)) {
      return _teamMemberPickDates[team][member];
    }
    return new List<int>();
  }

  /// Returns the name of the member with the most recent pick from the active team.
  String get lastPicker {
    String lastMember = TEAM_MEMBER_NOT_FOUND;
    int lastDate;
    if (activeTeam == TEAM_NOT_FOUND) return lastMember;
    members(_activeTeam).forEach((member) {
      List<int> dates = pickDates(_activeTeam, member);
      if (dates.isNotEmpty && (lastDate == null || dates.last > lastDate)) {
        lastMember = member;
        lastDate = dates.last;
      }
    });
    return lastMember;
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

  _createGroup(String group) {
    fbClient.createGroup(group);
  }

  _removeGroup(Group group) {
    fbClient.removeGroup(group);
  }

  _selectGroup(String team) {}

  _createGroupItem(String member) {}

  _removeGroupItem(String member) {}

  _selectGroupItem(String member) {}

  _toggleGroupItemActive(String member) {}

  _pick(_) {}
}
