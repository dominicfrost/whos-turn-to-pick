/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var addUser = React.createClass({displayName: 'addUser',

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
				React.DOM.div( {style:style}, 
					React.DOM.textarea( {disabled:this.props.disabled, placeholder:"Insert User Name...", style:textareaStyle, ref:"textarea"}),
					React.DOM.button( {disabled:this.props.disabled, style:buttonStyle, onClick:this._handleClick}, "Add User")
				)
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