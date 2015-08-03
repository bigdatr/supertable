import React from 'react';
import Cell from './Cell';

const ColumnHeader = React.createClass({
    displayName: 'ColumnHeader',
    propTypes: {
        label: React.PropTypes.string,
        width: React.PropTypes.number.isRequired
    },
    shouldComponentUpdate(nextProps) {
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
            </div>
        );
    }
});

module.exports = ColumnHeader;
