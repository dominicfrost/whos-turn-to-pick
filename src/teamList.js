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

			var teamsList = this.props.teams.map(function(team, index) {
				return React.DOM.option( {key:'team_' + uniqueKey++, value:team.name}, team.name)
			});

			return (
			React.DOM.div( {className:"panel panel-default"}, 
            	React.DOM.div( {className:"panel-heading"}, 
              		React.DOM.h3( {className:"panel-title"}, "Team Manager")
            	),
            	React.DOM.div( {role:"form", className:"panel-body"}, 
					React.DOM.input( {className:"form-group form-control", placeholder:"Insert Team Name...", ref:"textarea", onChange:this._handleTextChange, value:this.state.textValue}),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.button( {type:"button", className:"btn btn-xs btn-primary", disabled:this.state.createTeamDisabled, onClick:this._handleClick}, "Create Team"),
						React.DOM.select( {value:this.state.value, ref:"select", onChange:this._handleSelectionChange}, 
							React.DOM.option( {key:"team_-1", value:"-"}, "-"),
							teamsList
						)
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