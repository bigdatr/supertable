import React from 'react/addons';
import Immutable from 'immutable';

import Row from './Row';
import ColumnHeader from './ColumnHeader';
import TableBody from './TableBody';

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
    getWidths() {
        let totalFlexGrow = 0;
        let totalFixedWidthColumnPx = 0;

        this.props.fields.forEach(f => {
            if (f.has('width')) {
                // Fixed width columns (ignores flexGrow prop)
                totalFixedWidthColumnPx += f.get('width');
            }
            else {
                const flexGrow = f.get('flexGrow') || 1;
                totalFlexGrow += flexGrow;
            }
        });

        // Calculate width of each flex unit after allocating space for fixed width columns
        const unitWidth = (this.props.width - totalFixedWidthColumnPx) / totalFlexGrow;

        const _widths = this.props.fields.map(f => {
            if (f.has('width')) {
                return f.get('width');
            }

            const flexGrow = f.get('flexGrow') || 1;

            return Math.floor(flexGrow * unitWidth);
        }).toJS();

        return _widths;
    },
    render() {
        const _widths = this.getWidths();

        return (
            <div className="supertable-container">
                <div className="supertable">
                    <div className="supertable-wrapper">
                        {this.renderColumnHeaders(_widths)}

                        <TableBody {...this.props} cellWidth={_widths} width={this.props.width} />

                        {this.renderLoader()}
                    </div>
                </div>
            </div>
        );
    },
    renderColumnHeaders(widths) {
        const headers = this.props.fields.map((f, i) => {
            return <ColumnHeader key={f.get('name')} label={f.get('label')} width={widths[i]} />;
        });

        return (
            <Row className="supertable-header" width={this.props.width}>
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
