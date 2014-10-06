var LunchPickerDispatcher = require('../dispatcher/lunchPickerDispatcher');
var Constants = require('../constants/constants');
var EndpointAPIUtils = require('../utils/endpointAPIUtils');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _teams = [];
var _currentTeam = {
    name: 'Pick Your Team...'
};

function removeTeam(team) {
    var teamName = team.name;
    for (var i = 0; i < _teams.length; i++) {
        if (_teams[i].name === teamName) {
            _teams.splice(i, 1);
            break;
        }
    }
}

var TeamStore = merge(EventEmitter.prototype, {

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

    get: function(id) {
        return _teams[id];
    },

    getAllTeams: function() {
        return _teams;
    },

    getCurrentTeam: function() {
        return _currentTeam.name;
    }

});

TeamStore.dispatchToken = LunchPickerDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.GET_TEAMS_SUCCESS:
            _teams = action.rawMessages.teams || [];
            TeamStore.emitChange();
            break;

        case ActionTypes.REMOVE_TEAM_SUCCESS:
            removeTeam(action.rawMessages.team);
            _currentTeam = {
                name: 'Pick Your Team...'
            };
            TeamStore.emitChange();
            break;

        case ActionTypes.CREATE_TEAM_SUCCESS:
            _teams.push(action.rawMessages.team);
            _currentTeam = action.rawMessages.team;
            TeamStore.emitChange();
            break;

        case ActionTypes.SELECT_TEAM:
            _currentTeam = action.teamName;
            EndpointAPIUtils.getTeamMembers(_currentTeam.name);
            TeamStore.emitChange();
            break;

        case ActionTypes.CREATE_TEAM_MEMBER:
            action.newMember.team = _currentTeam.name;
            EndpointAPIUtils.createTeamMember(action.newMember);
            break;

        default:
            // do nothing
    }

});

module.exports = TeamStore;
