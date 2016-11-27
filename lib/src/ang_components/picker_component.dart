part of angular_picker;

@Component(
    selector: 'picker-app',
    templateUrl: 'package:lunch_picker/src/ang_templates/picker_template.html',
    directives: const [AddGroupItemPanelComponent, GroupItemsPanelComponent, GroupsPanelComponent]
  )
class PickerComponent {
  PickerActions _actions;
  PickerStore _store;

  PickerActions get actions => _actions;

  // template state

  List<Group> get groups => _store.groups;

  Group get activeGroup => _store.activeGroup;

  List<GroupItem> get activeGroupItems => _store.getItemsInGroup(_store.activeGroup);

  GroupItem get lastPick => _store.lastPick;

  PickerComponent() {
    _actions = new PickerActions();
    _store = new PickerStore(_actions);
  }
}
