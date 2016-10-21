part of lunch_picker;

var AddTeamMember = react.registerComponent(() => new _AddTeamMember());
class _AddTeamMember extends flux.FluxComponent<PickerActions, PickerStore> {

  String get newMemberValue => state['newMemberValue'];

  Map getInitialState() => {'newMemberValue': ''};

  bool get buttonDisabled => store.canCreateMember && newMemberValue == '';

  bool get inputDisabled => store.canCreateMember;

  render() {
    return react.div({'className': 'panel panel-primary'}, [
      react.div({'className': 'panel-heading'}, 'Team Member Manager'),
      react.div({'className': 'panel-body'},
        react.form({'role': 'form'}, [
          react.input({'className': 'form-group form-control', 'type': 'text', 'value': newMemberValue, 'disabled': inputDisabled, 'onChange': _onChange, 'placeholder': 'Insert User Name...'}),
          react.button({'className': 'form-group btn btn-md btn-primary', 'type': 'button', 'disabled': buttonDisabled, 'onClick': _onClick}, 'Add Member')
        ])
      )
    ]);
  }

  _onChange(String value) {
    print(value);
    setState({'newMemberValue': value});
  }

  _onClick(_) {
    actions.createTeamMember(newMemberValue);
  }
}
