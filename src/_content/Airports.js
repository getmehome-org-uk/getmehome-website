export const Airports = window.Airports = require("./airports.json")
    .filter(
        airport => !!airport.name && !!airport.code && !airport.name.match(/aerodrome/gi)
    )
    /*
    .sort(
        (a,b)=> {
            if ( a.name < b.name ){
                return -1;
            }
            if ( a.name > b.name ){
                return 1;
            }
            return 0;
        }
    )
    */
    .map(
        airport => {
            airport.label = `(${airport.code}) ${airport.city}: ${airport.name}`;
            return airport;
        }
    )
;
