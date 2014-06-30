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
					Picker(null)
				)
			);
		},

		_onAdded: function(newTeamMember) {
			this.props.onAdded(newTeamMember);
		}
	});

	return mainComponent;
});