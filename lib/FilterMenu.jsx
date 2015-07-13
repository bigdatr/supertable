const React = require('react');

class FilterMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.shouldComponentUpdate = React.addons.PureRenderMixin.shouldComponentUpdate.bind(this);

        // Autobinding
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onTextSearch = this.onTextSearch.bind(this);
    }

    onToggleMenu() {
        this.setState({visible: !this.state.visible});
    }

    onTextSearch() {
        const value = this.refs.textFilter.getDOMNode().value;

        this.props.onChange({
            operator: 'contains',
            value: value
        });
    }

    render() {
        return (
            <div className="FilterMenu">
                <div className="FilterMenu_icon" onClick={this.onToggleMenu}>{this.state.visible ? 'X' : 'V'}</div>
                {this.renderMenu()}
            </div>
        );
    }

    renderMenu() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <div className="FilterMenu_menu">
                {this.renderTextSearch()}
            </div>
        );
    }

    renderTextSearch() {
        return (
            <input ref="textFilter" type="text" name="supertable-filter-text" placeholder="Search..." onChange={this.onTextSearch} />
        );
    }
}

FilterMenu.propTypes = {
    onChange: React.PropTypes.func.isRequired
};

module.exports = FilterMenu;
