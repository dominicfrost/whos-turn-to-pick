/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var picker = React.createClass({displayName: 'picker',
		render: function() {
			var style = {
				position: 'fixed',
				top: '150px'
			};

			var currentPicker = "Dominic Frost";

			return (
				React.DOM.div( {style:style}, 
					React.DOM.button( {onClicked:this._handleClick}, "Whose Picking Lunch?"),
					React.DOM.p(null, currentPicker)
				)
			);
		},

		_handleClick: function() {
			var canPickMembers = []
			for (var i = 0, len = this.props.teamMembers.length; i < len; i++) {
				var teamMember = this.props.teamMembers[i];
				if (!teamMember.hasPicked) {
					canPickMembers.push(teamMember);
				}
			}
		}
	});


	return picker;
});