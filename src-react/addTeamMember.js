/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var addUser = React.createClass({
		render: function() {
			var style = {
				float: 'left',
				'padding-right': '100px'
			};

			return (
				<div style={style} >
					<textarea ref="textarea"onChange={this._handleChange}> </textarea>
					<button onClick={this._handleClick}>Add User</button>
				</div>
			);
		},

		_handleChange: function() {
			console.log('changed');
		},

		_handleClick: function() {
			var newMember = {
				name: this.refs.textarea.state.value,
				hasPicked: false,
				lastPicked: null
			};
			this.props.onMemberAdded(newMember);
		}
	});


	return addUser;
});