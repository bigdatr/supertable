const React = require('react');
const Immutable = require('immutable');

const Row = require('./Row');
const ColumnHeader = require('./ColumnHeader');
const TableBody = require('./TableBody');

const Table = React.createClass({
    displayName: 'Table',
    propTypes: {
        data: React.PropTypes.object,
        cellRenderer: React.PropTypes.object,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        rowHeight: React.PropTypes.number.isRequired,

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
    getCellWidth(fields, fieldIndex) {
        const f = fields.get(fieldIndex);
        const flexGrow = 1//;f.get('flexGrow') || 1;
        const cellWidth = this.props.width / fields.size;
        const width = cellWidth * flexGrow;

        return width;
    },
    // getContainerWidth(w) {
    //     const totalFields = this.props.fields.size;
    //     let totalFlexGrow = 0;

    //     this.props.fields.forEach(f => {
    //         const fg = 1;//f.get('flexGrow') || 1;
    //         totalFlexGrow += fg;
    //     });

    //     const nextWidth = (w / totalFields) * totalFlexGrow;

    //     return nextWidth;
    // },
    render() {
        // const {data, fields, cellRenderer, rowHeight, width} = this.props;

        return (
            <div className="supertable-container">
                <div className="supertable">
                    <div className="supertable-wrapper">
                        {this.renderColumnHeaders()}

                        <TableBody {...this.props} />

                    </div>
                </div>
            </div>
        );
    },
    renderColumnHeaders() {
        const _this = this;

        const {fields} = this.props;

        const headers = fields.map((f, i) => {
            const width = _this.getCellWidth(fields, i);
            return <ColumnHeader key={f.get('name')} label={f.get('label') || ''} width={width} />;
        });

        return (
            <Row className="supertable-header">
                {headers}
            </Row>
        );
    }
});

module.exports = Table;
