/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var addUser = React.createClass({

		render: function() {
			var style = {
				position: 'fixed',
				top: '120px'
			};

			var textareaStyle = {
				resize: 'none',
				height: '14px'
			};

			var buttonStyle = {
				position: 'relative',
				top: '-5px'
			};

			return (
				<div style={style}>
					<textarea disabled={this.props.disabled} placeholder='Insert User Name...' style={textareaStyle} ref='textarea'/>
					<button disabled={this.props.disabled} style={buttonStyle} onClick={this._handleClick}>Add User</button>
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