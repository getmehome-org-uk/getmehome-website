import React, { useEffect } from 'react';
import { 
    Router, 
    Route, 
    Switch, 
    Redirect, 
    //useLocation, 
    BrowserRouter
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
//import { PrivateRoute } from '../_components';
//import { HomePage } from '../HomePage';
//import { LoginPage } from '../LoginPage';
//import { RegisterPage } from '../RegisterPage';

import { HomePage } from '../gmhHomePage';
import { AboutPage } from '../gmhAboutPage';
import { RegisterPage } from '../gmhRegisterPage';


//function usePageViews() {
//    let location = useLocation();
//    React.useEffect(() => {
//        window.ga && ga.send(["pageview", location.pathname]);
//    }, [location]);
//}

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    //usePageViews();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    
                    <BrowserRouter
                        history={history}
                    >
                        <Switch>
                            <Route path="/" component={HomePage} exact />
                            <Route path="/about" component={AboutPage} />
                            <Route path="/register" component={RegisterPage} />

                            {/* <PrivateRoute exact path="/" component={HomePage} /> */}
                            {/* <Route path="/login" component={LoginPage} /> */}
                            {/* <Route path="/register" component={RegisterPage} /> */}

                            <Redirect from="*" to="/" />
                        </Switch>
                    </BrowserRouter>

                </div>
            </div>
        </div>
    );
}

export { App };