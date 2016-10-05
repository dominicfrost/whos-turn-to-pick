part of lunch_picker;

class PickerActions {
  final flux.Action<String> createTeam = new flux.Action<String>();
  final flux.Action<String> removeTeam = new flux.Action<String>();
  final flux.Action<String> selectTeam = new flux.Action<String>();

  final flux.Action<String> createTeamMember = new flux.Action<String>();
  final flux.Action<String> removeTeamMember = new flux.Action<String>();
  final flux.Action<String> selectTeamMember = new flux.Action<String>();
  final flux.Action<String> toggleTeamMemberActive = new flux.Action<String>();

  final flux.Action pick = new flux.Action();
}
