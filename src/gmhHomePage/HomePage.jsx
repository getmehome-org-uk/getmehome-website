import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
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
            <Link to="/"><h1>Get me Home</h1></Link>
            <p>
            <Link to="/about" className="btn btn-link">About</Link>
            |
            <Link to="/register" className="btn btn-link">Register</Link>
            </p>
        </div>
    );
}

export { HomePage };