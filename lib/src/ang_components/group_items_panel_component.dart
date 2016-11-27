part of angular_picker;

@Component(
    selector: 'group-items-panel',
    templateUrl: 'package:lunch_picker/src/ang_templates/group_items_panel_template.html')
class GroupItemsPanelComponent {
  @Input()
  PickerActions actions;

  @Input()
  Group group;

  @Input()
  List<GroupItem> groupItems;
}
