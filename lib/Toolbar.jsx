var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Toolbar = React.createClass({
    displayName: 'Toolbar',
    mixins: [
        PureRenderMixin
    ],
    onExportToCSV() {
        console.debug('supertable::Toolbar', 'Build export feature!');
        alert('Build export feature!');
    },
    render() {
        return (
            <div className="supertable-toolbar">
                <button onClick={this.onExportToCSV}>[Export to CSV]</button>
            </div>
        );
    }
});

module.exports = Toolbar;
