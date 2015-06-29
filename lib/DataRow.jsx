var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Row = require('./Row');
var Column = require('./Column');

var DataRow = React.createClass({
    displayName: 'DataRow',
    propTypes: {
        rowIndex: React.PropTypes.number,
        rowData: React.PropTypes.object.isRequired,
        cellWidth: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.func
        ]).isRequired,
        cellRenderer: React.PropTypes.func
    },
    mixins: [
        PureRenderMixin
    ],
    render() {
        var _this = this;

        var cells = this.props.rowData.map((r, i) => {
            var val = _this.props.cellRenderer ? _this.props.cellRenderer(r, i) : r;
            var cellWidth = typeof _this.props.cellWidth === 'function' ? _this.props.cellWidth(i) : _this.props.cellWidth;

            return _this.renderCell(val, i, cellWidth);
        });

        var className = 'supertable-datarow';

        if (this.props.rowIndex) {
            var zebra = this.props.rowIndex % 2 === 0 ? 'odd' : 'even';
            className += ' supertable-datarow--' + zebra;
        }

        return <Row className={className}>{cells}</Row>;
    },
    renderCell(label, key, cellWidth) {
        return (
            <Column key={key} width={cellWidth} label={label} />
        );
    }
});

module.exports = DataRow;
