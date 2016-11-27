part of picker_core;

abstract class PickerClient {

  // Lifecycle

  signIn();

  signOut();

  // streams

  Stream<Group> get groupAdded;

  Stream<Group> get groupRemoved;

  Stream<GroupItem> get groupItemAdded;

  Stream<GroupItem> get groupItemRemoved;

  // update methods

  Future createGroup(Group group);

  Future removeGroup(Group group);

  Future createGroupItem(GroupItem groupItem);

  Future removeGroupItem(GroupItem groupItem);
}
