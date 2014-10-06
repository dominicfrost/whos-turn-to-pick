var ServerActionCreators = require('../actions/serverActionCreators');

function failedRequest(e) {
    console.log('your request failed! :(\n' + e);
}
module.exports = {

    removeTeam: function(teamName) {
        var oldTeam = {
            name: teamName
        };

        $.ajax({
            url: '/removeTeamHandler',
            data: JSON.stringify(oldTeam),
            type: 'POST',
            dataType : 'json',
            success: ServerActionCreators.teamRemoveSuccess,
            error: failedRequest
        });
    },

    getTeams: function() {
        $.ajax({
            url: '/getTeamsHandler',
            data: {},
            type: 'POST',
            dataType : 'json',
            success: ServerActionCreators.getTeamsSuccess,
            error: failedRequest
        });
    },

    createTeam: function(teamName) {
        var newTeam = {
            name: teamName
        };

        $.ajax({
            url: '/createTeamHandler',
            data: JSON.stringify(newTeam),
            type: 'POST',
            dataType : 'json',
            success: ServerActionCreators.teamCreatedSuccess,
            error: failedRequest
        });
    },

    createTeamMember: function(newTeamMember) {
        $.ajax({
            url: '/addTeamMemberHandler',
            data: JSON.stringify(newTeamMember),
            type: 'POST',
            dataType : 'json',
            success: ServerActionCreators.teamMemberCreatedSuccess,
            error: failedRequest
        });
    },

    removeTeamMember: function(oldTeamMember) {
        $.ajax({
            url: '/removeTeamMemberHandler',
            data: JSON.stringify(oldTeamMember),
            type: 'POST',
            dataType : 'json',
            success: ServerActionCreators.teamMemberRemovedSuccess,
            error: failedRequest
        });
    },

    getTeamMembers: function(teamName) {
        var team = {
            name: teamName
        };

        $.ajax({
            url: '/getTeamMembersHandler',
            data: JSON.stringify(team),
            type: 'POST',
            dataType : 'json',
            success: ServerActionCreators.getTeamMembersSuccess,
            error: failedRequest
        });
    },

    pickTeamMember: function(currentPicker) {
        currentPicker.hasPicked = true;
        var now = new Date();
        currentPicker.lastPicked = now.toString();
        var teamMembers = [currentPicker];
        $.ajax({
            url: '/updateTeamMembersHandler',
            data: JSON.stringify(teamMembers),
            type: 'POST',
            dataType : 'json',
            success: ServerActionCreators.teamMembersUpdateSuccess,
            error: failedRequest
        });
    },

    updateTeamMembers: function(teamMembers) {
        $.ajax({
            url: '/updateTeamMembersHandler',
            data: JSON.stringify(teamMembers),
            type: 'POST',
            dataType : 'json',
            success: ServerActionCreators.teamMembersUpdateSuccess,
            error: failedRequest
        });
    }
};
