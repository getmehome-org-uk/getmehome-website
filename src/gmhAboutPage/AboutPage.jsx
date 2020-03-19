import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DOCS } from '../_helpers/content';

import { userActions } from '../_actions';

function AboutPage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user) || {};
    const dispatch = useDispatch();

    //useEffect(() => {
    //    dispatch(userActions.getAll());
    //}, []);
    //
    //function handleDeleteUser(id) {
    //    dispatch(userActions.delete(id));
    //}

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>About this website</h1>

            <Content id={DOCS.DOCS_ABOUT}/>

            <p>
                <Link to="/" className="btn btn-link">Home</Link>
                |
                <Link to="/register" className="btn btn-link">Register</Link>
            </p>
        </div>
    );
}

export { AboutPage };