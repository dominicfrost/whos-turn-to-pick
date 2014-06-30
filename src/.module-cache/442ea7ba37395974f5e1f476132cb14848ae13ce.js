/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');
	var AddUser = require('addTeamMember');
	var TeamList = require('teamList');

	var mainComponent = React.createClass({displayName: 'mainComponent',
		render: function() {

			var addUser = AddUser( {key:"1"});
			var teamList = TeamList( {key:"2"});

			return (
				{addUser}
				{teamList}
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