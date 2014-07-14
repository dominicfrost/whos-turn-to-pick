/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var addUser = React.createClass({displayName: 'addUser',

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
				React.DOM.div( {className:"panel panel-default"}, 
	            	React.DOM.div( {className:"panel-heading"}, 
	              		React.DOM.h3( {className:"panel-title"}, "Team-Member Manager")
	            	),
            		React.DOM.div( {className:"panel-body"}, 
						React.DOM.div(null, 
							React.DOM.textarea( {disabled:this.props.disabled, placeholder:"Insert User Name...", style:textareaStyle, ref:"textarea"}),
							React.DOM.button( {type:"button", className:"btn btn-xs btn-primary", disabled:this.props.disabled, style:buttonStyle, onClick:this._handleClick}, "Add User")
						)
					)
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