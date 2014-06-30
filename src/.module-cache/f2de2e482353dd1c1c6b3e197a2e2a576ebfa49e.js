/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddTeamMember = require('addTeamMember');
	var TeamList = require('teamList');
	var Picker = require('picker');

	var mainComponent = React.createClass({displayName: 'mainComponent',

		render: function() {

			return (
				React.DOM.div(null, 
					AddTeamMember(
						{onMemberAdded:this._onMemberAdded}
					),
					TeamList(
						{teamMembers:this.props.teamMembers}
					),
					Picker(
						{teamMembers:this.props.teamMembers}
					)
				)
			);
		},

		_onMemberPick: function(teamMember) {
			this.props.onMemberPick(teamMember);
		},

		_onMemberAdded: function(newTeamMember) {
			this.props.onMemberAdded(newTeamMember);
		}
	});

	return mainComponent;
});