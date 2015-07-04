var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Toolbar = React.createClass({
    displayName: 'Toolbar',
    propTypes: {
        currentPage: React.PropTypes.number.isRequired,
        totalPages: React.PropTypes.number.isRequired,
        onPageRequested: React.PropTypes.func.isRequired
    },
    mixins: [
        PureRenderMixin
    ],
    onPageRequested(page) {
        if (page < 1) {
            page = 1;
        }
        else if (page > this.props.totalPages) {
            page = this.props.totalPages;
        }

        this.props.onPageRequested(page);
    },
    render() {
        return (
            <div className="supertable-toolbar">
                {this.renderPaginator()}
            </div>
        );
    },
    renderPaginator() {
        var pages = [];

        // // Previous
        pages.push(<li key="prev" onClick={this.onPageRequested.bind(this, (this.props.currentPage - 1))}>{'<<'}</li>);

        for (var i=0; i < this.props.totalPages; i++) {
            var page = i+1;
            var itemClassName = '';

            if (page === this.props.currentPage) {
                itemClassName = 'supertable-paginator--active';
            }

            var item = <li key={'p' + page} className={itemClassName} onClick={this.onPageRequested.bind(this, page)}>{i+1}</li>;
            pages.push(item);
        }

        // // Next
        pages.push(<li key="next" onClick={this.onPageRequested.bind(this, (this.props.currentPage + 1))}>{'>>'}</li>);


        return (
            <ul className="supertable-paginator">
                {pages}
            </ul>
        );
    }
});

module.exports = Toolbar;
