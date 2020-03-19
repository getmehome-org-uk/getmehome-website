import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from './_actions';

import { docIds, GoogleDocContent } from './_content';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user) || {};
    const dispatch = useDispatch();


    console.log('HomePage',{DOCS})

    return (
        <GoogleDocContent id={docIds.HOMEPAGE}/>
    );
}

export { HomePage };