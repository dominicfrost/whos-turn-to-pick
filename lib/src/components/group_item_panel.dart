part of lunch_picker;

var GroupItemPanel = react.registerComponent(() => new _GroupItemPanel());

class _GroupItemPanel extends flux.FluxComponent<PickerActions, PickerStore> {
  String get groupItemValue => state['groupItemValue'];

  Map getInitialState() => {'groupItemValue': ''};

  bool get buttonDisabled => !store.canCreateMember || groupItemValue == '';

  bool get inputDisabled => !store.canCreateMember;

  componentDidMount() {
    store.listen((_) => redraw());
  }

  render() {
    return react.div({
      'className': 'panel panel-default'
    }, [
      react.div({'className': 'panel-heading'}, 'Group Items'),
      react.div(
          {'className': 'panel-body'},
          react.form({
            'role': 'form'
          }, [
            react.input({
              'className': 'form-group form-control',
              'type': 'text',
              'value': groupItemValue,
              'disabled': inputDisabled,
              'onChange': _onChange,
              'placeholder': 'Insert group item ...'
            }),
            react.button({
              'className': 'form-group btn btn-md btn-primary',
              'type': 'button',
              'disabled': buttonDisabled,
              'onClick': _onClick
            }, 'Insert')
          ]))
    ]);
  }

  _onChange(react.SyntheticFormEvent event) {
    setState({'groupItemValue': event.target.value});
  }

  _onClick(_) {
    setState({'groupItemValue': ''});
    actions.createGroupItem(groupItemValue);
  }
}
