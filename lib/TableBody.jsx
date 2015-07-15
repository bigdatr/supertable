const React = require('react');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;

const DataRow = require('./DataRow');
const Loader = require('./Loader');

const TableBody = React.createClass({
    displayName: 'TableBody',
    propTypes: {
        data: React.PropTypes.object,
        fields: React.PropTypes.object.isRequired,
        cellRenderer: React.PropTypes.object,

        width: React.PropTypes.number,
        height: React.PropTypes.number,

        pageSize: React.PropTypes.number,
        bufferPages: React.PropTypes.number,
        
        rowHeight: React.PropTypes.number.isRequired
    },
    mixins: [
        PureRenderMixin
    ],
    getDefaultProps() {
        return {
            pageSize: 10,
            bufferPages: 1
        };
    },
    getInitialState() {
        return {
            visibleDataIndex: 0
        };
    },
    onScroll(e) {
        const el = this.refs.wrapper.getDOMNode();
        const rect = el.getBoundingClientRect();
        const height = Math.ceil(rect.height);
        const containerHeight = this.props.rowHeight * this.props.pageSize;

        const _position = el.scrollTop + height;

        this._updateVisibleDataIndex(_position);
    },
    _updateVisibleDataIndex(position) {
        const lastVisibleRow = Math.ceil(position / this.props.rowHeight);

        const nextVisibleDataIndex = this.state.visibleDataIndex + this.props.pageSize;

        if (lastVisibleRow >= nextVisibleDataIndex) {
            // Display the next page
            this.setState({visibleDataIndex: nextVisibleDataIndex});
        }
    },
    _getData() {
        if (!this.props.data) { return null; }

        const {pageSize, bufferPages} = this.props;
        const dataSize = this.props.data.size;

        // Number of rows to buffer
        const _bufferSize = (bufferPages + 1) * pageSize;

        // Index of first element which will be rendered
        const _bufferStartIndex = this.state.visibleDataIndex - _bufferSize;

        // Number of rows to ignore rendering
        console.log('_bufferStartIndex', _bufferStartIndex);
        console.log('_bufferSize', _bufferSize);
        const rowsToSkip = _bufferStartIndex >= 0 ? (_bufferStartIndex * _bufferSize) : 0;

        // Index of last element to render
        const _bufferEndIndex = (this.state.visibleDataIndex + pageSize) + _bufferSize;

        let numberOfElementsToRender = pageSize;

        // Check if elements exist to buffer before visible page
        if (_bufferStartIndex >= 0) {
            numberOfElementsToRender += pageSize;
        }

        // Check if elements exist to buffer after visible page
        if ((_bufferEndIndex + 1) <= dataSize) {
            numberOfElementsToRender += pageSize;
        }

        console.log('rowsToSkip', rowsToSkip);
        console.log('numberOfElementsToRender', numberOfElementsToRender);

        return this.props.data
                    .skip(rowsToSkip)
                    .take(numberOfElementsToRender);
    },
    render() {
        console.log('this.state.visibleDataIndex', this.state.visibleDataIndex);
        var _data = this._getData();

        const styles = {
            wrapper: {
                height: this.props.height,
                width: this.props.width
            }
        };

        return (
            <div ref="table" className="supertable-tableBody">
                <div ref="wrapper" className="supertable-tableBody--wrapper" style={styles.wrapper} onScroll={this.onScroll}>
                    {_data ? this.renderDataRows(_data) : <Loader />}
                </div>
            </div>
        );
    },
    renderDataRows(data) {
        const _this = this;
        const {fields, cellRenderer, rowHeight} = this.props;

        return data.map((d, i) => {
            return (
                <DataRow key={i}
                        rowIndex={i}
                        rowData={d}
                        fields={fields}
                        cellWidth={150}
                        cellRenderer={cellRenderer}
                        rowHeight={rowHeight} />
            );
        }).toJS();
    }
});

module.exports = TableBody;
