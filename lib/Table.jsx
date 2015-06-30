var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Row = require('./Row');
var Column = require('./Column');
var DataRow = require('./DataRow');
var Toolbar = require('./Toolbar');

var Table = React.createClass({
    displayName: 'Table',
    propTypes: {
        data: React.PropTypes.object,
        rowGetter: React.PropTypes.func.isRequired,
        cellRenderer: React.PropTypes.func,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        fields: React.PropTypes.object.isRequired
    },
    mixins: [
        PureRenderMixin
    ],
    getCellWidth(fields, fieldIndex) {
        var f = fields.get(fieldIndex);
        var flexGrow = f.get('flexGrow') || 1;
        var cellWidth = this.props.width / fields.size;
        var width = cellWidth * flexGrow;

        return width;
    },
    getFields() {
        // TODO: Apply any filters to add/remove fields from display
        return this.props.fields;
    },
    calcContainerWidth(w) {
        var totalFields = this.props.fields.size;
        var totalFlexGrow = 0;

        this.props.fields.forEach(f => {
            var fg = f.get('flexGrow') || 1;
            totalFlexGrow += fg;
        });

        var nextWidth = (w/totalFields) * totalFlexGrow;

        return nextWidth;
    },
    render() {
        var styles = {
            container: {
                width: this.calcContainerWidth(this.props.width)
            },
            content: {
                height: this.props.height
            }
        };

        var _fields = this.getFields();

        return (
            <div className="supertable-container">
                <Toolbar />
                <div className="supertable">
                    <div className="supertable-wrapper" style={styles.container}>
                        <Row className="supertable-header">{this.renderColumnHeaders(_fields)}</Row>

                        <div className="supertable-content" style={styles.content}>
                            {this.renderDataRows(_fields)}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    renderColumnHeaders(fields) {
        var _this = this;

        return fields.map((f, i) => {
            var width = _this.getCellWidth(fields, i);

            return <Column key={f.get('name')} label={f.get('label') || ''} width={width} />;
        });
    },
    renderDataRows(fields) {
        var _this = this;

        return this.props.data.map((d, i) => {
            return <DataRow     key={i}
                                rowIndex={i}
                                rowData={_this.props.rowGetter(d, i)}
                                cellWidth={_this.getCellWidth.bind(_this, fields)}
                                cellRenderer={this.props.cellRenderer}
                                 />;
        });
    }
});

module.exports = Table;
