part of lunch_picker;

var TeamMemberList = react.registerComponent(() => new _TeamMemberList());
class _TeamMemberList extends flux.FluxComponent<PickerActions, PickerStore> {
  render() {
    return react.div({'className': 'panel panel-default'}, [
      react.div({'className': 'panel-heading'}, 'Team Manager'),
      react.div({'className': 'panel-body'}, [
        react.div({'className': 'row'}, [
          react.div({'className': 'col-sm-6'}, [
            react.h4({}, 'Can Pick'),
            react.div({'className': 'list-group'}),
          ]),
          react.div({'className': 'col-sm-6'}, [
            react.h4({}, 'Already Chosen'),
            react.div({'className': 'list-group'}),
          ]),
        ]),
        react.div({'className': 'row'},
          react.span({'className': ''}, [
            react.em({}, 'Note:'),
            ' To disable a team member from the current round of picks, just click on their name',
          ])
        ),
      ]),
    ]);
  }
}
