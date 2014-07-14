/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var uniqueKey = 0;

	var teamMembersList = React.createClass({
		render: function() {
			var buttonStyle =  {
				position: 'absolute',
				'right': '5px'
			};

			var removeTeamButtonStyle =  {
				position: 'absolute',
				'right': '22px'
			};

			this.props.teamMembers.sort(function compare(a, b) {
				if (a.lastPicked < b.lastPicked) {
					return -1;
				} else if (a.lastPicked > b.lastPicked) {
					return 1;
				} else {
					return 0;
				}
			});

			var self = this;
			var canPick = this.props.teamMembers.map(function(teamMember, index) {
				if (!teamMember.hasPicked) {
					return <li className="list-group-item" key={'canPick_' + uniqueKey++}>
								{teamMember.name}
								<button type="button" className="btn btn-xs btn-primary" style={buttonStyle} onClick={self._handleMemberRemoved}>x</button>
							</li>
				}
			});
			var canNotPick = this.props.teamMembers.map(function(teamMember, index) {
				if (teamMember.hasPicked) {
					return <li className="list-group-item" key={'cantPick_' + uniqueKey++}>
								{teamMember.name} {self.formatDate(teamMember.lastPicked)}
								<button type="button" className="btn btn-xs btn-primary" style={buttonStyle} onClick={self._handleMemberRemoved}>x</button>
							</li>
				}
			});


			var currentTeamDiv = <div>
									Team: n/a
								</div>;

			if (this.props.currentTeam && this.props.currentTeam !== '' && this.props.currentTeam !== '-') {
				currentTeamDiv = <div>
									Team: {this.props.currentTeam}
									<button type="button" className="btn btn-xs btn-primary" style={removeTeamButtonStyle} onClick={this._handleTeamRemoved}>Remove Team</button>
								</div>;
			}

			return (
				<div className="panel panel-default">
	            	<div className="panel-heading">
	              		<h3 className="panel-title">{currentTeamDiv}</h3>
	            	</div>
            		<div className="panel-body">
            			<div className="col-sm-6">
            				<h4>Can Pick</h4>
							<ul className="list-group">
								{canPick}
					        </ul>
				        </div>
				        <div className="col-sm-6">
				        	<h4>Already Chosen</h4>
					        <ul className="list-group">
								{canNotPick}
					        </ul>
				        </div>
            		</div>
        		</div>
			);
		},

		_handleTeamRemoved: function() {
			var response = confirm('Remove ' + this.props.currentTeam + ' from the team list?');
			if (response) {
				this.props.onRemoveTeam(this.props.currentTeam);
			}
		},

		_handleMemberRemoved: function(event) {
			var name = event.target.parentElement.firstChild.innerText;
			var response = confirm('Remove ' + name + ' from the team?');
			if (response) {
				this.props.onMemberRemoved(name);
			}
		},
		
		formatDate: function(dateString) {
			var date = new Date(dateString);
			return (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getYear() - 100);
		}
	});


	return teamMembersList;
});