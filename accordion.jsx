/* an accordion to fill with collapsible panels */

var React 			= require("react/addons");
var _ 					= require("lodash");
var Collapsible = require("./collapsible.jsx");

var Accordion = React.createClass({
	propTypes: {
		hoverPanel: 	React.PropTypes.bool,
		closeOnExit: 	React.PropTypes.bool,
		activePanel: 	React.PropTypes.number,
		style: 				React.PropTypes.object
	},
	getDefaultProps: function(){
		return {
			hoverPanel: false,
			closeOnExit: true,
			activePanel: null
		};
	},
	getInitialState: function(){
		return ({activePanel:(this.props.activePanel || null)});
	},
	setActivePanel: function(key){
		if(!this._isAnimating){
			this._isAnimating = true;
			this._queuedPanel = false;
			this.setState({
				activePanel:key
			});
		} else {
			this._queuedPanel = key;
		}
	},
	onAnimComplete: function(){
		this._isAnimating = false;
		var self = this;
		if(this._queuedPanel){
			var timeout = setTimeout(function(){
				self.setActivePanel(self._queuedPanel);
				clearTimeout(timeout);
			},100);
		}
	},
	render: function(){

		var activePanel = this.state.activePanel;
		var setActivePanel = this.setActivePanel;
		var onAnimComplete = this.onAnimComplete;
		var children = _.map(this.props.children,function(child,i){

			var key = child.key || i;
			var props = {
				key: 							key,
				activeKey: 				key,
				collapsed: 				(activePanel !== child.key),
				selectPanel: 			setActivePanel,
				onAnimComplete: 	onAnimComplete,
				activateOnHover:  this.props.hoverPanel
			};
			return React.cloneElement(child,props);
		},this);

		return (
			<div onMouseLeave={this.props.closeOnExit && this.setActivePanel} style={_.extend({},this.props.style,{cursor:'pointer'})}>
				{children}
			</div>
		);
	}
});

Accordion.Collapsible = Collapsible;
module.exports = Accordion;
