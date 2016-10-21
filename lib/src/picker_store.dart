part of lunch_picker;

class PickerStore extends flux.Store {

  List<String> _teams;

  Map<String, List<String>> _teamMembers;

  Map<String, Map<String, List<int>>> _teamMemberPickDates;

  String _activeTeam;

  String _activeMember;

  List<String> get teams => new List<String>.from(_teams);

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
    _teams = new List<String>();
    _teamMembers = new Map<String, List<String>>();
    _teamMemberPickDates = new Map<String, Map<String, List<int>>>();

    actions
        ..createTeam.listen(_createTeam)
        ..removeTeam.listen(_removeTeam)
        ..selectTeam.listen(_selectTeam)
        ..createTeamMember.listen(_createTeamMember)
        ..removeTeamMember.listen(_removeTeamMember)
        ..selectTeamMember.listen(_selectTeamMember)
        ..toggleTeamMemberActive.listen(_toggleTeamMemberActive)
        ..pick.listen(_pick);
  }

  // Action Handlers

  _createTeam(String team) {

  }

  _removeTeam(String team) {

  }

  _selectTeam(String team) {

  }

  _createTeamMember(String member) {

  }

  _removeTeamMember(String member) {

  }

  _selectTeamMember(String member) {

  }

  _toggleTeamMemberActive(String member) {

  }

  _pick(_) {

  }
}
