var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Row = React.createClass({
    displayName: 'Row',
    mixins: [
        PureRenderMixin
    ],
    render() {
        var className = "supertable-row group " + (this.props.className || '');

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Row;
