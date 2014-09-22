var LunchPickerDispatcher = require('../dispatcher/lunchPickerDispatcher');
var Constants = require('../constants/constants');
var EndpointAPIUtils = require('../utils/endpointAPIUtils');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _teamMembers = [];
var _currentPicker = 'n/a';

function processTeamMembers(teamMembers) {
    _teamMembers = teamMembers || [];


    var recentPick = 0;
    var memberPicked;

    for (var i = 0; i < _teamMembers.length; i++) {
        memberPicked = new Date(_teamMembers[i].lastPicked);
        if (recentPick < memberPicked) {
            recentPick = memberPicked;
            _currentPicker = _teamMembers[i];
        }
    }
}

function removeTeamMember(teamMember) {
    for (var i = 0; i < _teamMembers.length; i++) {
        if (teamMember.name === _teamMembers[i].name) {
            _teamMembers.splice(i, 1);
            break;
        }
    }
}

function updateTeamMember(teamMember) {

}

function checkBucketsForReset() {
    var needReset = true;
    for (var i = 0; i < _teamMembers.length; i++) {
        if (!_teamMembers[i].hasPicked) {
            needReset = false;
        }
    }
    if (needReset) {
        for (var j = 0; j < _teamMembers.length; j++) {
            _teamMembers[j].hasPicked = false;
        }
        EndpointAPIUtils.updateTeamMembers(_teamMembers);
    }
}

var TeamMemberStore = merge(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCurrentPicker: function() {
        return _currentPicker;
    },

    getAllTeamMembers: function() {
        return _teamMembers;
    }

});

TeamMemberStore.dispatchToken = LunchPickerDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_TEAM_MEMBERS_SUCCESS:
            processTeamMembers(action.rawMessages.teamMembers);
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.CREATE_TEAM_MEMBER_SUCCESS:
            _teamMembers.push(action.rawMessages.teamMember);
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.REMOVE_TEAM_MEMBER_SUCCESS:
            removeTeamMember(action.rawMessages.teamMember);
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.UPDATE_TEAM_MEMBER_SUCCESS:
            checkBucketsForReset();
            updateTeamMember(action.rawMessages.teamMember);
            TeamMemberStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = TeamMemberStore;
