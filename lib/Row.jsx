const React = require('react');
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;

const Row = React.createClass({
    displayName: 'Row',
    propTypes: {
        className: React.PropTypes.string,
        children: React.PropTypes.object,
        rowHeight: React.PropTypes.number
    },
    mixins: [
        PureRenderMixin
    ],
    render() {
        const className = 'supertable-row group ' + (this.props.className || '');

        let styles = {};

        if (this.props.rowHeight) {
            styles.row = {
                height: this.props.rowHeight,
                overflow: 'hidden'
            };
        }

        return (
            <div className={className} style={styles.row}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Row;
