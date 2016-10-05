import 'dart:html';

import 'package:react/react_client.dart' as react_client;
import 'package:react/react_dom.dart' as react_dom;

import 'package:lunch_picker/lunch_picker.dart';

LunchPicker picker;

main() async {
  react_client.setClientConfiguration();
  picker = new LunchPicker();
  react_dom.render(picker.component(), querySelector('#mainContainer'));
}
