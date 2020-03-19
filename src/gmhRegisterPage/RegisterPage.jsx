import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

import { docIds } from '../_helpers/content';
import { Content } from '../gmhContent';


import Form from 'react-jsonschema-form';
import { FormSchema, Countrys, Airports } from './FormSchema';

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

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function registerUser(user) {
        dispatch(userActions.register(user));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            //dispatch(userActions.register(user));
            registerUser(user);
        }
    }

    const formChanged = () => console.log.bind(console, "form:changed");
    const formErrors = () => console.log.bind(console, "form:errors");
    const formSubmitted = ({formData}) => {
        console.log.bind(console, "form:submit");
        
        formData.currently.country = formData.currently.country && Countrys[formData.currently.country] || {};
        formData.currently.airport = formData.currently.airport && Airports[formData.currently.airport] || {};
        formData.residence.country = formData.residence.country && Countrys[formData.residence.country] || {};
        formData.residence.airport = formData.residence.airport && Airports[formData.residence.airport] || {};

        console.log.bind('DATA READY FOR SUBMISSION', formData);

        registerUser(formData);
    };
    
    

    return (
        <div className="col-lg-8 offset-lg-2">
            {/* <h2>Register</h2> */}

            <Content id={docIds.HOMEPAGE}/>

            <Form schema={FormSchema}
                onChange={formChanged}
                onSubmit={formSubmitted}
                onError={formErrors}
            >
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </Form>
{/*
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
*/}

        </div>
    );
}

export { RegisterPage };