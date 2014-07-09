/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddTeamMember = require('addTeamMember');
	var TeamMembersList = require('teamMembersList');
	var TeamList = require('teamList');
	var Picker = require('picker');

	var mainComponent = React.createClass({displayName: 'mainComponent',

		getInitialState: function() {
			return {
				disabled: true
			}
		},

		render: function() {

			return (
				React.DOM.div(null, 
					TeamMembersList(
						{teamMembers:this.props.teamMembers}
					),
					Picker(
						{teamMembers:this.props.teamMembers,
						onMemberPick:this._onMemberPick,
						currentPicker:this.props.currentPicker,
						resetBucket:this._resetBucket}
					),
					AddTeamMember(
						{disabled:this.state.disabled,
						onMemberAdded:this._onMemberAdded}
					),
					TeamList(
						{teams:this.props.teams,
						onCreateTeam:this._onCreateTeam,
						onSelectionChange:this._onSelectionChange}
					)

				)
			);
		},

		_onSelectionChange: function(selectionName) {
			var disabled;
			if (selectionName === "-") {
				disabled = true;
			} else {
				disabled = false;
			}
			this.props.onSelectionChange(selectionName)

			this.setState({
				disabled: disabled
			});
		},

		_onCreateTeam: function(teamName) {
			this.props.onCreateTeam(teamName);
		},

		_onMemberPick: function(teamMember) {
			this.props.onMemberPick(teamMember);
		},

		_onMemberAdded: function(newTeamMember) {
			this.props.onMemberAdded(newTeamMember);
		},

		_resetBucket: function() {
			this.props.resetBucket();
		}
	});

	return mainComponent;
});