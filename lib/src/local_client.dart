part of picker_core;

const String GROUP_STORAGE_KEY = 'picker-storage-groups';
const String GROUP_ITEM_STORAGE_KEY = 'picker-storage-group_items';

class LocalPickerClient implements PickerClient {
  Storage _storage;

  List<Group> _groups;
  List<GroupItem> _groupItems;

  StreamController<Group> _groupAddedController;
  StreamController<Group> _groupRemovedController;

  StreamController<GroupItem> _groupItemAddedController;
  StreamController<GroupItem> _groupItemRemovedController;

  LocalPickerClient() {
    _storage = window.localStorage;

    _groups = new List<Group>();
    _groupItems = new List<GroupItem>();

    _groupAddedController = new StreamController<Group>();
    _groupRemovedController = new StreamController<Group>();

    _groupItemAddedController = new StreamController<GroupItem>();
    _groupItemRemovedController = new StreamController<GroupItem>();
  }

  // Lifecycle

  signIn() {
    // _clearData();
    _loadGroups();
    _loadGroupItems();
  }

  signOut() {}

  _loadGroups() {
    String data = _storage[GROUP_STORAGE_KEY];
    if (data != null) {
      _groups.clear();
      List<Map> rawGroups = JSON.decode(data) as List<Map>;
      rawGroups.forEach((rawGroup) {
        Group group = new Group.fromJson(rawGroup);
        _groups.add(group);
        _groupAddedController.add(group);
      });
    }
  }

  _loadGroupItems() {
    String data = _storage[GROUP_ITEM_STORAGE_KEY];
    if (data != null) {
      _groupItems.clear();
      List<Map> rawGroupItems = JSON.decode(data) as List<Map>;
      rawGroupItems.forEach((rawGroupItem) {
        GroupItem groupItem = new GroupItem.fromJson(rawGroupItem);
        _groupItems.add(groupItem);
        _groupItemAddedController.add(groupItem);
      });
    }
  }

  _saveGroups() => _storage[GROUP_STORAGE_KEY] = JSON.encode(_groups);

  _saveGroupItems() => _storage[GROUP_ITEM_STORAGE_KEY] = JSON.encode(_groupItems);

  _clearData() {
    _storage.remove(GROUP_STORAGE_KEY);
    _storage.remove(GROUP_ITEM_STORAGE_KEY);
  }

  // streams

  Stream<Group> get groupAdded => _groupAddedController.stream;

  Stream<Group> get groupRemoved => _groupRemovedController.stream;

  Stream<GroupItem> get groupItemAdded => _groupItemAddedController.stream;

  Stream<GroupItem> get groupItemRemoved => _groupItemRemovedController.stream;

  // update methods

  Future createGroup(Group group) async {
    _groups.add(group);
    _groupAddedController.add(group);
    _saveGroups();
  }

  Future removeGroup(Group group) async {
    _groups.remove(group);
    _groupRemovedController.add(group);
    _saveGroups();
  }

  Future createGroupItem(GroupItem groupItem) async {
    _groupItems.add(groupItem);
    _groupItemAddedController.add(groupItem);
    _saveGroupItems();
  }

  Future removeGroupItem(GroupItem groupItem) async {
    _groupItems.remove(groupItem);
    _groupItemRemovedController.add(groupItem);
    _saveGroupItems();
  }
}
