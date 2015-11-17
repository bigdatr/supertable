import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
const Transition = require('react-addons-css-transition-group');

import Immutable from 'immutable';

import Row from './Row';
import ColumnHeader from './ColumnHeader';
import TableBody from './TableBody';
import Loader from './Loader';

const Table = React.createClass({
    displayName: 'Table',
    propTypes: {
        data: React.PropTypes.object,
        cellRenderer: React.PropTypes.object,
        headerRenderer: React.PropTypes.object,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        rowHeight: React.PropTypes.number.isRequired,
        loading: React.PropTypes.bool,

        fields: React.PropTypes.object.isRequired
    },
    mixins: [
        PureRenderMixin
    ],
    getDefaultProps() {
        return {
            loading: false,
            headerRenderer: Immutable.Map()
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
                {this.renderLoader()}
                <div className="supertable">
                    <div className="supertable-wrapper">
                        {this.renderColumnHeaders(_widths)}

                        <TableBody {...this.props} cellWidth={_widths} width={this.props.width} />
                    </div>
                </div>
            </div>
        );
    },
    renderColumnHeaders(widths) {
        const {headerRenderer} = this.props;

        const headers = this.props.fields.map((f, i) => {
            const field = f.get('name');
            let label = f.get('label') || '';

            if (headerRenderer.has(field)) {
                label = headerRenderer.get(field)(f);
            }

            return <ColumnHeader key={field} label={label} width={widths[i]} />;
        });

        return (
            <Row className="supertable-header" width={this.props.width}>
                {headers}
            </Row>
        );
    },
    renderLoader() {
        if (!this.props.loading) { 
            return null; 
        }

        const styles = {
            wrapper: {
                width: this.props.width - (16 * 2),
                marginTop: 40,
                position: 'absolute',
                textAlign: 'center'
            },
            loader: {
                // backgroundColor: '#93619f',
                // color: '#fff',
                color: '#93619f',
                backgroundColor: '#fff',
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 600,
                padding: '10px 30px',
                opacity: 0.7,
                width: 200
            }
        };

        var defaultLoader = <div style={styles.wrapper}>
            <div style={styles.loader}>Loading...</div>
        </div>

        return (
            <Transition transitionName="supertable-loader">
                <Loader key="loader">{this.props.loader || defaultLoader}</Loader>
            </Transition>
        );
    }
});

module.exports = Table;
