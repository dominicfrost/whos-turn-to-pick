part of picker_core;

class GroupItem {
  String name;
  Group group;
  int lastPicked;
  bool hasPicked;

  GroupItem(this.name, this.group, {this.lastPicked: 0, this.hasPicked: false});

  GroupItem.fromJson(Map json) {
    this.name = json['name'];
    this.group = new Group.fromJson(json['group']);
    this.lastPicked = json['lastPicked'];
    this.hasPicked = json['hasPicked'];
  }

  Map toJson() {
    return {
      'name': this.name,
      'group': this.group.toJson(),
      'lastPicked': this.lastPicked,
      'hasPicked': this.hasPicked,
    };
  }

  String toString() {
    return 'GroupItem(name: $name, group: $group, lastPicked: $lastPicked, hasPicked: $hasPicked)';
  }
}
