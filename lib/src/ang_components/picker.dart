part of angular_picker;

@Component(
    selector: 'picker-app',
    templateUrl: 'package:lunch_picker/src/ang_templates/picker.html',
    directives: const [AddGroupItemPanel, GroupItemsPanel, GroupsPanel]
  )
class PickerComponent {
  // String currentGroup = 'My Group';
  String lastPickGroupItem = 'My Group Item';
  String lastPickDate = 'Wednesday';

  List<String> groups;
  Map<String, List<String>> groupItems;

  int activeGroupIndex = 0;

  String get currentGroup => groups[activeGroupIndex];
  List<String> get currentGroupItems => groupItems[currentGroup];

  PickerComponent() {
    groups = ["Group A", "Group B"];
    groupItems = {
      groups[0]: ["GA Item 1", "GA Item 2"],
      groups[1]: ["GB Item 1", "GB Item 2", "GB Item 3"]
    };
  }
}
