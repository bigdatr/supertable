var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Column = React.createClass({
    displayName: 'Column',
    propTypes: {
        width: React.PropTypes.number.isRequired,
        label: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired
    },
    mixins: [
        PureRenderMixin
    ],
    render() {
        var styles = {
            col: {
                width: this.props.width
            }
        };

        return (
            <div className="supertable-column" style={styles.col}>
                {this.props.label}
            </div>
        );
    }
});

module.exports = Column;
