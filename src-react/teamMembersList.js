/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 10000;

	var teamMembersList = React.createClass({
		render: function() {
			var p1Style = {
				position: 'fixed',
				left: '400px'
			};

			var p2Style = {
				position: 'fixed',
				left: '700px'
			};

			var buttonStyle =  {
				'margin-left': '15px'
			}
			var self = this;
			var canPick = this.props.teamMembers.map(function(teamMember, index) {
				if (!teamMember.hasPicked) {
					return <div>
								{teamMember.name}
								<button style={buttonStyle} onClick={self._handleClick}>x</button>
							</div>
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return <div>
								{teamMember.name} {self.formatDate(teamMember.lastPicked)}
								<button style={buttonStyle} onClick={self._handleClick}>x</button>
							</div>
				}
			});

			return (
				<div>
					<div style={p1Style}>
						<h3> Can Choose </h3>
						{canPick}
					</div>
					<div style={p2Style}>
						<h3> Already Chosen </h3>
						{canNotPick}
					</div>
				</div>
			);
		},

		_handleClick: function(event, b) {
			this.props.onMemberRemoved(event.target.parentElement.firstChild.innerText);
		},
		
		formatDate: function(dateString) {
			var date = new Date(dateString);
			return (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getYear() - 100);
		}
	});


	return teamMembersList;
});