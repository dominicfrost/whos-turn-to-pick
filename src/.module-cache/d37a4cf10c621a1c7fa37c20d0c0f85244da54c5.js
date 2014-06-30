/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddUser = require('../tools/addUser');

	var mainComponent = React.createClass({displayName: 'mainComponent',
		render: function() {
			return (
				AddUser(null)
			);
		},

		_handleChange: function() {
			console.log('changed');
		},

		_handleClick: function() {
			console.log('clicked');
		}
	});


	return mainComponent;
});