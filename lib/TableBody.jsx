import React from 'react';

import DataRow from './DataRow';
import Loader from './Loader';

import WindowingHelpers from './utils/WindowingHelpers';

const TableBody = React.createClass({
    displayName: 'TableBody',
    propTypes: {
        data: React.PropTypes.object,
        fields: React.PropTypes.object.isRequired,
        cellRenderer: React.PropTypes.object,
        cellWidth: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,

        width: React.PropTypes.number,
        height: React.PropTypes.number,

        pageSize: React.PropTypes.number,
        bufferPages: React.PropTypes.number,

        rowHeight: React.PropTypes.number.isRequired,

        onLoadMore: React.PropTypes.func,
        loading: React.PropTypes.bool
    },
    // mixins: [
    //     React.addons.PureRenderMixin
    // ],
    getDefaultProps() {
        return {
            pageSize: 50,
            bufferPages: 1,

            onLoadMore: () => {},
            loading: false
        };
    },
    getInitialState() {
        this._position = 0;
        this._isScrolling = false;

        return {
            visibleDataIndex: 0,
            scrollTop: 0,
            rowsToSkip: 0,
            numberOfElementsToRender: this.props.pageSize * 2
        };
    },
    componentDidMount() {
        this._rafUpdate();
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        const currentProps = this.props;
        const currentState = this.state;

        // If any of these props change, re-render
        const _props = [
            'data',
            'pageSize',
            'loading',
            'bufferPages'
        ];

        const propChanged = _props.find(p => currentProps[p] !== nextProps[p]);

        if (propChanged) { return true; }

        // If any of these state change, re-render
        const _state = [
            'visibleDataIndex',
            'rowsToSkip',
            'numberOfElementsToRender'
        ];

        const stateChanged = _state.find(s => currentState[s] !== nextState[s]);

        if (stateChanged) { return true; }

        // scrollTop
        if (nextState.scrollTop === 0) {
            return true;
        }

        return false;
    },
    componentDidUpdate() {
        if (this.props.bufferPages > 0 && this.props.data && this.props.data.size === this.props.pageSize) {
            this.onLoadMore();
        }
    },
    onLoadMore() {
        if (!this.props.loading) {
            this.props.onLoadMore();
        }
    },
    onScroll() {
        const el = this.refs.wrapper.getDOMNode();
        const rect = el.getBoundingClientRect();
        const height = Math.ceil(rect.height);
        const scrollTop = el.scrollTop;
        const _position = scrollTop + height;

        this._position = _position;

        if (!this._isScrolling) {
            this._rafUpdate();
        }

        this._scrollTop = scrollTop;
        this._isScrolling = true;
    },
    _rafUpdate() {
        requestAnimationFrame(this._update);
    },
    _update() {
        if (this._lastUpdatePosition !== this._position) {
            this._rafUpdate();
        }
        else {
            this._isScrolling = false;
        }

        const position = this._position;
        this._lastUpdatePosition = position;

        const firstVisibleRow = Math.floor(position / this.props.rowHeight) - this.props.pageSize;
        const lastVisibleRow = Math.ceil(position / this.props.rowHeight);
        const nextIndex = this.state.visibleDataIndex + this.props.pageSize;
        const prevIndex = this.state.visibleDataIndex - this.props.pageSize;
        let nextVisibleDataIndex;

        if (lastVisibleRow >= nextIndex) {
            // Scrolling down
            nextVisibleDataIndex = nextIndex;
            this.onLoadMore();
        }
        else if (firstVisibleRow <= prevIndex) {
            // Scrolling up
            nextVisibleDataIndex = prevIndex;
        }

        if (nextVisibleDataIndex) {
            const nextState = this._getDataState(nextVisibleDataIndex);
            nextState.visibleDataIndex = nextVisibleDataIndex < 0 ? 0 : nextVisibleDataIndex;

            this.setState(nextState);
        }

        this.setState({
            scrollTop: this._scrollTop || 0
        });
    },
    _getDataState(visibleDataIndex) {
        const {pageSize, bufferPages} = this.props;

        const bufferSize = WindowingHelpers.getBufferSize(pageSize, bufferPages);
        const rowsToSkip = WindowingHelpers.getRowsToSkip(visibleDataIndex, bufferSize);
        const numberOfElementsToRender = WindowingHelpers.getNumberOfElementsToRender(rowsToSkip, bufferSize);

        return {
            rowsToSkip: rowsToSkip,
            numberOfElementsToRender: numberOfElementsToRender
        };
    },
    _getData() {
        if (!this.props.data) { return null; }

        return this.props.data;

        // return this.props.data
        //             .skip(this.state.rowsToSkip)
        //             .take(this.state.numberOfElementsToRender);
    },
    render() {
        const _data = this._getData();

        const styles = {
            wrapper: {
                height: this.props.height,
                width: this.props.width
            },
            topBuffer: {
                // height: this.state.rowsToSkip * this.props.rowHeight
            }
        };

        return (
            <div ref="table" className={"supertable-tableBody " + (this.state.scrollTop === 0 ? 'is-top' : '')}>
                <div ref="wrapper" className="supertable-tableBody--wrapper" style={styles.wrapper} onScroll={this.onScroll}>
                    <div style={styles.topBuffer}></div>
                    {_data ? this.renderDataRows(_data) : <Loader />}
                </div>
            </div>
        );
    },
    renderDataRows(data) {
        const {fields, cellRenderer, rowHeight, cellWidth} = this.props;

        return data.map((d, i) => {
            return (
                <DataRow key={i}
                        rowIndex={i}
                        rowData={d}
                        fields={fields}
                        cellWidth={cellWidth}
                        cellRenderer={cellRenderer}
                        rowHeight={rowHeight} />
            );
        }).toJS();
    }
});

module.exports = TableBody;
