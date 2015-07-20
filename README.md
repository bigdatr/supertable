supertable  [![Build Status](https://travis-ci.org/bigdatr/supertable.svg)](https://travis-ci.org/bigdatr/supertable)
======

A ReactJS table component which is fully featured, configurable & highly performant (or at least that is the intention).

This project relies on both ReactJS & ImmutableJS (thank you @facebook)

## Install
`npm install supertable --save`

## Useage
```js
const React = require('react');
const Immutable = require('immutable');
const SuperTable = require('supertable');

const fields = [
    {name: 'fieldA', label: 'Field A'},
    {name: 'fieldB', label: 'Field B'},
    {name: 'fieldC', label: 'Field C'}
];

const someFakeData = Immutable.fromJS([
    {_id: 1, fieldA: 'valueA1', fieldB: 'valueB1', fieldC: 'valueC1'},
    {_id: 2, fieldA: 'valueA2', fieldB: 'valueB2', fieldC: 'valueC2'},
    {_id: 3, fieldA: 'valueA3', fieldB: 'valueB3', fieldC: 'valueC3'}
]);

const MyDataTable = React.createClass({
    render() {
        return (
            <SuperTable  data={someFakeData}
                         fields={fields}
                         width={1000}
                         height={500} />
        );
    }
});
```

### Config

#### data <Immutable.List> _(required)_
An `Immutable.List` of `Immutable.Map`. This should contain all of the data required for display. When data is fetched `async`, it should be added to this same list. Re-using the same list with existing objects will allow for `===` equality test to work which means you get a little performance benefit.

###### Example
```js
const someFakeData = Immutable.fromJS([
    {_id: 1, fieldA: 'valueA1', fieldB: 'valueB1', fieldC: 'valueC1'},
    {_id: 2, fieldA: 'valueA2', fieldB: 'valueB2', fieldC: 'valueC2'},
    {_id: 3, fieldA: 'valueA3', fieldB: 'valueB3', fieldC: 'valueC3'}
]);
```

#### fields <Array> _(required)_
An `Array` of `Object`. Each object in this array represents a column which should be visible in the table.

* **name** <String>: Property name to reference in your data
* **label** <String|React.Element>: Contents of the column header

###### Example
```js
const fields = [
    {name: 'fieldA', label: 'Field A'},
    {name: 'fieldB', label: 'Field B'},
    {name: 'fieldC', label: 'Field C'}
];
```

#### width <Number> _(required)_
Width of the table in pixels.

#### height <Number> _(required)_
Height of the table in pixels

