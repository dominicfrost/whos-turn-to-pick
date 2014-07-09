define(function(require) {
	'use strict';

	var ReactComponent = require('component');
	var React = require('../tools/react');

	var teamMembers = [];

	var teams = [];

	var component = null;

	var currentTeam = "";

	function loginSuccess(json) {
		console.log('success!!! Welcome, ' + json.author);
		getTeams();
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

	function teamCreatedSuccess(json) {
		console.log('team successfully created!');
	};

	function teamCreatedFailed() {
		console.log('Failed to create team!')
	};

	function onCreateTeam(teamName) {
		var newTeam = {
			name: teamName
		}

		teams.push(newTeam);

		$.ajax({
            url: '/createTeamHandler',
            data: JSON.stringify(newTeam),
            type: 'POST',
            dataType : 'json',
            success: teamCreatedSuccess,
            error: teamCreatedFailed
        });

		component.setProps({
			teams: teams
		});
	};

	function getTeamMembersSuccess(json) {
		console.log('team successfully retrieved!');

		teamMembers = json.teamMembers || [];

		component.setProps({
			teamMembers: teamMembers
		});
	};

	function getTeamMembersFailed() {
		console.log('Failed to get team!')
	};

	// Get Team
	function getTeamMembers(teamName) {
		var team = {
			name: teamName
		};

		currentTeam = teamName;

		$.ajax({
            url: '/getTeamMembersHandler',
            data: JSON.stringify(team),
            type: 'POST',
            dataType : 'json',
            success: getTeamMembersSuccess,
            error: getTeamMembersFailed
        });
	};


	function teamMemberAddedSuccess(json) {
		console.log('team member successfully added!');
		teamMembers.push(json.teamMember);

		component.setProps({
			teamMembers: teamMembers
		});
	};

	function teamMemberAddedFailed() {
		console.log('Failed to add team member!')
	};

	function onMemberAdded(newTeamMember) {
		newTeamMember.team = currentTeam;

		$.ajax({
            url: '/addTeamMemberHandler',
            data: JSON.stringify(newTeamMember),
            type: 'POST',
            dataType : 'json',
            success: teamMemberAddedSuccess,
            error: teamMemberAddedFailed
        });
	};

	function getTeamsSuccess(json) {
		teams = json.teams || [];
		setUpReact();
	}

	function getTeamsFailed() {
		console.log('Failed to get team Members')
	}

	function getTeams() {
		$.ajax({
            url: '/getTeamsHandler',
            data: {},
            type: 'POST',
            dataType : 'json',
            success: getTeamsSuccess,
            error: getTeamsFailed
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
			teams: teams,
			onSelectionChange: getTeamMembers,
			onMemberAdded: onMemberAdded,
			onMemberPick: onMemberPick,
			onCreateTeam: onCreateTeam,
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
