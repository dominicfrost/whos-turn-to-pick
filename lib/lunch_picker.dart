library lunch_picker;

import 'package:react/react.dart' as react;
import 'package:w_flux/w_flux.dart' as flux;

import 'package:lunch_picker/picker_core.dart';

part 'src/components/group_item_list.dart';
part 'src/components/group_item_panel.dart';
part 'src/components/group_panel.dart';
part 'src/components/picker.dart';

class LunchPicker {
  PickerActions _actions;
  PickerStore _store;

  PickerActions get actions => _actions;
  PickerStore get store => _store;

  LunchPicker() {
    _actions = new PickerActions();
    _store = new PickerStore(_actions);
  }

  component() => Picker({'actions': _actions, 'store': _store});
}
