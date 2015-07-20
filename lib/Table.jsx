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
        loading: React.PropTypes.bool,

        fields: React.PropTypes.object.isRequired
    },
    mixins: [
        React.addons.PureRenderMixin
    ],
    getDefaultProps() {
        return {
            loading: false
        };
    },
    getInitialState() {
        return {
            filters: Immutable.List()
        };
    },
    getCellWidth(fields, fieldIndex) {
        const f = fields.get(fieldIndex);
        const flexGrow = f.get('flexGrow') || 1;
        const cellWidth = this.props.width / fields.size;
        const width = cellWidth * flexGrow;

        return width;
    },
    getTotalWidth() {
        const _this = this;
        const {fields} = this.props;
        let totalWidth = 0;

        fields.forEach((f, i) => {
            const width = _this.getCellWidth(fields, i);
            totalWidth += width;
        });

        return totalWidth;
    },
    render() {
        const totalWidth = this.getTotalWidth();
        const styles = {
            wrapper: {
                width: totalWidth
            }
        };

        return (
            <div className="supertable-container">
                <div className="supertable">
                    <div className="supertable-wrapper" style={styles.wrapper}>
                        {this.renderColumnHeaders(totalWidth)}

                        <TableBody {...this.props} cellWidth={this.getCellWidth} width={totalWidth} />

                        {this.renderLoader()}
                    </div>
                </div>
            </div>
        );
    },
    renderColumnHeaders(totalWidth) {
        const _this = this;
        const {fields} = this.props;
        const headers = fields.map((f, i) => {
            return <ColumnHeader key={f.get('name')} label={f.get('label') || ''} width={_this.getCellWidth(fields, i)} />;
        });

        return (
            <Row className="supertable-header" width={totalWidth}>
                {headers}
            </Row>
        );
    },
    renderLoader() {
        if (!this.props.loading) { return null; }

        const style = {
            backgroundColor: '#93619f',
            color: '#fff',
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 600,
            padding: 50
        };

        return <div style={style}>Loading...</div>;
    }
});

module.exports = Table;
