!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Tackle=t():e.Tackle=t()}(self,()=>{return n={983:e=>{function o(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){var r;if(e)return"string"==typeof e?n(e,t):"Map"===(r="Object"===(r=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(){function e(){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function")}var t,r,n;return t=e,n=[{key:"getArray",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],r=Array.isArray(e)?o(e):null!=e?[e]:[];return t?this.getUniqValues(r):r}},{key:"getUniqValues",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],r=o(new Set(e));return t&&(e=r),r}},{key:"excludeValues",value:function(e,t){var r=2<arguments.length&&void 0!==arguments[2]&&arguments[2],n=this.getArray(t),o=e.filter(function(e){return!n.includes(e)});return r&&(e=o),o}},{key:"sortArrayStr",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],r=e.sort(function(e,t){return e.localeCompare(t)});return t&&(e=r),r}},{key:"isSubArray",value:function(e,t){return(2<arguments.length&&void 0!==arguments[2]&&arguments[2]?e.length==t.length:e.length<=t.length)&&e.every(function(e){return t.includes(e)})}}],(r=null)&&i(t.prototype,r),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},164:e=>{function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(){function e(){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function")}var t,r,n;return t=e,n=[{key:"decoMemoize",value:function(r){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:globalThis,o=new Map;return function(){var e,t=[].join.call(arguments);return o.has(t)?e=o.get(t):(e=r.apply(n,arguments),o.set(t,e)),e}}}],(r=null)&&o(t.prototype,r),n&&o(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},959:(e,t,r)=>{function i(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function u(n){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?i(Object(o),!0).forEach(function(e){var t,r;t=n,r=o[e=e],e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(o,e))})}return n}function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=r(971).getHash,c=r(983).getArray;e.exports=function(){function e(){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function")}var t,r,n;return t=e,n=[{key:"isObjectJs",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return"object"===o(e)&&null!==e&&!Array.isArray(e)&&(!t||t in e)}},{key:"excludeKeys",value:function(e,t){var r=this,n=2<arguments.length&&void 0!==arguments[2]&&arguments[2]?e:this.clone(e);return c(t).forEach(function(e){return r.setValue(n,e,null,function(e,t){return delete e[t]})}),n}},{key:"getValue",value:function(t){for(var r=this,e=arguments.length,n=new Array(1<e?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];var i=n.map(function(e){return e.split(".")}),u=i.map(function(e){return e.reduce(function(e,t){return r.isObjectJs(e,t)?e[t]:void 0},t)});return 1==i.length?u[0]:u}},{key:"setValue",value:function(e,t,r){var n,o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,i=!1,u=t.split(".");return 1<u.length?(n=u.pop(),u=this.getValue(e,u.join(".")),this.isObjectJs(u,n)&&(u[n]=r,i="function"!=typeof o||o(u,n))):t in e&&(e[t]=r,i="function"!=typeof o||o(e,t)),i}},{key:"merge",value:function(){for(var o=this,e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.reduce(function(r,n){return r=o.isObjectJs(n)&&o.isObjectJs(r)&&0<Object.keys(r).length?Object.keys(n).reduce(function(e,t){return null!=n[t]&&(e[t]=o.merge(r[t],n[t])),e},u({},r)):null==n?r:n},{})}},{key:"clone",value:function(e){return JSON.parse(JSON.stringify(e))}},{key:"getHash",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;return l(JSON.stringify(this.excludeKeys(e,t)),r)}}],(r=null)&&a(t.prototype,r),n&&a(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},367:e=>{function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(){function e(){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function")}var t,r,n;return t=e,n=[{key:"bytesToKb",value:function(e){return Number((e*(1/1024)).toFixed(1<arguments.length&&void 0!==arguments[1]?arguments[1]:2))}},{key:"bytesToMb",value:function(e){return Number((e*(1/1048576)).toFixed(1<arguments.length&&void 0!==arguments[1]?arguments[1]:2))}}],(r=null)&&o(t.prototype,r),n&&o(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},971:e=>{function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function t(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function i(n){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?t(Object(o),!0).forEach(function(e){var t,r;t=n,r=o[e=e],e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(o,e))})}return n}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(){function e(){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function")}var t,r,n;return t=e,n=[{key:"formatNumber",value:function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,n=Math.abs(e),o=e<0?"-":"",n=r?n.toFixed(r):n.toString(),i=t-n.length-o.length;return o+(i<=0?n:Number.isInteger(e)&&!r?"0".repeat(i)+n:n+"0".repeat(i))}},{key:"stringify",value:function(e){function r(e){return t.floatPrecision&&"number"==typeof e?Number(e.toFixed(t.floatPrecision)):e}var t=i({json:!0,floatPrecision:0},1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}),n="object"===o(e)?JSON.stringify(e,function(e,t){return r(t)}):r(e).toString();return n=t.json?n:n.replace(/(\{|,)"(\w+)"\:/g,"$1 $2: ").replace(/(\}+)/g," $1").replace(/,\{/g,", {").replace(/\{\s+\}/g,"{}")}},{key:"getHash",value:function(e){for(var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r={f1:3735928559,f2:2654435761,f3:2246822507},n={f1:1103547991,f2:1597334677,f3:3266489909},o=r.f1^t,i=n.f1^t,u=0;u<e.length;u++)var a=e.charCodeAt(u),o=Math.imul(o^a,r.f2),i=Math.imul(i^a,n.f2);return o=Math.imul(o^o>>>16,r.f3)^Math.imul(i^i>>>13,n.f3),((i=Math.imul(i^i>>>16,r.f3)^Math.imul(o^o>>>13,n.f3))>>>0).toString(16)+(o>>>0).toString(16)}}],(r=null)&&u(t.prototype,r),n&&u(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},352:(e,t,r)=>{e.exports={TkArray:r(983),TkString:r(971),TkObject:r(959),TkFunction:r(164),TkService:r(367)}}},o={},function e(t){var r=o[t];return void 0===r&&(r=o[t]={exports:{}},n[t](r,r.exports,e)),r.exports}(352);var n,o});