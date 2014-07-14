/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddTeamMember = require('addTeamMember');
	var TeamMembersList = require('teamMembersList');
	var TeamList = require('teamList');
	var Picker = require('picker');

	var PICK_THRESHOLD = 1195200000; // 13 days and 20 hours

	var mainComponent = React.createClass({

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
				<div>
					<TeamMembersList
						currentTeam={this.props.currentTeam}
						teamMembers={this.props.teamMembers}
						onMemberRemoved={this.props.onMemberRemoved}
						onRemoveTeam={this.props.onRemoveTeam}
					/>
					<Picker
						teamMembers={this.props.teamMembers}
						onMemberPick={this.props.onMemberPick}
						currentPicker={this.props.currentPicker}
						resetBucket={this.props.resetBucket}
						disabled={this.state.pickerDisabled}
					/>
					<AddTeamMember
						disabled={this.state.addMemberDisabled}
						onMemberAdded={this.props.onMemberAdded}
					/>
					<TeamList
						teams={this.props.teams}
						onCreateTeam={this.props.onCreateTeam}
						onSelectionChange={this._onSelectionChange}
					/>

				</div>
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
	});

	return mainComponent;
});