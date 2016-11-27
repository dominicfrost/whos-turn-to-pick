part of angular_picker;

@Component(
    selector: 'add-group-item-panel',
    templateUrl: 'package:lunch_picker/src/ang_templates/add_group_item_panel_template.html')
class AddGroupItemPanelComponent {
  @Input()
  PickerActions actions;

  @Input()
  Group activeGroup;

  String newGroupItem = "";
}
