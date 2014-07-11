/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddTeamMember = require('addTeamMember');
	var TeamMembersList = require('teamMembersList');
	var TeamList = require('teamList');
	var Picker = require('picker');

	var PICK_THRESHOLD = 1195200000; // 13 days and 20 hours

	var mainComponent = React.createClass({displayName: 'mainComponent',

		getInitialState: function() {
			return {
				addMemberDisabled: true,
				pickerDisabled: true
			};
		},


		componentWillReceiveProps: function(nextProps) {
			if (nextProps.currentPicker && new Date() - new Date(nextProps.currentPicker.lastPicked) < PICK_THRESHOLD ||
				nextProps.teamMembers.length === 0) {
				this.setState({
					pickerDisabled: true
				});
			} else {
				this.setState({
					pickerDisabled: false
				});
			}
		},

		render: function() {

			return (
				React.DOM.div(null, 
					TeamMembersList(
						{teamMembers:this.props.teamMembers,
						onMemberRemoved:this._onMemberRemoved}
					),
					Picker(
						{teamMembers:this.props.teamMembers,
						onMemberPick:this._onMemberPick,
						currentPicker:this.props.currentPicker,
						resetBucket:this._resetBucket,
						disabled:this.state.pickerDisabled}
					),
					AddTeamMember(
						{disabled:this.state.addMemberDisabled,
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
			var addMemberDisabled;
			var pickerDisabled;
			if (selectionName === '-') {
				addMemberDisabled = true;
				pickerDisabled = true;
			} else {
				addMemberDisabled = false;
				if (this.props.currentPicker && new Date() - new Date(this.props.currentPicker.lastPicked) < PICK_THRESHOLD ||
					this.props.teamMembers.length === 0) {
					pickerDisabled = true;
				} else {
					pickerDisabled = false;
				}
			}

			this.props.onSelectionChange(selectionName);

			this.setState({
				addMemberDisabled: addMemberDisabled,
				pickerDisabled: pickerDisabled
			});
		},

		_onMemberRemoved: function(teamMember) {
			this.props.onMemberRemoved(teamMember);
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