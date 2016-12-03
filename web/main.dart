// import 'dart:html';
// import 'package:react/react_client.dart' as react_client;
// import 'package:react/react_dom.dart' as react_dom;
// import 'package:lunch_picker/lunch_picker.dart';

import 'package:angular2/platform/browser.dart';
import 'package:lunch_picker/angular_picker.dart';

main() async {
  // react_client.setClientConfiguration();
  // LunchPicker picker = new LunchPicker();
  // react_dom.render(picker.component(), querySelector('#mainContainer'));

  bootstrap(PickerComponent);
}
