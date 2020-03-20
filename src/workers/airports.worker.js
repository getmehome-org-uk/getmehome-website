const airports = require('../_content/airports.json')
  .filter(
    airport => !!airport.name && !!airport.code && !airport.name.match(/aerodrome/gi)
  )
  .map(
    (airport,i) => ({
      ...airport,
      value: i, //airport.code,
      label: `(${airport.code}) ${airport.city}: ${airport.name}`
    })
  )
;
  
onmessage = function(onEvent) {
  if ( onEvent.data.name ) {
    //console.warn('airports --------------- new search');
    const query = onEvent.data.name
    const regex = new RegExp(query,'gi');
    const results = airports.filter(({value, name, label}) => {
      const hit = label.match(regex);
      //!!hit && console.log('airports filter', {value, name, query, hit});
      return !!hit ? true : false;
    });
    //console.log('airports search result', {query, results});
    postMessage({name: query, airports: results})
  }
};
  
//console.log("airports search service worker")

