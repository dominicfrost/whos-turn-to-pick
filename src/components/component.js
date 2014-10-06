/** @jsx React.DOM */
'use strict';
var React = require('react');
var AddTeamMember = require('./addTeamMember');
var TeamMembersList = require('./teamMembersList');
var TeamList = require('./teamList');
var Picker = require('./picker');

var mainComponent = React.createClass({

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className ="col-sm-4">
                        <TeamList/>
                        <AddTeamMember/>
                        <Picker/>
                    </div>
                    <div className="col-sm-8">
                        <TeamMembersList/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = mainComponent;
