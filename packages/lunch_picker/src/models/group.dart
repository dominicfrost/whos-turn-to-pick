part of lunch_picker;

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
}