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
			name:'Stephen Bush',
			hasPicked: false,
			lastPicked: null
		}
	];

	var component = null;

	function loginSuccess(json) {
		console.log('success!!! Welcome, ' + json.author);
		getTeamMembers();
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

	function teamMemberAddedSuccess(json) {
		console.log('team member successfully added!');
	};

	function teamMemberAddedFailed() {
		console.log('Failed to add team member!')
	};

	function onMemberAdded(newTeamMember) {
		teamMembers.push(newTeamMember);

		$.ajax({
            url: '/addTeamMemberHandler',
            data: JSON.stringify(newTeamMember),
            type: 'POST',
            dataType : 'json',
            success: teamMemberAddedSuccess,
            error: teamMemberAddedFailed
        });

		component.setProps({
			teamMembers: teamMembers
		});
	};

	function getTeamMembersSuccess(json) {
		teamMembers = json.teamMembers || [];
		setUpReact();
	}

	function getTeamMembersFailed() {
		console.log('Failed to get team Members')
	}

	function getTeamMembers() {
		$.ajax({
            url: '/getTeamMembersHandler',
            data: {},
            type: 'POST',
            dataType : 'json',
            success: getTeamMembersSuccess,
            error: getTeamMembersFailed
        });
	}

	function onMemberPick(teamMember) {
		for (var i = 0, len = teamMembers.length; i < len; i++) {
			if (teamMembers[i].name === teamMember) {
				teamMembers[i].hasPicked = true;
				var today = new Date();
				teamMembers[i].lastPicked = (today.getMonth() + 1) + "/" + today.getDate() + "/" + (today.getYear() + 1900);
				updateTeamMembers([teamMembers[i]]);
				break;
			}
		}

		component.setProps({
			teamMembers: teamMembers,
			currentPicker: teamMember
		});
	};

	function teamMembersUpdateSuccess(json) {
		console.log('Successfully updated team members')
	}

	function teamMembersUpdateFailed(json) {
		console.log('Failed to update team members')
	}

	function updateTeamMembers(teamMembers) {
		$.ajax({
            url: '/updateTeamMembersHandler',
            data: JSON.stringify(teamMembers),
            type: 'POST',
            dataType : 'json',
            success: teamMembersUpdateSuccess,
            error: teamMembersUpdateFailed
        });
	}

	function resetBucket() {
		for (var i = 0, len = teamMembers.length; i < len; i++) {
			teamMembers[i].hasPicked = false;
		}
		updateTeamMembers(teamMembers);
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
		logIn();
    });
});
