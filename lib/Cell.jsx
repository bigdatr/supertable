var React = require('react');

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
    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.width !== this.props.width) {
            return true;
        }

        var type = typeof nextProps.label;

        // Only compare strings or numbers, ignore objects
        if (type === 'string' || type === 'number') {
            if (nextProps.label !== this.props.label) {
                return true;
            }
        }

        return false;
    },
    render: function() {
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
