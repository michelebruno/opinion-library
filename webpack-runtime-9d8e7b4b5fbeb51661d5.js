!function(){"use strict";var e,t,n,r,o,i,u,a={},c={};function f(e){var t=c[e];if(void 0!==t)return t.exports;var n=c[e]={exports:{}};return a[e].call(n.exports,n,n.exports,f),n.exports}f.m=a,e=[],f.O=function(t,n,r,o){if(!n){var i=1/0;for(s=0;s<e.length;s++){n=e[s][0],r=e[s][1],o=e[s][2];for(var u=!0,a=0;a<n.length;a++)(!1&o||i>=o)&&Object.keys(f.O).every((function(e){return f.O[e](n[a])}))?n.splice(a--,1):(u=!1,o<i&&(i=o));if(u){e.splice(s--,1);var c=r();void 0!==c&&(t=c)}}return t}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[n,r,o]},f.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(t,{a:t}),t},n=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},f.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var o=Object.create(null);f.r(o);var i={};t=t||[null,n({}),n([]),n(n)];for(var u=2&r&&e;"object"==typeof u&&!~t.indexOf(u);u=n(u))Object.getOwnPropertyNames(u).forEach((function(t){i[t]=function(){return e[t]}}));return i.default=function(){return e},f.d(o,i),o},f.d=function(e,t){for(var n in t)f.o(t,n)&&!f.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},f.f={},f.e=function(e){return Promise.all(Object.keys(f.f).reduce((function(t,n){return f.f[n](e,t),t}),[]))},f.u=function(e){return({232:"component---src-pages-matterjs-js",255:"component---src-pages-library-js",351:"commons",532:"styles",611:"4544e8b5",630:"d4ad233efeb1d959420253442063e6db7488fdeb",678:"component---src-pages-index-js",682:"component---src-pages-about-js",883:"component---src-pages-404-js"}[e]||e)+"-"+{175:"d05b452868e669ac1812",231:"91b14f16f599c9617c30",232:"c959e4fe8fd3bc23d784",255:"556749988c6702061ed3",351:"702f691359bb13942904",503:"539e924525ab13eaa9b2",532:"a687d6d873d47811c7b7",611:"d29c614e2aa38f9b7acc",630:"75decfd5ade8df8bab58",678:"f6f3066acf57189a1575",682:"f18fd029b157d6451895",883:"c869fda90f7c611f51e6"}[e]+".js"},f.miniCssF=function(e){return"styles.e88674e056109661bce8.css"},f.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),f.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r={},o="phase-03:",f.l=function(e,t,n,i){if(r[e])r[e].push(t);else{var u,a;if(void 0!==n)for(var c=document.getElementsByTagName("script"),s=0;s<c.length;s++){var d=c[s];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==o+n){u=d;break}}u||(a=!0,(u=document.createElement("script")).charset="utf-8",u.timeout=120,f.nc&&u.setAttribute("nonce",f.nc),u.setAttribute("data-webpack",o+n),u.src=e),r[e]=[t];var l=function(t,n){u.onerror=u.onload=null,clearTimeout(p);var o=r[e];if(delete r[e],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(l.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=l.bind(null,u.onerror),u.onload=l.bind(null,u.onload),a&&document.head.appendChild(u)}},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.p="/",i=function(e){return new Promise((function(t,n){var r=f.miniCssF(e),o=f.p+r;if(function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=(u=n[r]).getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(o===e||o===t))return u}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){var u;if((o=(u=i[r]).getAttribute("data-href"))===e||o===t)return u}}(r,o))return t();!function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var u=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=u,c.request=a,o.parentNode.removeChild(o),r(c)}},o.href=t,document.head.appendChild(o)}(e,o,t,n)}))},u={658:0},f.f.miniCss=function(e,t){u[e]?t.push(u[e]):0!==u[e]&&{532:1}[e]&&t.push(u[e]=i(e).then((function(){u[e]=0}),(function(t){throw delete u[e],t})))},function(){var e={658:0};f.f.j=function(t,n){var r=f.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else if(/^(532|658)$/.test(t))e[t]=0;else{var o=new Promise((function(n,o){r=e[t]=[n,o]}));n.push(r[2]=o);var i=f.p+f.u(t),u=new Error;f.l(i,(function(n){if(f.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;u.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",u.name="ChunkLoadError",u.type=o,u.request=i,r[1](u)}}),"chunk-"+t,t)}},f.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,i=n[0],u=n[1],a=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(r in u)f.o(u,r)&&(f.m[r]=u[r]);if(a)var s=a(f)}for(t&&t(n);c<i.length;c++)o=i[c],f.o(e,o)&&e[o]&&e[o][0](),e[i[c]]=0;return f.O(s)},n=self.webpackChunkphase_03=self.webpackChunkphase_03||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}()}();
//# sourceMappingURL=webpack-runtime-9d8e7b4b5fbeb51661d5.js.map