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
			var pickerDisabled = false;
			var addMemberDisabled = false;
			if (nextProps.currentPicker && new Date() - new Date(nextProps.currentPicker.lastPicked) < PICK_THRESHOLD ||
				nextProps.teamMembers.length === 0) {
				pickerDisabled = true;
			}

			if (nextProps.currentTeam === '' || nextProps.currentTeam === '-') {
				addMemberDisabled = true;
			}

			this.setState({
				pickerDisabled: pickerDisabled,
				addMemberDisabled: addMemberDisabled
			});	
		},

		render: function() {
			return (
				<div>
					<div className="row">
						<div className="col-sm-4">
							<TeamList
								teams={this.props.teams}
								onCreateTeam={this.props.onCreateTeam}
								onSelectionChange={this._onSelectionChange}
							/>

							<AddTeamMember
								disabled={this.state.addMemberDisabled}
								onMemberAdded={this.props.onMemberAdded}
							/>
						</div>
						<div className="col-sm-8">
							<TeamMembersList
								currentTeam={this.props.currentTeam}
								teamMembers={this.props.teamMembers}
								onMemberRemoved={this.props.onMemberRemoved}
								onRemoveTeam={this.props.onRemoveTeam}
							/>
						</div>
					</div>
					
					<div className="row">
						<div className="col-sm-4">
							<Picker
								teamMembers={this.props.teamMembers}
								onMemberPick={this.props.onMemberPick}
								currentPicker={this.props.currentPicker}
								resetBucket={this.props.resetBucket}
								disabled={this.state.pickerDisabled}
							/>
						</div>
					</div>
					
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