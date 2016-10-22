part of lunch_picker;

var GroupPanel = react.registerComponent(() => new _GroupPanel());

class _GroupPanel extends flux.FluxComponent<PickerActions, PickerStore> {
  String get groupValue => state['groupValue'];

  getInitialState() {
    return {'groupValue': ''};
  }

  componentDidMount() {
    store.listen((_) => redraw());
  }

  render() {
    var groupListItems = store.groups.map((Group group) {
      return react.li({}, react.a({'onClick': (_) => actions.selectGroup(group)}, group.name));
    });

    return react.div({
      'className': 'panel panel-default'
    }, [
      react.div({'className': 'panel-heading'}, 'Groups'),
      react.div({
        'className': 'panel-body'
      }, [
        react.input({
          'className': 'form-group form-control',
          'type': 'text',
          'value': groupValue,
          'disabled': false,
          'onChange': _onChange,
          'placeholder': 'Create new group ...'
        }),
        react.button({
          'className': 'form-group btn btn-md btn-primary',
          'type': 'button',
          'disabled': groupValue == '',
          'onClick': _onClick
        }, 'Create'),
        react.div({
          'className': 'btn-group',
          'style': {'float': 'right'}
        }, [
          react.button({
            'className': 'btn btn-default dropdown-toggle',
            'type': 'button',
            'id': 'dropdownMenu1',
            'data-toggle': 'dropdown'
          }, [
            '${store.activeGroup?.name ?? ''}',
            react.span({'className': 'caret'})
          ]),
          react.ul({'className': 'dropdown-menu', 'role': 'menu', 'arialabelledby': 'dropdownMenu1'}, groupListItems),
        ]),
      ])
    ]);
  }

  _onChange(react.SyntheticFormEvent event) {
    setState({'groupValue': event.target.value});
  }

  _onClick(_) {
    setState({'groupValue': ''});
    actions.createGroup(groupValue);
  }
}
