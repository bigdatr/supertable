const React = require('react');
const Immutable = require('immutable');

const Row = require('./Row');
const ColumnHeader = require('./ColumnHeader');
const DataRow = require('./DataRow');
const Loader = require('./Loader');

const Table = React.createClass({
    displayName: 'Table',
    propTypes: {
        data: React.PropTypes.object,
        cellRenderer: React.PropTypes.object,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        fields: React.PropTypes.object.isRequired
    },
    mixins: [
        React.addons.PureRenderMixin
    ],
    getInitialState() {
        return {
            filters: Immutable.List()
        };
    },
    onFilter(field, filter) {
        const f = Immutable.Map({
            field: field.get('name'),
            operator: filter.operator,
            value: filter.value
        });

        const nextFilters = Immutable.List().push(f);

        this.setState({filters: nextFilters});
    },
    getCellWidth(fields, fieldIndex) {
        const f = fields.get(fieldIndex);
        const flexGrow = f.get('flexGrow') || 1;
        const cellWidth = this.props.width / fields.size;
        const width = cellWidth * flexGrow;

        return width;
    },
    getFields() {
        // TODO: Apply any column filters to add/remove fields from display
        return this.props.fields;
    },
    getContainerWidth(w) {
        const totalFields = this.props.fields.size;
        let totalFlexGrow = 0;

        this.props.fields.forEach(f => {
            const fg = f.get('flexGrow') || 1;
            totalFlexGrow += fg;
        });

        const nextWidth = (w / totalFields) * totalFlexGrow;

        return nextWidth;
    },
    render() {
        const styles = {
            container: {
                width: this.props.width
            },
            wrapper: {
                width: this.getContainerWidth(this.props.width)
            },
            content: {
                height: this.props.height
            }
        };

        const _fields = this.getFields();

        return (
            <div className="supertable-container">
                <div className="supertable" style={styles.container}>
                    <div className="supertable-wrapper" style={styles.wrapper}>
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
        const _this = this;

        return fields.map((f, i) => {
            const width = _this.getCellWidth(fields, i);

            return <ColumnHeader key={f.get('name')} label={f.get('label') || ''} width={width} onFilter={_this.onFilter.bind(_this, f)} />;
        });
    },
    renderDataRows(fields) {
        const _this = this;
        const {data, cellRenderer} = this.props;

        if (!data) {
            return <Loader />;
        }

        return data.map((d, i) => {
            return (
                <DataRow key={i}
                        rowIndex={i}
                        rowData={d}
                        fields={fields}
                        cellWidth={_this.getCellWidth.bind(_this, fields)}
                        cellRenderer={cellRenderer} />
            );
        }).toJS();
    }
});

module.exports = Table;
