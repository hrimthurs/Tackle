!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.TkString=t():e.TkString=t()}(self,()=>{return n={971:e=>{function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(){function e(){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function")}var t,r,n;return t=e,n=[{key:"formatNumber",value:function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,n=Math.abs(e),o=e<0?"-":"",n=r?n.toFixed(r):n.toString(),f=t-n.length-o.length;return o+(f<=0?n:Number.isInteger(e)&&!r?"0".repeat(f)+n:n+"0".repeat(f))}},{key:"getHash",value:function(e){for(var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r={f1:3735928559,f2:2654435761,f3:2246822507},n={f1:1103547991,f2:1597334677,f3:3266489909},o=r.f1^t,f=n.f1^t,a=0;a<e.length;a++)var i=e.charCodeAt(a),o=Math.imul(o^i,r.f2),f=Math.imul(f^i,n.f2);return o=Math.imul(o^o>>>16,r.f3)^Math.imul(f^f>>>13,n.f3),((f=Math.imul(f^f>>>16,r.f3)^Math.imul(o^o>>>13,n.f3))>>>0).toString(16)+(o>>>0).toString(16)}}],(r=null)&&o(t.prototype,r),n&&o(t,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()}},o={},function e(t){var r=o[t];return void 0===r&&(r=o[t]={exports:{}},n[t](r,r.exports,e)),r.exports}(971);var n,o});