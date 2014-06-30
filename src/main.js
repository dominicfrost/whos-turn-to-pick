define(function(require) {
	'use strict';

	var ReactComponent = require('component');
	var React = require('../tools/react');

	var teamMembers = [
		{
			name: 'Dominic Frost',
			hasPicked: false,
			lastPicked: null
		},
		{
			name: 'Mike Thiesen',
			hasPicked: false,
			lastPicked: null
		},
		{
			name: 'Grant Nelson',
			hasPicked: false,
			lastPicked: null
		},
		{
			name:'Stephen Bush'`,
			hasPicked: false,
			lastPicked: null
		}
	];

	var component = null;

	function loginSuccess(json) {
		console.log('success!!! Welcome, ' + json.author);
	};

	function loginFailed() {
		console.log('failure...');
	};

	function logIn() {
		$.ajax({
            url: '/loginHandler',
            data: {},
            type: 'GET',
            dataType : 'json',
            success: loginSuccess,
            error: loginFailed
        });
	};

	function onMemberAdded(newTeamMember) {
		teamMembers.push(newTeamMember);
		component.setProps({
			teamMembers: teamMembers
		});
	};

	function onMemberPick(teamMember) {
		for (var i = 0, len = teamMembers.length; i < len; i++) {
			if (teamMembers[i].name === teamMember) {
				teamMembers[i].hasPicked = true;
				var today = new Date();
				teamMembers[i].lastPicked = today.getMonth() + "/" + today.getDate() + "/" + (today.getYear() + 1900);
				break;
			}
		}

		component.setProps({
			teamMembers: teamMembers,
			currentPicker: teamMember
		});
	};

	function resetBucket() {
		for (var i = 0, len = teamMembers.length; i < len; i++) {
			teamMembers[i].hasPicked = false;
		}
		component.setProps({
			teamMembers: teamMembers
		});
	};

	function setUpReact() {
		component = new ReactComponent({
			teamMembers: teamMembers,
			onMemberAdded: onMemberAdded,
			onMemberPick: onMemberPick,
			resetBucket: resetBucket
		});
		React.renderComponent(
			component,
			document.getElementById('mainContainer')
		);
	};

	$(document).ready(function() {
		setUpReact();
		logIn();
    });
});
