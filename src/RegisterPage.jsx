import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

//import { Countries, Airports } from './_content';

import { userActions } from './_actions';

import { docIds, GoogleDocContent } from './_content';


import Form from 'react-jsonschema-form';
import { FormSchema, uiSchema } from './_helpers/registerForm';
import { AirportField } from './AirportField';
import { CountryField } from './CountryField';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    //function handleChange(e) {
    //    const { name, value } = e.target;
    //    setUser(user => ({ ...user, [name]: value }));
    //}

    function registerUser(user) {
        dispatch(userActions.register(user));
    }

    const formChanged = () => console.log.bind(console, "form:changed");
    const formErrors = () => console.log.bind(console, "form:errors");
    const formSubmitted = ({formData}) => {
        console.log("form:submit");
        
        formData.currently.country = formData.currently.country && JSON.parse(formData.currently.country) //Countries[formData.currently.country] || {};
        formData.currently.airport = formData.currently.airport && JSON.parse(formData.currently.airport) //Airports[formData.currently.airport] || {};
        formData.residence.country = formData.residence.country && JSON.parse(formData.residence.country) //Countries[formData.residence.country] || {};
        formData.residence.airport = formData.residence.airport && JSON.parse(formData.residence.airport) //Airports[formData.residence.airport] || {};

        console.log('DATA READY FOR SUBMISSION', formData);

         registerUser(formData);
    };
    
    

    return (
    

        <Container>
            <Row>
                <Col xs={12} md={6}>

                    <GoogleDocContent id={docIds.REGISTER}/>
                
                </Col>
                <Col xs={12} md={6}>

                    <Form schema={FormSchema}
                        onChange={formChanged}
                        onSubmit={formSubmitted}
                        onError={formErrors}
                        uiSchema={uiSchema}
                        fields={{
                            AirportField,
                            CountryField
                        }}
                    >
                        <div className="form-group">
                            <button className="btn btn-primary">
                                {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Register
                            </button>
                            <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                
                </Col>
            </Row>
        </Container>

    );
}

export { RegisterPage };