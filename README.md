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
