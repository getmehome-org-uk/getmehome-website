


// import React, { useState } from 'react';
// import Select from 'react-select';
// import airports from './_content/airports.big.json';

// export const AirportField = (props) => {
//     const handleInputChange = (inputValue) => {
//         props.onChange(inputValue.value)
//     }
//     return(
//         <div>
//         <label>Airport<sup>*</sup></label>
//         <Select
//           name={props.name}
//           options={airports}
//           onChange={handleInputChange}
//         />
//         </div>
//     )
// }



// README



// OPTION A AND OPTION B

// IF YOU GO WITH OPTION A (  the simplest )
// REMOVE the workers folder from the repo
// REMOVE the whole entry object from the webpack.config.js


import React, { useState, useRef, useEffect } from 'react';
import Select, {createFilter} from 'react-select';

const filterConfig = {
      ignoreCase:true,
      ignoreAccents: true,
      trim: false,
      matchFrom: 'any',
};
let myWorker = new Worker('worker.js');

export const AirportField = (props) => {
    const [results, setResults] = useState([])
    const [isLoading, setLoading] = useState(false)
    const search = useRef(null)
    
    useEffect(() => {
        myWorker.onmessage = function({data:{ airports, query }}) {
            //console.warn('search result from service worker', {airports,query,search});
            //if(search && search.current === query) {
                console.warn('ACCEPT SEARCH RESULTS', {airports});
                setLoading(false)
                setResults(airports)
            //}
        };
        return () => {
            myWorker.terminate()
            myWorker = new Worker('worker.js');
        }
    }, [])
    const handleInputChange = (inputValue) => {
        if(inputValue) {
            setLoading(true)
            search.current = inputValue;
            myWorker.postMessage({inputValue})
        }
    }
    return(
        <div>
        <label>Airport<sup>*</sup></label>
        <Select
          isLoading={isLoading}
          options={results}
          filterOption={createFilter(filterConfig)}
          onInputChange={handleInputChange}
          onChange={({value}) => {
            props.onChange(value)
          }}
        />
        </div>
    )
}

