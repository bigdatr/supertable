const React = require('react');

const Cell = require('./Cell');
const FilterMenu = require('./FilterMenu');

const ColumnHeader = React.createClass({
    displayName: 'ColumnHeader',
    propTypes: {
        label: React.PropTypes.string,
        width: React.PropTypes.number.isRequired,
        onFilter: React.PropTypes.func,
        filter: React.PropTypes.object
    },
    shouldComponentUpdate: function(nextProps) {
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
        if (this.props.filter && !this.props.filter.enabled) {
            return null;
        }

        return (
            <div>
                {this.props.label}
                <FilterMenu onChange={this.props.onFilter} />
            </div>
        );
    }
});

module.exports = ColumnHeader;
