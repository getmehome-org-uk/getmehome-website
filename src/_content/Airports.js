export const Airports = window.Airports = require("./airports.json")
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
            airport.longname = `(${airport.code}) ${airport.name}`;
            return airport;
        }
    )
;
