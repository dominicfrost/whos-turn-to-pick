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

        PICK_TEAM_MEMBER: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })

};
