/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 0;

	var teamMembersList = React.createClass({displayName: 'teamMembersList',
		render: function() {
			var pStyle = {
				position: 'fixed',
				left: '400px',
				top: '520px'
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
					return React.DOM.li( {className:"list-group-item", key:'canPick_' + uniqueKey++}, 
								teamMember.name,
								React.DOM.button( {type:"button", className:"btn btn-xs btn-primary", style:buttonStyle, onClick:self._handleMemberRemoved}, "x")
							)
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return React.DOM.li( {className:"list-group-item", key:'cantPick_' + uniqueKey++}, 
								teamMember.name, " ", self.formatDate(teamMember.lastPicked),
								React.DOM.button( {type:"button", className:"btn btn-xs btn-primary", style:buttonStyle, onClick:self._handleMemberRemoved}, "x")
							)
				}
			});


			var currentTeamDiv = React.DOM.div(null, 
									"Team: n/a"
								);

			if (this.props.currentTeam && this.props.currentTeam !== '' && this.props.currentTeam !== '-') {
				currentTeamDiv = React.DOM.div(null, 
									"Team: ", this.props.currentTeam,
									React.DOM.button( {type:"button", className:"btn btn-xs btn-primary", style:buttonStyle, onClick:this._handleTeamRemoved}, "Remove Team")
								);
			}

			return (
				React.DOM.div( {className:"panel panel-default"}, 
	            	React.DOM.div( {className:"panel-heading"}, 
	              		React.DOM.h3( {className:"panel-title"}, currentTeamDiv)
	            	),
            		React.DOM.div( {className:"panel-body"}, 
            			React.DOM.div( {className:"col-sm-6"}, 
            				React.DOM.h4(null, "Can Pick"),
							React.DOM.ul( {className:"list-group"}, 
								canPick
					        )
				        ),
				        React.DOM.div( {className:"col-sm-6"}, 
				        	React.DOM.h4(null, "Already Chosen"),
					        React.DOM.ul( {className:"list-group"}, 
								canNotPick
					        )
				        )
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