const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const Cell = require('../Cell.jsx');

describe('Cell', () => {
    it('renders with correct width applied', () => {
        const testProps = { width: 2999 };

        const el = TestUtils.renderIntoDocument(<Cell width={testProps.width} />);
        const domNode = el.getDOMNode();

        expect(el).toBeTruthy();
        expect(domNode.style.width).toEqual(testProps.width + 'px');
    });
});
