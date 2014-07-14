/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 10000;

	var teamMembersList = React.createClass({displayName: 'teamMembersList',
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
					return React.DOM.div(null, 
								teamMember.name,
								React.DOM.button( {style:buttonStyle, onClick:self._handleMemberRemoved}, "x")
							)
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return React.DOM.div(null, 
								teamMember.name, " ", self.formatDate(teamMember.lastPicked),
								href( {style:buttonStyle, onClick:self._handleMemberRemoved}, "x")
							)
				}
			});

			var currentTeamDiv = React.DOM.div(null, 
									React.DOM.span( {style:teamNameStyle}, "Team: n/a")
								);
			if (this.props.currentTeam && this.props.currentTeam !== '' && this.props.currentTeam !== '-') {
				currentTeamDiv = React.DOM.div(null, 
									React.DOM.span( {style:teamNameStyle}, "Team: ", this.props.currentTeam),
									React.DOM.button( {style:buttonStyle, onClick:this._handleTeamRemoved}, "Remove Team")
								);
			}

			return (
				React.DOM.div( {style:pStyle}, 
					currentTeamDiv,
					React.DOM.div( {style:p1Style}, 
						React.DOM.h3(null,  " Can Choose " ),
						canPick
					),
					React.DOM.div( {style:p2Style}, 
						React.DOM.h3(null,  " Already Chosen " ),
						canNotPick
					)
				)
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