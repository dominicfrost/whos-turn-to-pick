part of lunch_picker;

var Picker = react.registerComponent(() => new _Picker());

class _Picker extends react.Component {
  PickerStore get store => props['store'];
  PickerActions get actions => props['actions'];

  String get lastPickName => store.lastPick?.name ?? '';
  String get lastPickDate => store.lastPick?.lastPicked ?? '';

  componentDidMount() {
    store.listen((_) => redraw());
  }

  render() {
    return react.div(
        {},
        react.div(
            {'className': 'row'},
            react.div({
              'className': 'col-sm-4'
            }, [
              GroupPanel({'actions': actions, 'store': store}),
              GroupItemPanel({'actions': actions, 'store': store}),
              react.div({}, [
                react.button({
                  'className': 'btn btn-lg btn-primary',
                  'type': 'button',
                  'disabled': store.canPick,
                  'onClick': _onClick
                }, 'Who\'s picking lunch?'),
                react.h4({}, 'Last to choose: ${lastPickName} ${lastPickDate}'),
              ])
            ]),
            react.div({'className': 'col-sm-8'}, GroupItemList({'actions': actions, 'store': store}))));
  }

  _onClick(_) {
    actions.pick();
  }
}
