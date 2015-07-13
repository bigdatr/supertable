var React = require('react');
// var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Cell = require('./Cell');
var FilterMenu = require('./FilterMenu');

var ColumnHeader = React.createClass({
    displayName: 'ColumnHeader',
    propTypes: {
        label: React.PropTypes.string,
        width: React.PropTypes.number.isRequired,
        onFilter: React.PropTypes.func
    },
    // mixins: [
    //     PureRenderMixin
    // ],
    shouldComponentUpdate: function (nextProps, nextState) {
        if (this.props.label !== nextProps.label) {
            return true;
        }
        else if (this.props.width !== nextProps.width) {
            return true;
        }

        return false;  
    },
    render() {
        return (
            <Cell className="supertable-columnHeader" width={this.props.width} label={this.renderLabel()} />
        );
    },
    renderLabel() {
        return (
            <div>
                {this.props.label}
                <FilterMenu onChange={this.props.onFilter} />
            </div>
        );
    }
});

module.exports = ColumnHeader;
