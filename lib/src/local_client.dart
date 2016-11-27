part of picker_core;

class LocalPickerClient implements PickerClient {

  StreamController<Group> _groupsController;

  StreamController<GroupItem> _groupItemsController;

  LocalPickerClient() {
    _groupsController = new StreamController<Group>();
    _groupItemsController = new StreamController<GroupItem>();
  }

  // Lifecycle

  signIn() {
    Group a = new Group("Group A");
    Group b = new Group("Group B");
    Group c = new Group("Group C");

    GroupItem a1 = new GroupItem("Item A1", a);
    GroupItem a2 = new GroupItem("Item A2", a);
    GroupItem a3 = new GroupItem("Item A3", a);

    _groupsController
      ..add(a)
      ..add(b)
      ..add(c);

    _groupItemsController
      ..add(a1)
      ..add(a2)
      ..add(a3);
  }

  signOut() {

  }


  // streams

  Stream<Group> get groupAdded => _groupsController.stream;

  Stream<Group> get groupRemoved => null;

  Stream<GroupItem> get groupItemAdded => _groupItemsController.stream;

  Stream<GroupItem> get groupItemRemoved => null;

  // update methods

  Future createGroup(Group group) async {
    _groupsController.add(group);
  }

  Future removeGroup(Group group) async {}

  Future createGroupItem(GroupItem groupItem) async {
    _groupItemsController.add(groupItem);
  }

  Future removeGroupItem(GroupItem groupItem) async {}
}
