/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 10000;

	var teamMembersList = React.createClass({
		render: function() {
			var pStyle = {
				position: 'fixed',
				left: '400px',
				top: '20px'
			};

			var p1Style = {
				position: 'absolute',
				top: '40px',
				width: '300px'
			};

			var p2Style = {
				position: 'absolute',
				top: '40px',
				left: '300px',
				width: '300px'
			};

			var buttonStyle =  {
				'margin-left': '15px'
			};

			var teamNameStyle = {
				'font-size': '25px',
				'font-weight': 'bold'
			};

			this.props.teamMembers.sort(function compare(a, b) {
				if (a.lastPicked < b.lastPicked) {
					return -1;
				} else if (a.lastPicked > b.lastPicked) {
					return 1;
				} else {
					return 0;
				}
			});

			var self = this;
			var canPick = this.props.teamMembers.map(function(teamMember, index) {
				if (!teamMember.hasPicked) {
					return <div>
								{teamMember.name}
								<button style={buttonStyle} onClick={self._handleMemberRemoved}>x</button>
							</div>
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return <div>
								{teamMember.name} {self.formatDate(teamMember.lastPicked)}
								<href style={buttonStyle} onClick={self._handleMemberRemoved}>x</href>
							</div>
				}
			});

			var currentTeamDiv = <div>
									<span style={teamNameStyle}>Team: n/a</span>
								</div>;
			if (this.props.currentTeam && this.props.currentTeam !== '' && this.props.currentTeam !== '-') {
				currentTeamDiv = <div>
									<span style={teamNameStyle}>Team: {this.props.currentTeam}</span>
									<button style={buttonStyle} onClick={this._handleTeamRemoved}>Remove Team</button>
								</div>;
			}

			return (
				<div style={pStyle}>
					{currentTeamDiv}
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

		_handleTeamRemoved: function() {
			var response = confirm('Remove ' + this.props.currentTeam + ' from the team list?');
			if (response) {
				this.props.onRemoveTeam(this.props.currentTeam);
			}
		},

		_handleMemberRemoved: function(event) {
			var name = event.target.parentElement.firstChild.innerText;
			var response = confirm('Remove ' + name + ' from the team?');
			if (response) {
				this.props.onMemberRemoved(name);
			}
		},
		
		formatDate: function(dateString) {
			var date = new Date(dateString);
			return (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getYear() - 100);
		}
	});


	return teamMembersList;
});