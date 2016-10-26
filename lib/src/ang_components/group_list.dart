part of angular_picker;

@Component(
    selector: 'group-list',
    templateUrl: 'package:lunch_picker/src/ang_templates/group_list.html')
class GroupList {
  String newGroupName = "";

  @Input()
  List<String> groups;
}
