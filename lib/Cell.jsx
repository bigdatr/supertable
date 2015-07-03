var React = require('react');
// var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Cell = React.createClass({
    displayName: 'Cell',
    propTypes: {
        width: React.PropTypes.number.isRequired,
        label: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },
    // mixins: [
    //     PureRenderMixin
    // ],
    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.width !== this.props.width) {
            return true;
        }

        return false;  
    },
    render() {
        var styles = {
            col: {
                width: this.props.width
            }
        };

        var className = 'supertable-cell';

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return (
            <div className={className} style={styles.col}>
                {this.props.label}
            </div>
        );
    }
});

module.exports = Cell;
