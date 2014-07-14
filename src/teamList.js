/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 0;

	var teamList = React.createClass({displayName: 'teamList',

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
				top: '570px'
			};

			var textareaStyle = {
				resize: 'none',
				height: '24px'
			};

			var buttonStyle = {
				position: 'relative',
				top: '-8px',
				'margin-left':'15px'
			};

			var teamsList = this.props.teams.map(function(team, index) {
				return React.DOM.option( {key:'team_' + uniqueKey++, value:team.name}, team.name)
			});

			return (
			React.DOM.div( {className:"panel panel-default"}, 
            	React.DOM.div( {className:"panel-heading"}, 
              		React.DOM.h3( {className:"panel-title"}, "Team Manager")
            	),
            	React.DOM.div( {className:"panel-body"}, 
					React.DOM.textarea( {placeholder:"Insert Team Name...", style:textareaStyle, ref:"textarea", onChange:this._handleTextChange, value:this.state.textValue}),
					React.DOM.button( {type:"button", className:"btn btn-xs btn-primary", disabled:this.state.createTeamDisabled, style:buttonStyle, onClick:this._handleClick}, "Create Team"),
					React.DOM.select( {style:buttonStyle, value:this.state.value, ref:"select", onChange:this._handleSelectionChange}, 
						React.DOM.option( {key:"team_-1", value:"-"}, "-"),
						teamsList
					)
            	)
          	)
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