/* a collapsible panel for an Accordion */

var React 			= require("react/addons");
var Velocity 		= require("velocity-animate");
var VelocityUI 	= require("velocity-ui-pack");
var _ 					= require("lodash");
var mui 				= require("material-ui");
var FontIcon 		= mui.FontIcon;


var Collapsible = React.createClass({
	propTypes: {
		selectPanel: 			React.PropTypes.func,
		onAnimComplete: 	React.PropTypes.func,
		collapsed: 				React.PropTypes.bool,
		headerStyle: 			React.PropTypes.object,
		iconStyles: 			React.PropTypes.object,
		iconActiveStyle: 	React.PropTypes.object,
		panelStyle: 			React.PropTypes.object,
		icon: 						React.PropTypes.string,
		iconActivated: 		React.PropTypes.string,
		activateOnHover:  React.PropTypes.bool
	},
	getDefaultProps: function(){
		return {
			collapsed:      true,
			iconActivated: 	'fa fa-remove',
			icon: 					'fa fa-plus',
			activateOnHover: false,
			headerStyle:{
				minHeight:	50,
				display:		'block',
				paddingTop:  12,
				paddingLeft: 8,
				position: 	'relative',
				color: 			'#ffffff',
				fontWeight: 100
			},
			// default float for icon
			iconStyle: {
				position: 		'absolute',
				display: 			'block',
				top: 					20,
				right: 				20,
				fontSize: 		15
			},
			iconActiveStyle: {},
			// default style for collapsible panel
			panelStyle: {
				display:					'none',
				backgroundColor: 	'#31322d',
				listStyle: 				'none'
			}
		};
	},
	selectPanel: function(){
		var p = this.props;
		p.selectPanel( p.collapsed ? p.activeKey : null );
	},
	shouldComponentUpdate: function(nextProps){
		return nextProps.collapsed !== this.props.collapsed;
	},
	render: function(){
		var p = this.props;
		var hasChildren = p.children;
		var icon;

		if(p.icon){
			icon = <FontIcon ref="icon"
				className={p.collapsed ? p.icon : (hasChildren ? p.iconActivated : p.icon)}
				style={p.collapsed ? p.iconStyle : _.merge({},p.iconStyle,p.iconActiveStyle)} />;
		} else {
			icon = <span />;
		}
		return (
			<div onMouseEnter={this.props.activateOnHover && this.selectPanel}>
				<div onClick={this.selectPanel}>
					<h3 style={p.headerStyle}>{p.label} {icon}</h3>
				</div>
				<div ref="panel" style={p.panelStyle}>
					{p.children}
				</div>
			</div>
		);
	},
	componentDidUpdate: function(){
		var panel = React.findDOMNode(this.refs.panel);
		Velocity(panel,(!this.props.collapsed ? 'slideDown' : 'slideUp'),
			{duration:300})
			.then(this.props.onAnimComplete);
	}
});

module.exports = Collapsible;
