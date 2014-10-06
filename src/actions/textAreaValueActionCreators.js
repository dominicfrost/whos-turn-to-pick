var LunchPickerDispatcher = require('../dispatcher/lunchPickerDispatcher');
var Constants = require('../constants/constants');
var EndpointAPIUtils = require('../utils/endpointAPIUtils');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    handleNewTeamMemberValueChange: function(value) {
       LunchPickerDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_NEW_TEAM_MEMBER_VALUE,
            value: value
        });
    },

    handleNewTeamValueChange: function(value) {
       LunchPickerDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_NEW_TEAM_VALUE,
            value: value
        });
    }
};
