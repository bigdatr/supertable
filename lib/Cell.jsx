const React = require('react');

const Cell = React.createClass({
    displayName: 'Cell',
    propTypes: {
        className: React.PropTypes.string,
        width: React.PropTypes.number.isRequired,
        label: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },
    shouldComponentUpdate: function(nextProps) {
        if (nextProps.width !== this.props.width) {
            return true;
        }

        const type = typeof nextProps.label;

        // Only compare strings or numbers, ignore objects
        if (type === 'string' || type === 'number') {
            if (nextProps.label !== this.props.label) {
                return true;
            }
        }

        return false;
    },
    getClassName() {
        let className = 'supertable-cell';

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    },
    render() {
        const styles = {
            col: {
                width: this.props.width
            }
        };

        return (
            <div className={this.getClassName()} style={styles.col}>
                {this.props.label}
            </div>
        );
    }
});

module.exports = Cell;
