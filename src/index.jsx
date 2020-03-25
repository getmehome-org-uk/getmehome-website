import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

import './styles'

// import "@babel/polyfill"; - moved to webpack.config.js
import 'whatwg-fetch'
import "./_helpers/endsWith";
//import "./_helpers/localStorage";
import "./_helpers/object-assign";
import Promise from 'promise-polyfill';

// setup fake backend
import { configureFakeBackend } from './_helpers';
import { BrowserRouter } from 'react-router-dom';
configureFakeBackend();

render(
    <Provider store={store}>
        <BrowserRouter>
                <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);