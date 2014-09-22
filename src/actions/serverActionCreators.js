var LunchPickerDispatcher = require('../dispatcher/lunchPickerDispatcher');
var Constants = require('../constants/constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {
    teamRemoveSuccess: function(json) {
        LunchPickerDispatcher.handleServerAction({
          type: ActionTypes.REMOVE_TEAM_SUCCESS,
          rawMessages: json
        });
    },

    getTeamsSuccess: function(json) {
        LunchPickerDispatcher.handleServerAction({
            type: ActionTypes.GET_TEAMS_SUCCESS,
            rawMessages: json
        });
    },

    teamCreatedSuccess: function(json) {
        LunchPickerDispatcher.handleServerAction({
            type: ActionTypes.CREATE_TEAM_SUCCESS,
            rawMessages: json
        });
    },

    getTeamMembersSuccess: function(json) {
        LunchPickerDispatcher.handleServerAction({
            type: ActionTypes.GET_TEAM_MEMBERS_SUCCESS,
            rawMessages: json
        });
    },

    teamMemberCreatedSuccess: function(json) {
        LunchPickerDispatcher.handleServerAction({
            type: ActionTypes.CREATE_TEAM_MEMBER_SUCCESS,
            rawMessages: json
        });
    },

    teamMemberRemovedSuccess: function(json) {
        LunchPickerDispatcher.handleServerAction({
            type: ActionTypes.REMOVE_TEAM_MEMBER_SUCCESS,
            rawMessages: json
        });
    },

    teamMembersUpdateSuccess: function(json) {
        LunchPickerDispatcher.handleServerAction({
            type: ActionTypes.UPDATE_TEAM_MEMBER_SUCCESS,
            rawMessages: json
        });
    }
};
