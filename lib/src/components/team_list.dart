part of lunch_picker;

var TeamList = react.registerComponent(() => new _TeamList());
class _TeamList extends flux.FluxComponent<PickerActions, PickerStore> {

  String get activeTeam => store.activeTeam;

  render() {
    return react.div({'className': 'panel panel-default'}, [
      react.div({'className': 'panel-heading'}, 'Team Manager'),
      react.div({'className': 'panel-body'}, [
        react.input({'className': 'form-group form-control', 'type': 'text', 'value': 'newMemberValue', 'disabled': false, 'onChange': _onChange, 'placeholder': 'Insert Team Name...'}),
        react.button({'className': 'form-group btn btn-md btn-primary', 'type': 'button', 'disabled': false, 'onClick': _onClick}, 'Add Team'),
        react.div({'className': 'btn-group', 'style': {'float': 'right'}}, [
          react.button({'className': 'btn btn-default dropdown-toggle', 'type': 'button', 'id': 'dropdownMenu1', 'data-toggle': 'dropdown'}, [
            '${activeTeam}',
            react.span({'className': 'caret'})
          ]),
          react.ul({'className': 'dropdown-menu', 'role': 'menu', 'arialabelledby': 'dropdownMenu1'}),
        ]),
      ])
    ]);
  }

  _onChange(String value) {
    print(value);
    setState({'newMemberValue': value});
  }

  _onClick(_) {
    actions.createTeam(newTeamValue);
  }
}
