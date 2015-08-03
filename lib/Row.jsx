import React from 'react/addons';

const Row = React.createClass({
    displayName: 'Row',
    propTypes: {
        className: React.PropTypes.string,
        children: React.PropTypes.object,
        height: React.PropTypes.number,
        width: React.PropTypes.number
    },
    mixins: [
        React.addons.PureRenderMixin
    ],
    render() {
        const className = 'supertable-row group ' + (this.props.className || '');

        let styles = {
            row: {}
        };

        if (this.props.height) {
            styles.row = {
                height: this.props.height,
                overflow: 'hidden'
            };
        }

        if (this.props.width) {
            styles.row.width = this.props.width;
        }

        return (
            <div className={className} style={styles.row}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Row;
