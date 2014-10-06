var LunchPickerDispatcher = require('../dispatcher/lunchPickerDispatcher');
var Constants = require('../constants/constants');
var EndpointAPIUtils = require('../utils/endpointAPIUtils');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    removeTeam: function(teamName) {
       EndpointAPIUtils.removeTeam(teamName);
    },

    selectTeam: function(teamName) {
        LunchPickerDispatcher.handleViewAction({
            type: ActionTypes.SELECT_TEAM,
            teamName: teamName
        });
    },

    createTeam: function(teamName) {
        EndpointAPIUtils.createTeam(teamName);
    }

};
