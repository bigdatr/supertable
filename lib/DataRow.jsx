const React = require('react');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;

const Row = require('./Row');

const DataRow = React.createClass({
    displayName: 'DataRow',
    propTypes: {
        rowIndex: React.PropTypes.number,
        rowData: React.PropTypes.object.isRequired,
        fields: React.PropTypes.object.isRequired,
        cellWidth: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.func
        ]).isRequired,
        cellRenderer: React.PropTypes.object,
        rowHeight: React.PropTypes.number
    },
    mixins: [
        PureRenderMixin
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
        const row = <Row className={className} rowHeight={this.props.rowHeight}>{cells}</Row>;

        return row;
    },
    renderCells() {
        const _this = this;
        const {rowData, cellRenderer} = this.props;

        return this.props.fields
                        .map((f, i) => {
                            const fieldName = f.get('name');
                            let raw = rowData.get(fieldName);

                            // Convert Immutable object to plain js
                            if (raw && raw.toJS) { raw = raw.toJS(); }

                            // Automatically convert arrays to comma seperated strings
                            if (typeof raw === 'object' && raw.length) { raw = raw.join(', '); }

                            const val = cellRenderer.has(fieldName) ? cellRenderer.get(fieldName)(rowData) : raw;
                            const cellWidth = typeof _this.props.cellWidth === 'function' ? _this.props.cellWidth(i) : _this.props.cellWidth;

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
