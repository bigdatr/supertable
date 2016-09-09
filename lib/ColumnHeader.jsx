import React from 'react';
import Cell from './Cell';

const ColumnHeader = React.createClass({
    displayName: 'ColumnHeader',
    propTypes: {
        label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
        width: React.PropTypes.number.isRequired,
        title: React.PropTypes.string,
        field: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            label: '',
            title: '',
            field: ''
        };
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
        const {field} = this.props;
        return <Cell 
            className={`supertable-columnHeader supertable-columnHeader-${field}`}
            width={this.props.width} 
            label={this.renderLabel()} 
            title={this.props.title} 
        />;
    },
    renderLabel() {
        return <div title={this.props.title}>{this.props.label}</div>;
    }
});

module.exports = ColumnHeader;
