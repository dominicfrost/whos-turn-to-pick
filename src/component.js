/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddTeamMember = require('addTeamMember');
	var TeamMembersList = require('teamMembersList');
	var TeamList = require('teamList');
	var Picker = require('picker');

	var mainComponent = React.createClass({displayName: 'mainComponent',

		render: function() {

			return (
				React.DOM.div(null, 
					AddTeamMember(
						{onMemberAdded:this._onMemberAdded}
					),
					TeamMembersList(
						{teamMembers:this.props.teamMembers}
					),
					Picker(
						{teamMembers:this.props.teamMembers,
						onMemberPick:this._onMemberPick,
						currentPicker:this.props.currentPicker,
						resetBucket:this._resetBucket}
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
			this.props.onSelectionChange(selectionName)
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