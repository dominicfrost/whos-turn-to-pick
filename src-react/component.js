/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddTeamMember = require('addTeamMember');
	var TeamList = require('teamList');
	var Picker = require('picker');

	var mainComponent = React.createClass({

		render: function() {

			return (
				<div>
					<AddTeamMember
						onMemberAdded={this._onMemberAdded}
					/>
					<TeamList
						teamMembers={this.props.teamMembers}
					/>
					<Picker
						teamMembers={this.props.teamMembers}
						onMemberPick={this._onMemberPick}
						currentPicker={this.props.currentPicker}
						resetBucket={this._resetBucket}
					/>
				</div>
			);
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