/** @jsx React.DOM */
'use strict';
var React = require('react');
var TeamMemberStore = require('../stores/teamMemberStore');
var TeamMemberActionCreators = require('../actions/teamMemberActionCreators');



function getStateFromStores() {
    return {
        teamMembers: TeamMemberStore.getAllTeamMembers(),
        currentPicker: TeamMemberStore.getCurrentPicker()
    };
}

var picker = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        TeamMemberStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TeamMemberStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var lastPickerDate = '';
        for (var i = 0, len = this.state.teamMembers.length; i < len; i++) {
            if (this.state.currentPicker && this.state.currentPicker.name === this.state.teamMembers[i].name) {
                lastPickerDate = this.formatDate(this.state.teamMembers[i].lastPicked);
                break;
            }
        }

        var currentPicker = this.state.currentPicker ? this.state.currentPicker.name : '';

        var disabled = false;

        return (
            <div>
                <button type="button" className="btn btn-lg btn-primary" disabled={disabled} onClick={this._handleClick}>{"Whose Picking Lunch?"}</button>
                <h4>Last To Choose: {currentPicker} {lastPickerDate}</h4>
            </div>
        );
    },

    _handleClick: function() {
        var canPickMembers = [];
        var teamMembers = this.state.teamMembers;
        for (var i = 0, len = teamMembers.length; i < len; i++) {
            var teamMember = teamMembers[i];
            if (!teamMember.hasPicked) {
                canPickMembers.push(teamMember);
            }
        }
        var pickerIndex = Math.floor(Math.random() * canPickMembers.length);

        TeamMemberActionCreators.pick(canPickMembers[pickerIndex]);
    },

    formatDate: function(dateString) {
        var date = new Date(dateString);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getYear() - 100);
    },

    /**
    * Event handler for 'change' events coming from the TeamStore
    */
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports =  picker;
