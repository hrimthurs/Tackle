// ESM
import Tackle from '../src/index.js'
import { TkArray, TkObject, TkString, TkFunction, TkService } from '../src/index.js'

// CommonJS (only outside NodeJS "module")
// const Tackle = require('@hrimthurs/tackle')
// const { TkArray, TkObject, TkString, TkFunction, TkService } = require('@hrimthurs/tackle')


const arrNum1 = [4, 1, 3]
const arrNum2 = [1, 2, 3, 4, 2, 5, 2]
const arrStr1 = ['str1', 'strN', 'str3', 'strN']
const arrStr2 = ['Zxb', 'Baz', 'Zxa', 'Abc', 'Zxb', 'Zac', 'Bca', 'Zaa', 'Aaa']
const arrMix1 = [1, true, 'str', -555.123124, 3.1, 555]
const objMix1 = { a: 1, b: [true, 2, 3.26456], c: 'str', d: { sub: -0.321, e: null, f: {}}}
const strUrl1 = 'https://example.com/search/entity?key=true,{d:"asd", q:123}&text=car%2BOR%2Bhome&order_by=publication_time,2,3,false&noobj=field1:true,field2false&js=asd:{"key1":12,"arr":[1,true,{"sub":"strSub"}]}&from=suggest_post:-12&arr=a:3,v:,s:!!!&alert&fromSearchLine=true&area=2'
const func1 = function (a, b) { return a + b }
const func2 = (a, b = 100) => a + b


console.log('ARRAY:')
console.log(' 1.', Tackle.TkArray.getArray(), Tackle.TkArray.getArray(null), Tackle.TkArray.getArray([]), Tackle.TkArray.getArray(12))
console.log(' 2.', Tackle.TkArray.getArray(arrStr1), Tackle.TkArray.getArray(arrStr1, true))
console.log(' 3.', TkArray.getArray(arrMix1))
console.log(' 4.', TkArray.getArray(arrMix1, true))
console.log(' 5.', Tackle.TkArray.getUniqValues(arrNum2))
console.log(' 6.', Tackle.TkArray.excludeValues(arrNum2, 2), TkArray.excludeValues(arrNum2, [2, 3]))
console.log(' 7.', Tackle.TkArray.sortArrayStr(arrStr1), TkArray.sortArrayStr(arrStr2))
console.log(' 8.', Tackle.TkArray.isSubArray(arrNum1, arrNum2), TkArray.isSubArray(arrNum1, arrNum2, true), Tackle.TkArray.isSubArray(arrNum2, arrNum2, true), TkArray.isSubArray(arrNum2, arrNum1))


console.log('\nOBJECT:')
let copyObj = Tackle.TkObject.clone(objMix1)
console.log(' 1.', Tackle.TkObject.isObjectJs(copyObj), TkObject.isObjectJs(copyObj, 'qqq'), copyObj)
console.log(' 2.', Tackle.TkObject.excludeKeys(objMix1, 'b'))
console.log(' 3.', TkObject.excludeKeys(copyObj, ['a', 'c', 'f', 'd.sub', 'b.qqq', 'd.e.qqq.qqq'], true), copyObj)
console.log(' 4.', Tackle.TkObject.setValue(objMix1, 'q', true, (root, key) => console.log(`success set field "${key}"`)))
console.log(' 5.', Tackle.TkObject.setValue(objMix1, 'b', [false, -7, 0.123], (root, key) => console.log(`success set field "${key}"`)))
console.log(' 6.', TkObject.setValue(objMix1, 'd.sub.asd', true))
console.log(' 7.', TkObject.setValue(objMix1, 'd.sub', -123.987, () => 'OK'))
console.log(' 8.', Tackle.TkObject.getValue(objMix1, 'd.e', 'b', 'c.sd.qqq', 'qqq'))
console.log(' 9.', TkObject.getValue(objMix1, 'd.sub'))
console.log('10.', Tackle.TkObject.merge(objMix1, { e: 12, b: 555, d: { f: { q: 'str' }}}, { a: '!!!', b: true, d: { f: { f1: 1, f2: [1, 2, 3]}}}))
console.log('11.', TkObject.merge(objMix1, { d: { e: '!!!', f: { q: '!!!', new: 12 }}}))
console.log('12.', Tackle.TkObject.getHash(objMix1), Tackle.TkObject.getHash(objMix1, 'b'))
console.log('13.', TkObject.getHash(objMix1, ['a', 'c']), TkObject.getHash(objMix1, ['a', 'c'], 12))


console.log('\nSTRING:')
console.log(' 1.', Tackle.TkString.formatNumber(19, 5), Tackle.TkString.formatNumber(-19, 5), Tackle.TkString.formatNumber(19, 5, 1), Tackle.TkString.formatNumber(-19, 5, 1))
console.log(' 2.', TkString.formatNumber(1.42, 5), TkString.formatNumber(-1.42, 5), TkString.formatNumber(1.42, 5, 1), TkString.formatNumber(-1.42, 5, 1))
console.log(' 3.', Tackle.TkString.formatNumber(10009, 5), Tackle.TkString.formatNumber(-1009, 5), Tackle.TkString.formatNumber(109, 5, 1), Tackle.TkString.formatNumber(-109, 5, 1))
console.log(' 4.', TkString.formatNumber(1.402, 5), TkString.formatNumber(-1.4, 5), TkString.formatNumber(1.42, 5, 2), TkString.formatNumber(-1.402, 5))
console.log(' 5.', Tackle.TkString.formatNumber(100009, 5), Tackle.TkString.formatNumber(-10009, 5), Tackle.TkString.formatNumber(1009, 5, 1), Tackle.TkString.formatNumber(-1009, 5, 1))
console.log(' 6.', TkString.formatNumber(1.4002, 5), TkString.formatNumber(-1.004, 5), TkString.formatNumber(1.42, 5, 4), TkString.formatNumber(-1.4002, 5))
console.log(' 7.', Tackle.TkString.getHash('Hashed string'), TkString.getHash('Hashed string', 234))


console.log('\nFUNCTION:')
const func1Memoize = Tackle.TkFunction.decoMemoize(func1)
console.log(' 1.', func1Memoize(1, 2), func1Memoize(5, 7), func1Memoize(1, 2))
// @ts-ignore
const func2Memoize = TkFunction.decoMemoize(func2, this)
console.log(' 2.', func2Memoize(4, 6), func2Memoize(4), func2Memoize(4, 6))


console.log('\nSERVICE:')
console.log(' 1.', Tackle.TkService.bytesToKb(1_024), TkService.bytesToKb(1_000, 5), TkService.bytesToKb(1_000))
console.log(' 2.', Tackle.TkService.bytesToMb(1_048_576), TkService.bytesToMb(1_000_100, 5), TkService.bytesToMb(1_000_100))
console.log(' 3.', Tackle.TkService.trimFloat(5, 2), Tackle.TkService.trimFloat(true, 5), Tackle.TkService.trimFloat(arrMix1, 3, true))
console.log(' 4.', TkService.trimFloat(objMix1, 2))
let tmp1 = Tackle.TkService.getParamsURL(strUrl1)
console.log(' 5.', tmp1)
let tmp2 = Tackle.TkService.setParamsURL('https://example.com', tmp1)
console.log(' 6.', JSON.stringify(tmp1) === JSON.stringify(TkService.getParamsURL(tmp2)), tmp2.href)