import React from 'react';

const Loader = React.createClass({
    displayName: 'Loader',
    render() {
        return (
            <div className="supertable-loader">
                {this.props.children}
            </div>
        );
    }
});

module.exports = Loader;
