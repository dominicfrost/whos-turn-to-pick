/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var teamList = React.createClass({displayName: 'teamList',
		render: function() {
			var tableStyle = {
				flat: left
			};

			return (
				React.DOM.div(null, 
					React.DOM.table( {style:"float:left;"}, 
						React.DOM.th(null,  " Can Choose " ) 
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