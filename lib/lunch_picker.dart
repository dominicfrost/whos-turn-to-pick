library lunch_picker;

import 'dart:async';

import 'package:react/react.dart' as react;
import 'package:w_flux/w_flux.dart' as flux;
import 'package:firebase3/firebase.dart' as firebase;

part 'src/picker_actions.dart';
part 'src/picker_store.dart';
part 'src/firebase_client.dart';

part 'src/components/add_group_item.dart';
part 'src/components/group_item_list.dart';
part 'src/components/group_list.dart';
part 'src/components/picker.dart';

part 'src/models/group.dart';
part 'src/models/group_item.dart';

const String PICKER_KEY = 'Lunch picker';
const String TEAM_NOT_FOUND = '';
const String TEAM_MEMBER_NOT_FOUND = '';

class LunchPicker {
  PickerActions _actions;
  PickerStore _store;

  PickerActions get actions => _actions;
  PickerStore get store => _store;

  LunchPicker() {
    _actions = new PickerActions();
    _store = new PickerStore(_actions);
  }

  component() => Picker({PICKER_KEY: this});
}
