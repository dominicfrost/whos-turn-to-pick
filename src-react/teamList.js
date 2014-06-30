/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var teamList = React.createClass({
		render: function() {
			var p1Style = {
				position: 'fixed',
				left: '400px'
			};

			var p2Style = {
				position: 'fixed',
				left: '700px'
			};

			var noFloatStyle = {
				clear: 'both'
			};

			var canPick = this.props.teamMembers.map(function(teamMember, index) {
				if (!teamMember.hasPicked) {
					return <li>{teamMember.name}</li>
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return <li>{teamMember.name} {teamMember.lastPicked}</li>
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
				<div>
					<div style={p1Style}>
						<p> Can Choose </p>
						<ul> {canPick} </ul>
					</div>
					<div style={p2Style}>
						<p> Already Chosen </p>
						<ul> {canNotPick} </ul>
					</div>
				</div>
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