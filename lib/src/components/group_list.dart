part of lunch_picker;

var GroupList = react.registerComponent(() => new _GroupList());

class _GroupList extends flux.FluxComponent<PickerActions, PickerStore> {
  getInitialState() {
    return {'newMemberValue': ''};
  }

  render() {
    var groupListItems = store.groups.map((Group group) {
      return react.li({}, react.a({}, group.name));
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
          'value': state['newMemberValue'],
          'disabled': false,
          'onChange': _onChange,
          'placeholder': 'Create new group...'
        }),
        react.button({
          'className': 'form-group btn btn-md btn-primary',
          'type': 'button',
          'disabled': false,
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
            '${store.activeTeam}',
            react.span({'className': 'caret'})
          ]),
          react.ul({'className': 'dropdown-menu', 'role': 'menu', 'arialabelledby': 'dropdownMenu1'}, groupListItems),
        ]),
      ])
    ]);
  }

  _onChange(react.SyntheticFormEvent event) {
    setState({'newMemberValue': event.target.value});
  }

  _onClick(_) {
    actions.createGroup(state['newMemberValue']);
  }
}
