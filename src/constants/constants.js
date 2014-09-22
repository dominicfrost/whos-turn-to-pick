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
