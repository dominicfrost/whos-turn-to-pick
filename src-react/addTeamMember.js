/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var addUser = React.createClass({

		render: function() {

			return (
				<div className="panel panel-default">
	            	<div className="panel-heading">
	              		<h3 className="panel-title">Team-Member Manager</h3>
	            	</div>
            		<div className="panel-body">
						<form role="form">
							<input type="text" className="form-group form-control" disabled={this.props.disabled} placeholder='Insert User Name...' ref='textarea'/>
							<button type="button" className="form-group btn btn-md btn-primary" disabled={this.props.disabled} onClick={this._handleClick}>Add User</button>
						</form>
					</div>
				</div>
			);
		},

		_handleClick: function() {
			var newMember = {
				name: this.refs.textarea.state.value,
				hasPicked: false,
				lastPicked: new Date(0)
			};
			this.refs.textarea.state.value = '';
			this.props.onMemberAdded(newMember);
		}
	});


	return addUser;
});