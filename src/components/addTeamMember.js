/** @jsx React.DOM */
'use strict';
var React = require('react');
var TeamStore = require('../stores/teamStore');
var TextAreaValuesStore = require('../stores/textAreaValuesStore');
var TeamMemberStore = require('../stores/teamMemberStore');
var TeamMemberActionCreators = require('../actions/teamMemberActionCreators');
var TextAreaValueActionCreators = require('../actions/textAreaValueActionCreators');

function getStateFromStores() {
    return {
        textAreaDisabled: TeamStore.getCurrentTeam() === 'Pick Your Team...',
        buttonDisabled: TeamStore.getCurrentTeam() === 'Pick Your Team...' || TeamMemberStore.getNewTeamMemberDisabled(),
        newMemberValue: TextAreaValuesStore.getNewTeamMemberValue()
    };
}

var addUser = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        TeamStore.addChangeListener(this._onChange);
        TextAreaValuesStore.addChangeListener(this._onChange);
        TeamMemberStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TeamStore.removeChangeListener(this._onChange);
        TextAreaValuesStore.removeChangeListener(this._onChange);
        TeamMemberStore.removeChangeListener(this._onChange);
    },

    render: function() {

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Team-Member Manager</h3>
                </div>
                <div className="panel-body">
                    <form role="form">
                        <input
                            type="text"
                            value={this.state.newMemberValue}
                            className="form-group form-control"
                            disabled={this.state.textAreaDisabled}
                            placeholder='Insert User Name...'
                            onChange={this._handleTextChange}
                        />
                        <button
                            type="button"
                            className="form-group btn btn-md btn-primary"
                            disabled={this.state.buttonDisabled}
                            onClick={this._handleClick}>

                            Add User
                        </button>
                    </form>
                </div>
            </div>
        );
    },

    _handleClick: function() {
        var newMember = {
            name: this.state.newMemberValue,
            hasPicked: false,
            lastPicked: new Date(0)
        };
        TeamMemberActionCreators.createTeamMember(newMember);
    },

    _handleTextChange: function(event) {
        TextAreaValueActionCreators.handleNewTeamMemberValueChange(event.target.value);
    },

    /**
    * Event handler for 'change' events coming from the TeamStore
    */
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});


module.exports = addUser;