import React from 'react/addons';
import Row from './Row';

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
    mixins: [
        React.addons.PureRenderMixin
    ],
    getDefaultProps() {
        return {
            cellRenderer: {}
        };
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
        const {rowData, cellRenderer} = this.props;
        const _widths = this.props.cellWidth;

        return this.props.fields
                        .map((f, i) => {
                            const fieldName = f.get('name');
                            let raw = rowData.get(fieldName);

                            // Convert Immutable object to plain js
                            if (raw && raw.toJS) { raw = raw.toJS(); }

                            // Automatically convert arrays to comma seperated strings
                            if (typeof raw === 'object' && raw.length) { raw = raw.join(', '); }

                            const val = cellRenderer.has(fieldName) ? cellRenderer.get(fieldName)(rowData) : raw;
                            const cellWidth = _widths[i];

                            const cell = (
                                <div key={i} className="supertable-cell" style={{width: cellWidth}}>
                                    {val}
                                </div>
                            );

                            return cell;
                        });
    }
});

module.exports = DataRow;
