import React, { useEffect } from 'react';
import { 
    Route, 
    Switch, 
    Redirect, 
    BrowserRouter
} from 'react-router-dom';

import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';

import { AboutPage } from './AboutPage';
import { RegisterPage } from './RegisterPage';
import { PrivacyPage } from './PrivacyPage';
import { LinksPage } from './LinksPage';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <React.Fragment>
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }

            <BrowserRouter
                history={history}
            >

                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">GMH!</Navbar.Brand>
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
                                    <LinkContainer to="/privacy">
                                        <Nav.Link href="/privacy">Privacy</Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown title="More" id="basic-nav-dropdown">
                                        <LinkContainer to="/links">
                                            <NavDropdown.Item href="/links">Links</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <LinkContainer to="/contact">
                                            <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>


                    <Container>

                        <Switch>
                            <Route path="/about" component={AboutPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/privacy" component={PrivacyPage} />
                            <Route path="/links" component={LinksPage} />
                            
                            <Redirect from="*" to="/register" />
                        </Switch>

                    </Container>

            </BrowserRouter>


        </React.Fragment>
    );
}

export { App };