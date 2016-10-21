part of lunch_picker;

var Picker = react.registerComponent(() => new _Picker());

class _Picker extends react.Component {
  LunchPicker get picker => props[PICKER_KEY];

  String get lastPicker => picker.store.lastPicker;

  String get lastDate => lastPicker != TEAM_MEMBER_NOT_FOUND
      ? picker.store.pickDates(picker.store.activeTeam, lastPicker).last.toString()
      : '';

  render() {
    return react.div(
        {},
        react.div(
            {'className': 'row'},
            react.div({
              'className': 'col-sm-4'
            }, [
              TeamList({'actions': picker.actions, 'store': picker.store}),
              AddTeamMember({'actions': picker.actions, 'store': picker.store}),
              react.div({}, [
                react.button({
                  'className': 'btn btn-lg btn-primary',
                  'type': 'button',
                  'disabled': picker.store.canPick,
                  'onClick': _onClick
                }, 'Who\'s picking lunch?'),
                react.h4({}, 'Last to choose: ${lastPicker} ${lastDate}'),
              ])
            ]),
            react.div({'className': 'col-sm-8'}, TeamMemberList({'actions': picker.actions, 'store': picker.store}))));
  }

  _onClick(_) {
    picker.actions.pick();
  }
}
