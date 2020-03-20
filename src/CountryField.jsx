import React from 'react';
import Select from 'react-select';
import countries from './_content/countries-formatted.json';

export const CountryField = (props) => {
    const onChange = (input) => {
        if(input && input.value) {
            props.onChange(input.value)
        } else {
            props.onChange("")
        }
    }
    return(
        <div>
        <label>Country<sup>*</sup></label>
        <Select
            isClearable={true}
          name={props.name}
          options={countries}
          onChange={onChange}
        />
        </div>
    )
}