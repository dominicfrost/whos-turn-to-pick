/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 0;

	var teamList = React.createClass({

		getInitialState: function() {
			return {
				value: '',
				textValue:'',
				createTeamDisabled: true
			};
		},

		render: function() {

			var teamsList = this.props.teams.map(function(team, index) {
				return <option key={'team_' + uniqueKey++} value={team.name}>{team.name}</option>
			});

			return (
			<div className="panel panel-default">
            	<div className="panel-heading">
              		<h3 className="panel-title">Team Manager</h3>
            	</div>
            	<div role="form" className="panel-body">
					<input className="form-group form-control" placeholder="Insert Team Name..." ref="textarea" onChange={this._handleTextChange} value={this.state.textValue}></input>
					<div className="form-group">
						<button type="button" className="btn btn-xs btn-primary" disabled={this.state.createTeamDisabled} onClick={this._handleClick}>Create Team</button>
						<select value={this.state.value} ref="select" onChange={this._handleSelectionChange}>
							<option key="team_-1" value="-">-</option>
							{teamsList}
						</select>
					</div>
            	</div>
          	</div>
			);
		},

		_handleTextChange: function(event) {
			var createTeamDisabled = false;

			var name = event.target.value.replace(/\s/g, '');
			
			if (name === '' || this.teamExists(event.target.value)) {
				createTeamDisabled = true;
			}

			this.setState({
				createTeamDisabled: createTeamDisabled,
				textValue: event.target.value
			});
		},

		_handleClick: function() {
			var input = this.refs.textarea.state.value;
			this.props.onCreateTeam(input);
			this.setState({
				textValue: ''
			});
		},

		_handleSelectionChange: function() {
			this.props.onSelectionChange(event.target.value);
			this.setState({
				value: event.target.value
			});
		},

		teamExists: function(teamName) {
			for (var i = 0; i < this.props.teams.length; i++) {
				if (this.props.teams[i].name === teamName) {
					return true;
				}
			}
			return false;
		}
	});

	return teamList;
});