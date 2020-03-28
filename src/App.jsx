import React, { useEffect } from 'react';
import { 
    Route, 
    Switch, 
    Redirect,
    useHistory
} from 'react-router-dom';

import { Container, Nav, Navbar } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux';

import { alertActions } from './_actions';

import { AboutPage } from './AboutPage';
import { ConfirmationPage } from './ConfirmationPage';
import { RegisterPage } from './RegisterPage';
import { PrivacyPage } from './PrivacyPage';
import { LinksPage } from './LinksPage';
import { CookiesPage } from './CookiesPage';

const alertFixed = {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        zIndex: '9999',
        borderRadius: '0px'
}

const App = function(){
    const alert = useSelector(state => state.alert);
    const registered = useSelector(state => state.registration.registered);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
            history.listen((location, action) => {
                // clear alert on location change
                if(!registered) dispatch(alertActions.clear());
                
                //console.log('_history event', {location, action});
                !!window.ga && window.ga('set', 'page', location.pathname + location.search);
                !!window.ga && window.ga('send', 'pageview');
            });
    }, []);

    useEffect(()=> {
        if(!!registered){
            history.push('/confirmation');
            dispatch(alertActions.success('Registration successful'));
        }
    }, [ registered ])

    return (
        <React.Fragment>
            {alert.message &&
                <div className={`alert ${alert.type}`} style={alertFixed}>{alert.message}</div>
            }
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand href="/">
                                <img src="https://res.cloudinary.com/fynewo/image/upload/f_auto,q_auto,h_87/clients/getmehome-org-uk/getmehome.org-06.png" height="87"/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    {/* <Nav.Link href="/">Home</Nav.Link> */}
                                    <LinkContainer to="/register">
                                        <Nav.Link href="/register">Register</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/about">
                                        <Nav.Link href="/about">About</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/cookies">
                                        <Nav.Link href="/cookies">Cookies</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/privacy">
                                        <Nav.Link href="/privacy">Privacy</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/links">
                                        <Nav.Link href="/links">Links</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>


                    <Container className="main-copy">
                        <Switch>
                            <Route path="/about" component={AboutPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/confirmation" component={ConfirmationPage} />
                            <Route path="/cookies" component={CookiesPage} />
                            <Route path="/privacy" component={PrivacyPage} />
                            <Route path="/links" component={LinksPage} />
                            <Redirect from="*" to="/register" />
                        </Switch>
                    </Container>


        </React.Fragment>
    );
}

export { App };