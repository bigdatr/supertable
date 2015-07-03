var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Row = require('./Row');
var Cell = require('./Cell');

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
        cellRenderer: React.PropTypes.func
    },
    mixins: [
        PureRenderMixin
    ],
    render() {
        var className = 'supertable-datarow';

        if (this.props.rowIndex) {
            var zebra = this.props.rowIndex % 2 === 0 ? 'odd' : 'even';
            className += ' supertable-datarow--' + zebra;
        }

        return <Row className={className}>{this.renderCells()}</Row>;
    },
    renderCells() {
        var _this = this;
        var rowData = this.props.rowData;
        return this.props.fields
                        .map((f, i) => {
                            var fieldName = f.get('name');
                            var raw = rowData.get(fieldName);

                            var val = _this.props.cellRenderer ? _this.props.cellRenderer(raw, fieldName, rowData) : raw;
                            var cellWidth = typeof _this.props.cellWidth === 'function' ? _this.props.cellWidth(i) : _this.props.cellWidth;

                            return <Cell key={i} width={cellWidth} label={val} />;
                        });
    }
});

module.exports = DataRow;
