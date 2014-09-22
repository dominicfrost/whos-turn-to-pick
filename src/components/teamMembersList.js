/** @jsx React.DOM */
'use strict';
var React = require('react');
var TeamActionCreators = require('../actions/teamActionCreators');
var TeamMemberActionCreators = require('../actions/teamMemberActionCreators');
var TeamStore = require('../stores/teamStore');
var TeamMemberStore = require('../stores/teamMemberStore');

var uniqueKey = 0;

function getStateFromStores() {
    return {
        teamMembers: TeamMemberStore.getAllTeamMembers(),
        currentTeam: TeamStore.getCurrentTeam()
    }
}

var teamMembersList = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        TeamStore.addChangeListener(this._onChange);
        TeamMemberStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TeamStore.removeChangeListener(this._onChange);
        TeamMemberStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var buttonStyle =  {
            position: 'absolute',
            'right': '5px'
        };

        var removeTeamButtonStyle =  {
            position: 'absolute',
            'right': '22px'
        };

        this.state.teamMembers.sort(function compare(a, b) {
            if (new Date(a.lastPicked).valueOf() < new Date(b.lastPicked).valueOf()) {
                return -1;
            } else if (new Date(a.lastPicked).valueOf() > new Date(b.lastPicked).valueOf()) {
                return 1;
            } else {
                return 0;
            }
        });

        var self = this;
        var canPick = this.state.teamMembers.map(function(teamMember) {
            function handleClick(event) {
                self._handleMemberRemoved(event, teamMember)
            }
            if (!teamMember.hasPicked) {
                return <li className="list-group-item" key={'canPick_' + uniqueKey++}>
                            {teamMember.name}
                            <button type="button" className="btn btn-xs btn-primary" style={buttonStyle} onClick={handleClick}>x</button>
                        </li>
            }
        });
        var canNotPick = this.state.teamMembers.map(function(teamMember) {
            function handleClick(event) {
                self._handleMemberRemoved(event, teamMember)
            }
            if (teamMember.hasPicked) {
                return <li className="list-group-item" key={'cantPick_' + uniqueKey++}>
                            {teamMember.name} {self.formatDate(teamMember.lastPicked)}
                            <button type="button" className="btn btn-xs btn-primary" style={buttonStyle} onClick={handleClick}>x</button>
                        </li>
            }
        });


        var currentTeamDiv = <div>
                                Team: n/a
                            </div>;

        if (this.state.currentTeam && this.state.currentTeam !== '' && this.state.currentTeam !== 'Pick Your Team...') {
            currentTeamDiv = <div>
                                Team: {this.state.currentTeam}
                                <button type="button" className="btn btn-xs btn-primary" style={removeTeamButtonStyle} onClick={this._handleTeamRemoved}>Remove Team</button>
                            </div>;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{currentTeamDiv}</h3>
                </div>
                <div className="panel-body">
                    <div className="col-sm-6">
                        <h4>Can Pick</h4>
                        <ul className="list-group">
                            {canPick}
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <h4>Already Chosen</h4>
                        <ul className="list-group">
                            {canNotPick}
                        </ul>
                    </div>
                </div>
            </div>
        );
    },

    _handleTeamRemoved: function() {
        var response = confirm('Remove ' + this.state.currentTeam + ' from the team list?');
        if (response) {
            TeamActionCreators.removeTeam(this.state.currentTeam);
        }
    },

    _handleMemberRemoved: function(event, teamMember) {
        var name = teamMember.name;
        var response = confirm('Remove ' + name + ' from the team?');
        if (response) {
            TeamMemberActionCreators.removeTeamMember(teamMember);
        }
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


module.exports =  teamMembersList;
