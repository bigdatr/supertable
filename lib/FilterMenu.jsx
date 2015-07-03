var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var FilterMenu = React.createClass({
    displayName: 'FilterMenu',
    propTypes: {
        onChange: React.PropTypes.func.isRequired
    },
    mixins: [
        PureRenderMixin
    ],
    getInitialState: function () {
        return {
            visible: false  
        };
    },
    onShow() {
        this.setState({visible: true});
    },
    onTextSearch() {
        var value = this.refs.textFilter.getDOMNode().value;

        this.props.onChange({
            operator: 'contains',
            value: value
        });
    },
    render() {
        return (
            <span className="FilterMenu" onClick={this.onShow}>
                <span className="FilterMenu_icon">V</span>
                {this.renderMenu()}
            </span>
        );
    },
    renderMenu() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <div className="FilterMenu_menu">
                {this.renderTextSearch()}
            </div>
        );
    },
    renderTextSearch() {
        return (
            <input ref="textFilter" type="text" name="supertable-filter-text" placeholder="Search..." onChange={this.onTextSearch} />
        );
    }
});

module.exports = FilterMenu;
