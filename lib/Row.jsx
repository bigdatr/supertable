const React = require('react');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;

const Row = React.createClass({
    displayName: 'Row',
    propTypes: {
        rowHeight: React.PropTypes.number.isRequired,
        className: React.PropTypes.string,
        children: React.PropTypes.object
    },
    mixins: [
        PureRenderMixin
    ],
    render() {
        const className = 'supertable-row group ' + (this.props.className || '');

        const style = {
            minHeight: this.props.rowHeight
        };

        return (
            <div className={className} style={style}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Row;
