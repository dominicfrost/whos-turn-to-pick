/** @jsx React.DOM */
'use strict';
var React = require('react');
var TeamActionCreators = require('../actions/teamActionCreators');
var TeamStore = require('../stores/teamStore');

var uniqueKey = 0;

function getStateFromStores() {
    return {
        teams: TeamStore.getAllTeams(),
        value: TeamStore.getCurrentTeam(),
        textValue: ''
    };
}

var teamList = React.createClass({

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
        var self = this;

        var teamsList = this.state.teams.map(function(team) {

            function handleClick() {
                self._handleSelectionChange(team);
            }
            return  <li role="presentation" key={'team_' + uniqueKey++} onClick={handleClick}>
                        <a role="menuitem" tabindex="-1">{team.name}</a>
                    </li>
        });

        var floatRight = {
            float: "right"
        };

        var name = this.state.textValue;
        var createTeamDisabled = name === '' || this.teamExists(name);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Team Manager</h3>
                </div>
                <div role="form" className="panel-body">
                    <input className="form-group form-control" placeholder="Insert Team Name..." ref="textarea" onChange={this._handleTextChange} value={this.state.textValue}></input>
                    <button type="button" className="btn btn-md btn-primary" disabled={createTeamDisabled} onClick={this._handleClick}>Create Team</button>
                    <div className="dropdown" style={floatRight}>
                        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
                            {this.state.value + "  "}
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                            {teamsList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    },

    _handleTextChange: function(event) {
        var name = event.target.value.replace(/\s/g, '');

        this.setState({
            textValue: name.length > 20 ? this.state.textValue : name
        });
    },

    _handleClick: function() {
        TeamActionCreators.createTeam(this.state.textValue);
    },

    _handleSelectionChange: function(team) {
        TeamActionCreators.selectTeam(team);
    },

    teamExists: function(teamName) {
        for (var i = 0; i < this.state.teams.length; i++) {
            if (this.state.teams[i].name === teamName) {
                return true;
            }
        }
        return false;
    },

    /**
    * Event handler for 'change' events coming from the TeamStore
    */
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports =  teamList;
