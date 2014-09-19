/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 0;

	var teamList = React.createClass({displayName: 'teamList',

		getInitialState: function() {
			return {
				value: 'team',
				textValue:'',
				createTeamDisabled: true
			};
		},

		render: function() {
            var self = this;

			var teamsList = this.props.teams.map(function(team) {

                function handleClick() {
                    self._handleSelectionChange(team);
                }
				return  React.DOM.li({role: "presentation", key: 'team_' + uniqueKey++, onClick: handleClick}, 
                            React.DOM.a({role: "menuitem", tabindex: "-1"}, team.name)
                        )
			});

            var floatRight = {
                float: "right"
            };

			return (
                React.DOM.div({className: "panel panel-default"}, 
                    React.DOM.div({className: "panel-heading"}, 
                        React.DOM.h3({className: "panel-title"}, "Team Manager")
                    ), 
                    React.DOM.div({role: "form", className: "panel-body"}, 
                        React.DOM.input({className: "form-group form-control", placeholder: "Insert Team Name...", ref: "textarea", onChange: this._handleTextChange, value: this.state.textValue}), 
                        React.DOM.button({type: "button", className: "btn btn-md btn-primary", disabled: this.state.createTeamDisabled, onClick: this._handleClick}, "Create Team"), 
                        React.DOM.div({className: "dropdown", style: floatRight}, 
                            React.DOM.button({className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownMenu1", 'data-toggle': "dropdown"}, 
                                this.state.value + "  ", 
                                React.DOM.span({className: "caret"})
                            ), 
                            React.DOM.ul({className: "dropdown-menu", role: "menu", 'aria-labelledby': "dropdownMenu1"}, 
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

		_handleSelectionChange: function(team) {
			this.props.onSelectionChange(team.name);
			this.setState({
				value: team.name
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