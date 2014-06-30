/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddTeamMember = require('addTeamMember');
	var TeamList = require('teamList');
	var Picker = require('picker');

	var mainComponent = React.createClass({displayName: 'mainComponent',

		getInitialState: function() {
			return {
				teamMembers: this.props.teamMembers
			}
		},

		render: function() {

			return (
				React.DOM.div(null, 
					AddTeamMember(
						{onAdded:this._onAdded}
					),
					TeamList(null),
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