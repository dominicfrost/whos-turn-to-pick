var keyMirror = require('react/lib/keyMirror');

module.exports = {

    ActionTypes: keyMirror({
        REMOVE_TEAM: null,
        REMOVE_TEAM_SUCCESS: null,
        CREATE_TEAM: null,
        CREATE_TEAM_SUCCESS: null,
        SELECT_TEAM: null,
        GET_TEAMS_SUCCESS: null,

        GET_TEAM_MEMBERS_SUCCESS: null,
        CREATE_TEAM_MEMBER: null,
        CREATE_TEAM_MEMBER_SUCCESS: null,
        REMOVE_TEAM_MEMBER_SUCCESS: null,
        UPDATE_TEAM_MEMBER_SUCCESS: null,

        PICK_TEAM_MEMBER: null,

        UPDATE_NEW_TEAM_MEMBER_VALUE: null,
        UPDATE_NEW_TEAM_VALUE: null,

        TOGGLE_ACTIVE_USER: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    Constants: {
        PICK_THRESHOLD: 1195200000  // 13 days and 20 hours
    }

};
