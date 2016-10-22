part of lunch_picker;

var GroupItemList = react.registerComponent(() => new _GroupItemList());

class _GroupItemList extends flux.FluxComponent<PickerActions, PickerStore> {
  componentDidMount() {
    store.listen((_) => redraw());
  }

  render() {
    return react.div({
      'className': 'panel panel-default'
    }, [
      react.div({'className': 'panel-heading'}, 'Group Item List'),
      react.div({
        'className': 'panel-body'
      }, [
        react.div({
          'className': 'row'
        }, [
          react.div({
            'className': 'col-sm-6'
          }, [
            react.h4({}, 'Can Pick'),
            react.div({'className': 'list-group'}),
          ]),
          react.div({
            'className': 'col-sm-6'
          }, [
            react.h4({}, 'Already Chosen'),
            react.div({'className': 'list-group'}),
          ]),
        ]),
        react.div(
            {'className': 'row'},
            react.span({
              'className': ''
            }, [
              react.em({}, 'Note:'),
              ' To disable a team member from the current round of picks, just click on their name',
            ])),
      ]),
    ]);
  }
}
