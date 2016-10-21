part of lunch_picker;

class PickerActions {
  final flux.Action<String> createGroup = new flux.Action();
  final flux.Action<Group> removeGroup = new flux.Action();
  final flux.Action<String> selectGroup = new flux.Action();

  final flux.Action<String> createGroupItem = new flux.Action();
  final flux.Action<String> removeGroupItem = new flux.Action();
  final flux.Action<String> selectGroupItem = new flux.Action();
  final flux.Action<String> toggleGroupItemActive = new flux.Action();

  final flux.Action pick = new flux.Action();
}
