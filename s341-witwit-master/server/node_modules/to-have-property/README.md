# toHaveProperty [![npm](https://img.shields.io/npm/v/to-have-property.svg)](https://www.npmjs.com/package/to-have-property) [![Build Status](https://travis-ci.org/hyzhak/to-have-property.svg?branch=master)](https://travis-ci.org/hyzhak/to-have-property)

toHaveProperty matcher for Jasmine (http://jasmine.github.io/) to check whether object has property or not.

## Installation

```
npm install to-have-property --save-dev
```

## How to use

```javascript

require('to-have-property');

it('should find property in object', function() {
    expect({ x: 10 }).toHaveProperty('x');
});

it('should find property in object and check is it equal to certain value', function() {
    expect({ y: 123}).toHaveProperty('y', 123);
});

it('should find properties in object and check are they equal to values', function() {
	expect({ x: 1, y: 2, z: 3}).toHaveProperties({'x': 1, 'y': 2});
});

it('should find all properties in object', function() {
    expect({ x: 1, y: 2, z: 3 }).toHaveProperties('x', 'y');
});


```
