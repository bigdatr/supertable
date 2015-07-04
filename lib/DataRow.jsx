var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Row = require('./Row');

var DataRow = React.createClass({
    displayName: 'DataRow',
    propTypes: {
        rowIndex: React.PropTypes.number,
        rowData: React.PropTypes.object.isRequired,
        fields: React.PropTypes.object.isRequired,
        cellWidth: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.func
        ]).isRequired,
        cellRenderer: React.PropTypes.object
    },
    mixins: [
        PureRenderMixin
    ],
    getDefaultProps: function () {
        return {
            cellRenderer: {}  
        };
    },
    render() {
        var className = 'supertable-datarow';

        if (this.props.rowIndex) {
            var zebra = this.props.rowIndex % 2 === 0 ? 'odd' : 'even';
            className += ' supertable-datarow--' + zebra;
        }

        var cells = this.renderCells();
        var row = <Row className={className}>{cells}</Row>;

        return row;
    },
    renderCells() {
        var _this = this;
        var rowData = this.props.rowData;
        var cellRenderer = this.props.cellRenderer;

        return this.props.fields
                        .map((f, i) => {
                            var fieldName = f.get('name');
                            var raw = rowData.get(fieldName);
                            var val = cellRenderer.has(fieldName) ? cellRenderer.get(fieldName)(rowData) : raw;
                            var cellWidth = typeof _this.props.cellWidth === 'function' ? _this.props.cellWidth(i) : _this.props.cellWidth;

                            var cell = (
                                <div key={i} className="supertable-cell" style={{width: cellWidth}}>
                                    {val}
                                </div>
                            );

                            return cell;
                        });
    }
});

module.exports = DataRow;
