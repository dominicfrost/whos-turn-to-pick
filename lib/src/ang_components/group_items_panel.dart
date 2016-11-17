part of angular_picker;

@Component(
    selector: 'group-items-panel',
    templateUrl: 'package:lunch_picker/src/ang_templates/group_items_panel.html')
class GroupItemsPanel {
  @Input()
  String group = "";

  @Input()
  List<String> groupItems = new List<String>();

  Set<int> inactiveItems = new Set<int>();
}
