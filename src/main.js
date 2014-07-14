define(function(require) {
	'use strict';

	var ReactComponent = require('component');
	var React = require('../tools/react');

	var teamMembers = [];

	var teams = [];

	var component = null;

	var currentTeam = '';

	function loginSuccess(json) {
		//console.log('success!!! Welcome, ' + json.author);
		getTeams();
	}

	function loginFailed() {
		//console.log('failure...');
	}

	function logIn() {
		$.ajax({
            url: '/loginHandler',
            data: {},
            type: 'GET',
            dataType : 'json',
            success: loginSuccess,
            error: loginFailed
        });
	}

	function teamCreatedSuccess(json) {
		//console.log('team successfully created!');
		teams.push(json.team);

		component.setProps({
			teams: teams
		});
	}

	function teamCreatedFailed() {
		//console.log('Failed to create team!')
	}

	function onCreateTeam(teamName) {
		var newTeam = {
			name: teamName
		}

		$.ajax({
            url: '/createTeamHandler',
            data: JSON.stringify(newTeam),
            type: 'POST',
            dataType : 'json',
            success: teamCreatedSuccess,
            error: teamCreatedFailed
        });
	}

	function teamRemoveSuccess(json) {
		//console.log('team successfully created!');
		var teamName = json.team.name;
		var team = {};
		for (var i = 0; i < teams.length; i++) {
			if (teams[i].name === teamName) {
				team = teams[i];
				break;
			}
		}

		var index = teams.indexOf(team);

		teams.splice(index, 1);

		component.setProps({
			teams: teams,
			currentTeam: '',
			teamMembers: []
		});
	}

	function teamRemoveFailed() {
		//console.log('Failed to create team!')
	}

	function onRemoveTeam(teamName) {
		var newTeam = {
			name: teamName
		};

		$.ajax({
            url: '/removeTeamHandler',
            data: JSON.stringify(newTeam),
            type: 'POST',
            dataType : 'json',
            success: teamRemoveSuccess,
            error: teamRemoveFailed
        });
	}

	function getTeamMembersSuccess(json) {
		//console.log('team successfully retrieved!');

		teamMembers = json.teamMembers || [];

		currentTeam = json.team.name;

		var recentPick = 0;
		var memberPicked;
		var currentPicker;

		for (var i = 0; i < teamMembers.length; i++) {
			memberPicked = new Date(teamMembers[i].lastPicked);
			if (recentPick < memberPicked) {
				recentPick = memberPicked;
				currentPicker = teamMembers[i];
			}
		}

		component.setProps({
			teamMembers: teamMembers,
			currentPicker: currentPicker,
			currentTeam: currentTeam
		});
	}

	function getTeamMembersFailed() {
		//console.log('Failed to get team!')
	}

	// Get Team
	function getTeamMembers(teamName) {
		var team = {
			name: teamName
		};

		$.ajax({
            url: '/getTeamMembersHandler',
            data: JSON.stringify(team),
            type: 'POST',
            dataType : 'json',
            success: getTeamMembersSuccess,
            error: getTeamMembersFailed
        });
	}


	function teamMemberAddedSuccess(json) {
		//console.log('team member successfully added!');
		teamMembers.push(json.teamMember);

		component.setProps({
			teamMembers: teamMembers
		});
	}

	function teamMemberAddedFailed() {
		//console.log('Failed to add team member!')
	}

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
	}

	function getTeamsSuccess(json) {
		teams = json.teams || [];
		setUpReact();
	}

	function getTeamsFailed() {
		//console.log('Failed to get team Members')
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
		var currentPicker;
		for (var i = 0, len = teamMembers.length; i < len; i++) {
			if (teamMembers[i].name === teamMember) {
				currentPicker = teamMembers[i];
				currentPicker.hasPicked = true;
				var now = new Date();
				currentPicker.lastPicked = now.toString();
				updateTeamMembers([currentPicker]);
				break;
			}
		}

		component.setProps({
			teamMembers: teamMembers,
			currentPicker: currentPicker
		});
	}

	function teamMembersUpdateSuccess(json) {
		//console.log('Successfully updated team members')
	}

	function teamMembersUpdateFailed(json) {
		//console.log('Failed to update team members')
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

	function teamMemberRemoveSuccess(json) {
		var teamMemberName = json.teamMember.name;
		var teamMember = {};
		for (var i = 0; i < teamMembers.length; i++) {
			if (teamMembers[i].name === teamMemberName) {
				teamMember = teamMembers[i];
				break;
			}
		}

		var index = teamMembers.indexOf(teamMember);

		teamMembers.splice(index, 1);
		component.setProps({
			teamMembers: teamMembers
		});

		//console.log('Successfully removed team member');
	}

	function teamMemberRemoveFailed(json) {
		//console.log('Failed to remove team member');
	}

	function onMemberRemoved(teamMemberName) {
		var teamMember = null;

		for (var i = 0; i < teamMembers.length; i++) {
			if (teamMembers[i].name === teamMemberName) {
				teamMember = teamMembers[i];
				break;
			}
		}

		$.ajax({
            url: '/removeTeamMemberHandler',
            data: JSON.stringify(teamMember),
            type: 'POST',
            dataType : 'json',
            success: teamMemberRemoveSuccess,
            error: teamMemberRemoveFailed
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
	}

	function setUpReact() {
		component = new ReactComponent({
			teamMembers: teamMembers,
			teams: teams,
			onSelectionChange: getTeamMembers,
			onMemberAdded: onMemberAdded,
			onMemberRemoved: onMemberRemoved,
			onMemberPick: onMemberPick,
			onCreateTeam: onCreateTeam,
			onRemoveTeam: onRemoveTeam,
			resetBucket: resetBucket
		});
		React.renderComponent(
			component,
			document.getElementById('mainContainer')
		);
	}

	$(document).ready(function() {
		logIn();
    });
});
