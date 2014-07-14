/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var addUser = React.createClass({

		render: function() {

			var textareaStyle = {
				resize: 'none',
				height: '24px'
			};

			var buttonStyle = {
				position: 'relative',
				top: '-8px',
				'margin-left': '15px'
			};

			return (
				<div className="panel panel-default">
	            	<div className="panel-heading">
	              		<h3 className="panel-title">Team-Member Manager</h3>
	            	</div>
            		<div className="panel-body">
						<div>
							<textarea disabled={this.props.disabled} placeholder='Insert User Name...' style={textareaStyle} ref='textarea'/>
							<button type="button" className="btn btn-xs btn-primary" disabled={this.props.disabled} style={buttonStyle} onClick={this._handleClick}>Add User</button>
						</div>
					</div>
				</div>
			);
		},

		_handleClick: function() {
			var newMember = {
				name: this.refs.textarea.state.value,
				hasPicked: false,
				lastPicked: null
			};
			this.refs.textarea.state.value = '';
			this.props.onMemberAdded(newMember);
		}
	});


	return addUser;
});