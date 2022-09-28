# Tackle

[![info badge](https://img.shields.io/npm/dt/@hrimthurs/tackle.svg)](http://npm-stat.com/charts.html?package=@hrimthurs/tackle)
[![npm](https://img.shields.io/npm/v/@hrimthurs/tackle.svg)](https://npmjs.com/@hrimthurs/tackle)

Various auxiliary tools for working in JavaScript projects

## Installation

You can use this package on the server side as well as the client side.

### [Node.js](http://nodejs.org/):

~~~
npm install @hrimthurs/tackle
~~~

## Connection

### ESM

~~~ javascript
import Tackle from '@hrimthurs/tackle'
import { TkArray } from '@hrimthurs/tackle'
~~~

### CommonJS

~~~ javascript
const Tackle = require('@hrimthurs/tackle')
const { TkArray } = require('@hrimthurs/tackle')
~~~

## API

### TkArray

~~~ typescript
TkArray.get(src: any, uniqValues?: boolean = true): any[]   // - returns array regardless of type src
~~~

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at
[github](https://github.com/hrimthurs/Tackle).
