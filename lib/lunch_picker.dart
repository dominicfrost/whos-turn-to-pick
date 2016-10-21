library lunch_picker;

import 'package:react/react.dart' as react;
import 'package:w_flux/w_flux.dart' as flux;

part 'src/picker_actions.dart';
part 'src/picker_store.dart';

part 'src/components/add_team_member.dart';
part 'src/components/picker.dart';
part 'src/components/team_list.dart';
part 'src/components/team_member_list.dart';

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
