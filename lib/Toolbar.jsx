var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Toolbar = React.createClass({
    displayName: 'Toolbar',
    mixins: [
        PureRenderMixin
    ],
    render() {
        return (
            <div className="supertable-toolbar">
                THiS iS WheRe i WiLL aDD tHe toOlBar...
            </div>
        );
    }
});

module.exports = Toolbar;
