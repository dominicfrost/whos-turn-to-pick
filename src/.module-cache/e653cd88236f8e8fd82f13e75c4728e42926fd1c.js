/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var teamList = React.createClass({displayName: 'teamList',
		render: function() {
			return (
				React.DOM.div(null, 
					React.DOM.table(null, 
						React.DOM.th(null,   "  chosen " ) 
					),
					React.DOM.table(null, 
						React.DOM.th(null,  " Already chosen " ) 
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