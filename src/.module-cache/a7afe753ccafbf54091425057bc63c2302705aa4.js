/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var teamList = React.createClass({displayName: 'teamList',
		render: function() {
			var tableStyle = {
				float: 'left'
			};

			var noFloatStyle = {
				clear: 'both'
			};

			var canPick = this.props.teamMembers.map(function(teamMember, index) {
				if (!teamMember.hasPicked) {
					return React.DOM.td(null, teamMember.name)
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return React.DOM.td(null, teamMember.name)
				}
			});

			// for (var i = 0, len = this.props.teamMembers.length; i < len; i++) {
			// 	if (this.props.teamMembers[i].hasPicked) {
			// 		canNotPick.push(teamMembers[i]);
			// 	} else {
			// 		canPick.push(teamMembers[i]);
			// 	}
			// }

			return (
				React.DOM.div(null, 
					React.DOM.table( {style:tableStyle}, 
						React.DOM.th( {style:noFloatStyle},  " Can Choose " ), 
						canPick
					),
					React.DOM.table( {style:tableStyle}, 
						React.DOM.th(null,  " Already Chosen " ), 
						canNotPick
					)
				)
			);
		},

		_handleChange: function() {
			console.log('changed');
		},

		_handleClick: function() {
			console.log('clicked');
		}
	});


	return teamList;
});