/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	React.renderComponent(
			React.DOM.div(null, 
				"Add User:",
				React.DOM.textarea(null,  " " )
			),
			document.getElementById('mainContainer')
		);
});