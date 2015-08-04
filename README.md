supertable  [![Build Status](https://travis-ci.org/bigdatr/supertable.svg)](https://travis-ci.org/bigdatr/supertable)
======

A ReactJS table component which is fully featured, configurable & highly performant (or at least that is the intention).

This project relies on both ReactJS & ImmutableJS (thank you @facebook)

## Install
`npm install supertable --save`

## Useage
```js
import React from 'react';
import Immutable from 'immutable';
import SuperTable from 'supertable';

const fields = [
    {name: 'fieldA', label: 'Field A'},
    {name: 'fieldB', label: 'Field B'},
    {name: 'fieldC', label: 'Field C'}
];

const someFakeData = Immutable.fromJS([
    {_id: 1, fieldA: 'valueA1', fieldB: 99, fieldC: 'valueC1'},
    {_id: 2, fieldA: 'valueA2', fieldB: 88, fieldC: 'valueC2'},
    {_id: 3, fieldA: 'valueA3', fieldB: 77, fieldC: 'valueC3'}
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

**data** _(required)_ `Immutable.List` of `Immutable.Map`

This should contain all of the data required for display. When data is fetched `async`, it should be added to this same list. Re-using the same list with existing objects will allow for `===` equality test to work which means you get a little performance benefit.

###### Example
```js
const someFakeData = Immutable.fromJS([
    {_id: 1, fieldA: 'valueA1', fieldB: 99, fieldC: 'valueC1'},
    {_id: 2, fieldA: 'valueA2', fieldB: 88, fieldC: 'valueC2'},
    {_id: 3, fieldA: 'valueA3', fieldB: 77, fieldC: 'valueC3'}
]);
```

**fields** _(required)_ `Array` of `Object`

Each object in this array represents a column which should be visible in the table.

* **name** <String>: Property name to reference in your data
* **label** <String|React.Element>: Contents of the column header
* **width** <Number>: The fixed width for this column in pixels
* **flexGrow** <Number>: The grow factor relative to other columns. Same as the flex-grow API from http://www.w3.org/TR/css3-flexbox/. Basically, take any available extra width and distribute it proportionally according to all columns' flexGrow values. Defaults to zero (no-flexing).

###### Example
```js
const fields = [
    {name: 'fieldA', label: 'Field A'},
    {name: 'fieldB', label: 'Field B'},
    {name: 'fieldC', label: 'Field C'}
];
```

**width** _(required)_ `Number`

Width of the table in pixels.

**height** _(required)_ `Number`

Height of the table in pixels

**rowHeight** _(required)_ `Number`

Exact height of a row in pixels

**cellRenderer** `Object`

An `Object`. This prop allows for custom rendering of any cell. Any properties on this object should be named exactly the same as their corresponding field name. The value must be a function which returns something which is renderable by React (String|React.Element).

Each function will be passed `rowData` which is and `Immutable.Map` containing data for the entire row.

**NOTE: Only need to provide handlers when custom formatting is needed, otherwise it will default to just display as text**

```js
const cellRenderer = {
    /*
     * Render fieldB as currency
     */
    fieldB: (rowData) => {
        const value = rowData.get('fieldB');
        return <span className="myCSSCurrencyClass">{'$' + value.toFixed(2)}</span>;
    },

    /*
     * Add conditional formatting to fieldC
     */
    fieldC: (rowData) => {
        const value = rowData.get('fieldC');
        const fieldBValue = rowData.get('fieldB');

        const cellStyle = {
            color: fieldBValue > 90 ? 'green' : 'red'
        };

        return <span style={cellStyle}>{value}</span>;
    }
};
```

**onLoadMore** `Function`

A function. This function will be executed when the table has been scrolled and more data is required for display to the user. Use this to trigger any AJAX requests and the extra data should be added to your existing `ImmutableList` and sent as a prop to the `SuperTable` component.

**loading** `Boolean` _(default: false)_

`true` when there is a `async` request in progress.
