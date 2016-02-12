const React = require('react');
const TestUtils = React.addons.TestUtils;

const Cell = require('../Cell.jsx');

describe('Cell', () => {
    it('renders', () => {
        const testProps = {
            className: 'customClassName',
            width: 2999,
            label: 'This is my label'
        };

        const el = TestUtils.renderIntoDocument(<Cell {...testProps} />);
        const domNode = el.getDOMNode();

        expect(el).toBeTruthy();
        expect(domNode.style.width).toEqual(testProps.width + 'px');
        expect(domNode.innerHTML).toEqual(testProps.label);
        expect(domNode.className).toContain(testProps.className);

        console.log('blah...');
    });
});
