/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var mainComponent = React.createClass({displayName: 'mainComponent',
		render: function() {
			return (
				React.DOM.div(null, 
					React.DOM.textarea( {onChange:this._handleChange},  " " ),
					React.DOM.button( {onClick:this._handleClick}, "Add User")
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


	return mainComponent;
});