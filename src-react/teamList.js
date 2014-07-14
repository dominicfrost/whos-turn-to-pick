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
			var style = {
				position: 'fixed',
				top: '70px'
			};

			var textareaStyle = {
				resize: 'none',
				height: '14px'
			};

			var buttonStyle = {
				position: 'relative',
				top: '-5px'
			};

			var teamsList = this.props.teams.map(function(team, index) {
				return <option key={'team_' + uniqueKey++} value={team.name}>{team.name}</option>
			});

			return (
				<div style={style} >
					<textarea placeholder="Insert Team Name..." style={textareaStyle} ref="textarea" onChange={this._handleTextChange} value={this.state.textValue}></textarea>
					<button disabled={this.state.createTeamDisabled} style={buttonStyle} onClick={this._handleClick}>Create Team</button>
					<select style={buttonStyle} value={this.state.value} ref="select" onChange={this._handleSelectionChange}>
						<option key="team_-1" value="-">-</option>
						{teamsList}
					</select>

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