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
var EndpointAPIUtils = require('../utils/endpointAPIUtils');

var ActionTypes = Constants.ActionTypes;

module.exports = {

    removeTeamMember: function(teamMember) {
       EndpointAPIUtils.removeTeamMember(teamMember);
    },

    selectTeam: function(teamName) {
        LunchPickerDispatcher.handleViewAction({
            type: ActionTypes.SELECT_TEAM,
            teamName: teamName
        });
    },

    createTeamMember: function(newMember) {
        LunchPickerDispatcher.handleViewAction({
            type: ActionTypes.CREATE_TEAM_MEMBER,
            newMember: newMember
        });
    },

    pick: function(teamMember) {
        EndpointAPIUtils.pickTeamMember(teamMember);
    }

};
