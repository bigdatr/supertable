# supertable

A ReactJS table component which is fully featured, configurable & highly performant (or at least that is the intention).

This project relies on both ReactJS & ImmutableJS (thank you @facebook)

## Install
`npm install supertable --save`

## Useage
```js
var React = require('react');
var Immutable = require('immutable');

var {Table} = require('supertable');

var fields = [
    {name: 'fieldA', label: 'Field A'},
    {name: 'fieldB', label: 'Field B'},
    {name: 'fieldC', label: 'Field C'}
];

var someFakeData = Immutable.fromJS([
    {_id: 1, fieldA: 'valueA1', fieldB: 'valueB1', fieldC: 'valueC1'},
    {_id: 2, fieldA: 'valueA2', fieldB: 'valueB2', fieldC: 'valueC2'},
    {_id: 3, fieldA: 'valueA3', fieldB: 'valueB3', fieldC: 'valueC3'}
]);

var MyDataTable = React.createClass({
    _rowGetter(row) {
        return [
            row.get('fieldA'),
            row.get('fieldB'),
            row.get('fieldC')
        ];
    },
    render() {
        return (
            <Table  data={someFakeData}
                    rowGetter={this._rowGetter}
                    width={1000}
                    height={500}
                    fields={fields} />
        );
    }
});
```
