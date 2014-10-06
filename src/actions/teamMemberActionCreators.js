var LunchPickerDispatcher = require('../dispatcher/lunchPickerDispatcher');
var Constants = require('../constants/constants');
var EndpointAPIUtils = require('../utils/endpointAPIUtils');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    removeTeamMember: function(teamMember) {
       EndpointAPIUtils.removeTeamMember(teamMember);
    },

    selectTeam: function(teamName) {
        LunchPickerDispatcher.handleViewAction({
            type: ActionTypes.SELECT_TEAM,
            teamName: teamName
        });
    },

    createTeamMember: function(newMember) {
        LunchPickerDispatcher.handleViewAction({
            type: ActionTypes.CREATE_TEAM_MEMBER,
            newMember: newMember
        });
    },

    pick: function(teamMember) {
        EndpointAPIUtils.pickTeamMember(teamMember);
    },

    toggleActiveUserState: function(teamMember) {
        LunchPickerDispatcher.handleViewAction({
            type: ActionTypes.TOGGLE_ACTIVE_USER,
            teamMember: teamMember
        });
    }

};
