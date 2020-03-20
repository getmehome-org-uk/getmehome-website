const airports = require('../_content/airports.json')
  .filter(
    airport => !!airport.name
  )
  .map(
    airport => {
        airport.longname = `(${airport.code}) ${airport.name}`;
        return airport;
    }
  )
  .map(
    (airport,i) => ({
      ...airport,
      value: i,
      label: airport.longname,
    })
  )
;
  
onmessage = function(onEvent) {
  if ( onEvent.data.inputValue ) {
    //console.warn('airports --------------- new search');
    const query = onEvent.data.inputValue
    const regex = new RegExp(query,'gi');
    const results = airports.filter(({value, name}) => {
      const hit = name.match(regex);
      //!!hit && console.log('airports filter', {value, name, query, hit});
      return !!hit ? true : false;
    });
    console.log('airports search result', {query, results});
    postMessage({query, airports: results})
  }
};
  
console.log("airports search service worker")