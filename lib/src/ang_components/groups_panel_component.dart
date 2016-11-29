part of angular_picker;

@Component(
    selector: 'groups-panel',
    templateUrl: 'package:lunch_picker/src/ang_templates/groups_panel_template.html')
class GroupsPanelComponent {
  @Input()
  PickerActions actions;

  @Input()
  List<Group> groups;

  @Input()
  Group activeGroup;
}
