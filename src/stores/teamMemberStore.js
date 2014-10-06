var LunchPickerDispatcher = require('../dispatcher/lunchPickerDispatcher');
var Constants = require('../constants/constants');
var EndpointAPIUtils = require('../utils/endpointAPIUtils');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var TextAreaValueStore = require('../stores/textAreaValuesStore');

var ActionTypes = Constants.ActionTypes;
var PICK_THRESHOLD = Constants.Constants.PICK_THRESHOLD;
var CHANGE_EVENT = 'change';

var _teamMembers = [];
var _currentPicker = 'n/a';
var _newMemberButtonDisabled = true;

function updateCurrentPicker() {
    var recentPick = 0;
    var memberPicked;
    _currentPicker = 'n/a';

    for (var i = 0; i < _teamMembers.length; i++) {
        memberPicked = new Date(_teamMembers[i].lastPicked);
        if (recentPick < memberPicked) {
            recentPick = memberPicked;
            _currentPicker = _teamMembers[i];
        }
    }
}

function processTeamMembers(teamMembers) {
    _teamMembers = teamMembers || [];
    updateCurrentPicker();
}

function removeTeamMember(teamMember) {
    for (var i = 0; i < _teamMembers.length; i++) {
        if (teamMember.name === _teamMembers[i].name) {
            _teamMembers.splice(i, 1);
            break;
        }
    }
    updateCurrentPicker();
}

function updateTeamMember(updatedMembers) {
    for (var i = 0; i < updatedMembers.length; i++) {
        for (var j = 0; j < _teamMembers; j++) {
            if (updatedMembers[i].name === _teamMembers[j].name) {
                _teamMembers[j] = updatedMembers[i];
                break;
            }
        }
    }
    updateCurrentPicker();
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
    },

    getPickerDisabled: function() {
        var noEligiblePickers = true;
        for (var i = 0; i < _teamMembers.length; i++) {
            if (!(_teamMembers[i].active === false || _teamMembers[i].hasPicked)) {
                noEligiblePickers = false;
                break;
            }
        }
        return _currentPicker !== 'n/a' && new Date() - new Date(_currentPicker.lastPicked) < PICK_THRESHOLD ||
                _teamMembers.length === 0 || noEligiblePickers;
    },

    getNewTeamMemberDisabled: function() {
        return _newMemberButtonDisabled;
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
            _newMemberButtonDisabled = true;
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.REMOVE_TEAM_MEMBER_SUCCESS:
            removeTeamMember(action.rawMessages.teamMember);
            checkBucketsForReset();
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.UPDATE_TEAM_MEMBER_SUCCESS:
            checkBucketsForReset();
            updateTeamMember(action.rawMessages.teamMembers);
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.UPDATE_NEW_TEAM_MEMBER_VALUE:
            LunchPickerDispatcher.waitFor([TextAreaValueStore.dispatchToken]);
            var newValue = TextAreaValueStore.getNewTeamMemberValue();
            if (newValue === '') {
                _newMemberButtonDisabled = true;
            } else {
                _newMemberButtonDisabled = false;
                for (var i = 0; i < _teamMembers.length; i++) {
                    if (newValue === _teamMembers[i].name) {
                        _newMemberButtonDisabled = true;
                        break;
                    }
                }
            }
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.CREATE_TEAM_SUCCESS:
            _teamMembers = [];
            _currentPicker = 'n/a';
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.REMOVE_TEAM_SUCCESS:
            _teamMembers = [];
            _currentPicker = 'n/a';
            TeamMemberStore.emitChange();
            break;

        case ActionTypes.TOGGLE_ACTIVE_USER:
            var name = action.teamMember.name;
            for (var i = 0; i < _teamMembers.length; i++) {
                if (_teamMembers[i].name === name) {
                    _teamMembers[i].active = _teamMembers[i].active === undefined ? false : !_teamMembers[i].active;
                    break;
                }
            }

            TeamMemberStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = TeamMemberStore;
