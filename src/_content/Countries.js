export const Countries = window.Countries = require("./countries.json")
    .filter(
        country => !!country.name
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
        (country,i) => ({
            ...country,
            value: i,
            label: `(${country.code}) ${country.name}`
        })
    )
;
