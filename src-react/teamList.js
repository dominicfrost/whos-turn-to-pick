/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 0;

	var teamList = React.createClass({

		getInitialState: function() {
			return {
				value: ""
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
			}

			var buttonStyle = {
				position: 'relative',
				top: '-5px'
			}

			var teamsList = this.props.teams.map(function(team, index) {
				return <option key={uniqueKey++} value={team.name}>{team.name}</option>
			});

			return (
				<div style={style} >
					<textarea placeholder="Insert Team Name..." style={textareaStyle} ref="textarea"></textarea>
					<button style={buttonStyle} onClick={this._handleClick}>Create Team</button>
					<select style={buttonStyle} value={this.state.value} ref="select" onChange={this._handleSelectionChange}>
						<option key="-1" value="-">-</option>
						{teamsList}
					</select>

				</div>
			);
		},

		_handleClick: function() {
			this.props.onCreateTeam(this.refs.textarea.state.value);
			this.refs.textarea.state.value = '';
		},

		_handleSelectionChange: function() {
			this.props.onSelectionChange(event.target.value);
			this.setState({
				value: event.target.value
			});
		}
	});

	return teamList;
});