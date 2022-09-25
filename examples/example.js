﻿import Tackle from '../src/index.js'

console.log('ARRAYS:')
console.log('1.', Tackle.TkArray.get())
console.log('2.', Tackle.TkArray.get(null))
console.log('3.', Tackle.TkArray.get('str'))
console.log('4.', Tackle.TkArray.get(['str1', 'strN', 'str3', 'strN']))
console.log('5.', Tackle.TkArray.get(['str1', 'strN', 'str3', 'strN'], true))
console.log('6.', Tackle.TkArray.get([1, true, 'str', 555, 3, 555]))
console.log('7.', Tackle.TkArray.get([1, true, 'str', 555, 3, 555], true))