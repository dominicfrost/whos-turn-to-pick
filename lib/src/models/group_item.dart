part of lunch_picker;

class GroupItem {
  String name;
  Group group;
  String lastPicked;
  String hasPicked;

  GroupItem(this.name, this.group, {this.lastPicked, this.hasPicked});

  GroupItem.fromJson(Map json) {
    this.name = json['name'];
    this.group = new Group(json['group']);
    this.lastPicked = json['lastPicked'];
    this.hasPicked = json['hasPicked'];
  }

  Map toJson() {
    return {
      'name': this.name,
      'group': this.group,
      'lastPicked': this.lastPicked,
      'hasPicked': this.hasPicked,
    };
  }
}
