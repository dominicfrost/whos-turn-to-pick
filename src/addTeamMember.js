/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var addUser = React.createClass({displayName: 'addUser',

		render: function() {

			return (
				React.DOM.div( {className:"panel panel-default"}, 
	            	React.DOM.div( {className:"panel-heading"}, 
	              		React.DOM.h3( {className:"panel-title"}, "Team-Member Manager")
	            	),
            		React.DOM.div( {className:"panel-body"}, 
						React.DOM.form( {role:"form"}, 
							React.DOM.input( {type:"text", className:"form-group form-control", disabled:this.props.disabled, placeholder:"Insert User Name...", ref:"textarea"}),
							React.DOM.button( {type:"button", className:"form-group btn btn-xs btn-primary", disabled:this.props.disabled, onClick:this._handleClick}, "Add User")
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