/** @jsx React.DOM */
define(function(require) {
	'use strict';
	var React = require('../tools/react');

	var addUser = React.createClass({displayName: 'addUser',
		render: function() {
			var style = {
				float: 'left',
				'padding-right': '100px'
			};

			return (
				React.DOM.div( {style:style} , 
					React.DOM.textarea( {ref:"textarea",onChange:this._handleChange},  " " ),
					React.DOM.button( {onClick:this._handleClick}, "Add User")
				)
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