/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 10000;

	var teamMembersList = React.createClass({displayName: 'teamMembersList',
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
			};

			this.props.teamMembers.sort(function compare(a, b) {
				if (a.lastPicked < b.lastPicked) return -1;
				if (a.lastPicked > b.lastPicked) return 1;
				return 0;
			});

			var self = this;
			var canPick = this.props.teamMembers.map(function(teamMember, index) {
				if (!teamMember.hasPicked) {
					return React.DOM.div(null, 
								teamMember.name,
								React.DOM.button( {style:buttonStyle, onClick:self._handleClick}, "x")
							)
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return React.DOM.div(null, 
								teamMember.name, " ", self.formatDate(teamMember.lastPicked),
								React.DOM.button( {style:buttonStyle, onClick:self._handleClick}, "x")
							)
				}
			});

			return (
				React.DOM.div(null, 
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