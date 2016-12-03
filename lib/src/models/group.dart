part of picker_core;

class Group {
  String name;
  Group(this.name);

  Group.fromJson(Map json) {
    if (json == null) {
      print('Can not construct Group from null map.');
    }
    this.name = json['name'];
  }

  Map toJson() {
    return {'name': this.name};
  }

  String toString() {
    return 'Group(name: $name)';
  }
}
