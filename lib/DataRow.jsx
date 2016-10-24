import React from 'react';
import Row from './Row';
import {List} from 'immutable';

const DataRow = React.createClass({
    displayName: 'DataRow',
    propTypes: {
        rowIndex: React.PropTypes.number,
        rowData: React.PropTypes.object.isRequired,
        fields: React.PropTypes.object.isRequired,
        cellWidth: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        cellRenderer: React.PropTypes.object,
        rowHeight: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            cellRenderer: {}
        };
    },
    shouldComponentUpdate(nextProps) {
        const {rowData, fields, cellWidth} = this.props;

        if (nextProps.rowData !== rowData) {
            return true;
        }
        else if (nextProps.fields !== fields) {
            return true;
        }
        else if (!List(nextProps.cellWidth).equals(List(cellWidth))) {
            return true;
        }

        return false;
    },
    render() {
        let className = 'supertable-datarow';

        if (this.props.rowIndex) {
            const zebra = this.props.rowIndex % 2 === 0 ? 'odd' : 'even';
            className += ' supertable-datarow--' + zebra;
        }

        const cells = this.renderCells();
        const row = <Row className={className} height={this.props.rowHeight}>{cells}</Row>;

        return row;
    },
    renderCells() {
        const {rowData, cellRenderer, cellWidth} = this.props;

        return this.props.fields
            .map((f, i) => {
                const fieldName = f.get('name');
                let raw = rowData.get(fieldName);

                // Convert Immutable object to plain js
                if (raw && raw.toJS) { 
                    raw = raw.toJS(); 
                }

                // Automatically convert arrays to comma seperated strings
                if (typeof raw === 'object' && raw.length) { 
                    raw = raw.join(', '); 
                }

                const val = cellRenderer.has(fieldName) 
                    ? cellRenderer.get(fieldName)(rowData) 
                    : raw;

                return <div key={i} className="supertable-cell" style={{width: cellWidth[i]}}>{val}</div>;
            });
    }
});

module.exports = DataRow;
