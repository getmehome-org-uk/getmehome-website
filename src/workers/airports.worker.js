// const airports = require('../_content/airports.json')
//   .filter(
//     airport => !!airport.name && !!airport.code && !airport.name.match(/aerodrome/gi)
//   )
//   .map(
//     (airport,i) => ({
//       ...airport,
//       value: i, //airport.code,
//       label: `(${airport.code}) ${airport.city}: ${airport.name}`
//     })
//   )
// ;
  
// onmessage = function(onEvent) {
//   if ( onEvent.data.name ) {
//     //console.warn('airports --------------- new search');
//     const query = onEvent.data.name
//     const regex = new RegExp(query,'gi');
//     const results = airports.filter(({value, name, label}) => {
//       const hit = label.match(regex);
//       //!!hit && console.log('airports filter', {value, name, query, hit});
//       return !!hit ? true : false;
//     });
//     //console.log('airports search result', {query, results});
//     postMessage({name: query, airports: results})
//   }
// };
  
// //console.log("airports search service worker")

"use strict";

//require('es6-object-assign').polyfill();
  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }
  

var airports = require('../_content/airports.json').filter(function (airport) {
  return !!airport.name && !!airport.code && !airport.name.match(/aerodrome/gi);
}).map(function (airport, i) {
  return Object.assign({}, airport || {}, {
    value: JSON.stringify(airport),
    //airport.code,
    label: "(".concat(airport.code, ") ").concat(airport.city, ": ").concat(airport.name)
  });
});

onmessage = function onmessage(onEvent) {
  if (onEvent.data.name) {
    //console.warn('airports --------------- new search');
    var query = onEvent.data.name;
    var regex = new RegExp(query, 'gi');
    var results = airports.filter(function (_ref) {
      var value = _ref.value,
          name = _ref.name,
          label = _ref.label;
      var hit = label.match(regex); //!!hit && console.log('airports filter', {value, name, query, hit});

      return !!hit ? true : false;
    }); //console.log('airports search result', {query, results});

    postMessage({
      name: query,
      airports: results
    });
  }
};

// TRANSPILED WITH https://babeljs.io/repl