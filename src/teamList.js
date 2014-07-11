/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 0;

	var teamList = React.createClass({displayName: 'teamList',

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
				return React.DOM.option( {key:uniqueKey++, value:team.name}, team.name)
			});

			return (
				React.DOM.div( {style:style} , 
					React.DOM.textarea( {placeholder:"Insert Team Name...", style:textareaStyle, ref:"textarea"}),
					React.DOM.button( {style:buttonStyle, onClick:this._handleClick}, "Create Team"),
					React.DOM.select( {style:buttonStyle, value:this.state.value, ref:"select", onChange:this._handleSelectionChange}, 
						React.DOM.option( {key:"-1", value:"-"}, "-"),
						teamsList
					)

				)
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