import React from 'react';
import Select from 'react-select';
import { Countries } from './_content/Countries';

export const CountryField = (props) => {
    const onChange = (input) => {

        console.log('Country onChange',{input, props});
        if(input && input.value) {
            props.onChange(input.value)
        } else {
            props.onChange(null)
        }
    }
    return(
        <div>
        <label>Country<sup>*</sup></label>
        <Select
            isClearable={true}
            name={props.name}
            options={Countries}
            onChange={onChange}
        />
        </div>
    )
}