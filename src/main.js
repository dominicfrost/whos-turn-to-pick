'use strict';

var ReactComponent = require('./components/component');
var React = require('react');
var $ = require('jquery');
var EndpointAPIUtils = require('./utils/EndpointAPIUtils');


var teamMembers = [];

var teams = [];

var component = null;

var currentTeam = '';

function loginSuccess(json) {
    //console.log('success!!! Welcome, ' + json.author);
    EndpointAPIUtils.getTeams();
//    getTeams();
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

function resetBucket() {
    for (var i = 0, len = teamMembers.length; i < len; i++) {
        teamMembers[i].hasPicked = false;
    }
    updateTeamMembers(teamMembers);
    component.setProps({
        teamMembers: teamMembers
    });
}

React.renderComponent(
    new ReactComponent({
        teams:[],
        teamMembers: []
    }),
    document.getElementById('mainContainer'),
    logIn
);