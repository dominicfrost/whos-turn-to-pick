var LunchPickerDispatcher = require('../dispatcher/lunchPickerDispatcher');
var Constants = require('../constants/constants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _newTeamMemberValue = '';
var _newTeamValue = '';


var TextAreaValueStore = merge(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getNewTeamMemberValue: function() {
        return _newTeamMemberValue;
    },

    getNewTeamValue: function() {
        return _newTeamValue;
    }

});

TextAreaValueStore.dispatchToken = LunchPickerDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.UPDATE_NEW_TEAM_MEMBER_VALUE:
            _newTeamMemberValue = action.value;
            TextAreaValueStore.emitChange();
            break;

        case ActionTypes.UPDATE_NEW_TEAM_VALUE:
            var name = action.value.replace(/\s/g, '');
            _newTeamValue = name.length > 20 ? this.state.textValue : name;
            TextAreaValueStore.emitChange();
            break;

        case ActionTypes.CREATE_TEAM_MEMBER_SUCCESS:
            _newTeamMemberValue = '';
            TextAreaValueStore.emitChange();
            break;

        case ActionTypes.CREATE_TEAM_SUCCESS:
            _newTeamValue = '';
            TextAreaValueStore.emitChange();
            break;


        default:
            // do nothing
    }

});

module.exports = TextAreaValueStore;
