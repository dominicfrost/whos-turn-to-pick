/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var mainComponent = function () {
		this.init();
	};

	mainComponent.prototype.init = function() {
		React.renderComponent(
			React.DOM.div(null, 
				"Add User:",
				React.DOM.textarea(null,  " " )
			),
			document.getElementById('mainContainer')
		);
	};

	return mainComponent;
});