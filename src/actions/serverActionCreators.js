/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
