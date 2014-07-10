/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var picker = React.createClass({displayName: 'picker',
		render: function() {
			var style = {
				position: 'fixed',
				top: '170px'
			};

			var lastPickerDate = '';
			for (var i = 0, len = this.props.teamMembers.length; i < len; i++) {
				if (this.props.currentPicker && this.props.currentPicker.name === this.props.teamMembers[i].name) {
					lastPickerDate = this.formatDate(this.props.teamMembers[i].lastPicked);
					break;
				}
			}

			var currentPicker = this.props.currentPicker ? this.props.currentPicker.name : '';

			return (
				React.DOM.div( {style:style}, 
					React.DOM.button( {disabled:this.props.disabled, onClick:this._handleClick}, "Whose Picking Lunch?"),
					React.DOM.p(null, "Last To Choose: ", currentPicker, " ", lastPickerDate)
				)
			);
		},

		_handleClick: function() {
			var canPickMembers = []
			var teamMembers = this.props.teamMembers;
			for (var i = 0, len = teamMembers.length; i < len; i++) {
				var teamMember = teamMembers[i];
				if (!teamMember.hasPicked) {
					canPickMembers.push(teamMember);
				}
			}
			var pickerIndex = Math.floor(Math.random() * canPickMembers.length);

			this.props.onMemberPick(canPickMembers[pickerIndex].name);

			if (canPickMembers.length <= 1) {
				this.props.resetBucket();
			}
		},

		formatDate: function(dateString) {
			var date = new Date(dateString);
			return (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getYear() - 100);
		}
	});

	return picker;
});