


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


import React, { useState, useRef, useEffect, useMemo } from 'react';
import Select, {createFilter} from 'react-select';

const filterConfig = {
      ignoreCase:true,
      ignoreAccents: true,
      trim: false,
      matchFrom: 'any',
    };

const getWorker = () => new Worker('worker.js')
export const AirportField = (props) => {
    const myWorker = useMemo(getWorker, [])
    const [results, setResults] = useState([])
    const [isLoading, setLoading] = useState(false)
    const search = useRef(null)
    useEffect(() => {
        myWorker.onmessage = function({data:{ airports, name }}) {
            if(search.current === name) {
                setLoading(false)
                setResults(airports)
            }
        };

        return () => {
            myWorker.terminate()
        }
    }, [])
    const handleInputChange = (inputValue) => {
        if(inputValue) {
        setLoading(true)
        search.current = inputValue
            myWorker.postMessage({name: inputValue})
        }
    }
    return(
        <div>
        <label>Airport<sup>*</sup></label>
        <Select
          isLoading={isLoading}
          options={results}
          isClearable={true}
          noOptionsMessage={({inputValue}) => {
              return !!inputValue ? "No Options" : "Type to search"
          }}
          filterOption={createFilter(filterConfig)}
          onInputChange={debounce(handleInputChange, 200)}
          onChange={(input) => {
              if ( input && input.value ) {
                  //console.log("SETTING ", input.value)
                  props.onChange(input.value)
              } else {
                  props.onChange("")
              }
          }}
        />
        </div>
    )
}





function debounce(func, timeout) {
    let timer;
    return (...args) => {
        const next = () => func(...args);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(next, timeout > 0 ? timeout : 300);
    };
}
