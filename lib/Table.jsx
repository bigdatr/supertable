var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Immutable = require('immutable');

var Row = require('./Row');
var ColumnHeader = require('./ColumnHeader');
var DataRow = require('./DataRow');
var Toolbar = require('./Toolbar');

var FilterUtils = require('./utils/FilterUtils');

var Table = React.createClass({
    displayName: 'Table',
    propTypes: {
        data: React.PropTypes.object,
        cellRenderer: React.PropTypes.object,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        fields: React.PropTypes.object.isRequired,
        
        pagination: React.PropTypes.bool,
        pageSize: React.PropTypes.number
    },
    mixins: [
        PureRenderMixin
    ],
    getDefaultProps: function () {
        return {
            pagination: true,
            pageSize: 100
        };
    },
    getInitialState: function () {
        return {
            filters: Immutable.List(),

            currentPage: 1
        };
    },
    getCellWidth(fields, fieldIndex) {
        var f = fields.get(fieldIndex);
        var flexGrow = f.get('flexGrow') || 1;
        var cellWidth = this.props.width / fields.size;
        var width = cellWidth * flexGrow;

        return width;
    },
    getFields() {
        // TODO: Apply any column filters to add/remove fields from display
        return this.props.fields;
    },
    getData() {
        var data = this.props.data;
        
        // Apply the data filters
        this.state.filters.forEach(f => {
            data = FilterUtils(data, f);
        });

        return data;
    },
    getPagedData(data) {
        // Apply pagination
        if (this.props.pagination) {
            var skip = (this.state.currentPage-1) * this.props.pageSize;
            data = data.skip(skip).take(this.props.pageSize);
        }

        return data;
    },
    onFilter(field, filter) {
        var f = Immutable.Map({
            field: field.get('name'),
            operator: filter.operator,
            value: filter.value
        });

        var nextFilters = Immutable.List().push(f);

        this.setState({filters: nextFilters});
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
    onPageRequested(nextPage) {
        this.setState({currentPage: nextPage});
    },
    render() {
        var styles = {
            container: {
                width: this.props.width
            },
            wrapper: {
                width: this.calcContainerWidth(this.props.width)
            },
            content: {
                height: this.props.height
            }
        };

        var _fields = this.getFields();
        var _data = this.getData();

        return (
            <div className="supertable-container">
                {this.renderToolbar(_data)}
                <div className="supertable" style={styles.container}>
                    <div className="supertable-wrapper" style={styles.wrapper}>
                        <Row className="supertable-header">{this.renderColumnHeaders(_fields)}</Row>

                        <div className="supertable-content" style={styles.content}>
                            {this.renderDataRows(_fields, _data)}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    renderToolbar(data) {
        var _totalPages = Math.ceil(data.size / this.props.pageSize);

        return <Toolbar currentPage={this.state.currentPage} totalPages={_totalPages} onPageRequested={this.onPageRequested} />;
    },
    renderColumnHeaders(fields) {
        var _this = this;

        return fields.map((f, i) => {
            var width = _this.getCellWidth(fields, i);

            return <ColumnHeader key={f.get('name')} label={f.get('label') || ''} width={width} onFilter={_this.onFilter.bind(_this, f)} />;
        });
    },
    renderDataRows(fields, data) {
        var _this = this;

        return this.getPagedData(data).map((d, i) => {
            return <DataRow     key={i}
                                rowIndex={i}
                                rowData={d}
                                fields={fields}
                                cellWidth={_this.getCellWidth.bind(_this, fields)}
                                cellRenderer={this.props.cellRenderer} />;
        }).toJS();
    }
});

module.exports = Table;
