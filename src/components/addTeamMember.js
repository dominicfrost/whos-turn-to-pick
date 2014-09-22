/** @jsx React.DOM */
'use strict';
var React = require('react');
var TeamStore = require('../stores/teamStore');
var TeamMemberActionCreators = require('../actions/teamMemberActionCreators');

function getStateFromStores() {
    return {
        disabled: TeamStore.getCurrentTeam() === 'Pick Your Team...'
    };
}

var addUser = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        TeamStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TeamStore.removeChangeListener(this._onChange);
    },

    render: function() {

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Team-Member Manager</h3>
                </div>
                <div className="panel-body">
                    <form role="form">
                        <input type="text" className="form-group form-control" disabled={this.state.disabled} placeholder='Insert User Name...' ref='textarea'/>
                        <button type="button" className="form-group btn btn-md btn-primary" disabled={this.state.disabled} onClick={this._handleClick}>Add User</button>
                    </form>
                </div>
            </div>
        );
    },

    _handleClick: function() {
        var newMember = {
            name: this.refs.textarea.state.value,
            hasPicked: false,
            lastPicked: new Date(0)
        };
        this.refs.textarea.state.value = '';
        TeamMemberActionCreators.createTeamMember(newMember);
    },

    /**
    * Event handler for 'change' events coming from the TeamStore
    */
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});


module.exports = addUser;