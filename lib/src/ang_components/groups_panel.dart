part of angular_picker;

@Component(
    selector: 'groups-panel',
    templateUrl: 'package:lunch_picker/src/ang_templates/groups_panel.html')
class GroupsPanel {
  @Input()
  List<String> groups;

  String newGroup = "";
}
