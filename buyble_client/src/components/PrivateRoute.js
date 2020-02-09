import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import {auth} from './auth.js';

const PrivateRoute = ({ component, component_fail, ...rest }) => (
    
    <Route {...rest} render={(props) => (
        auth.isLoggedIn() ? (
            React.createElement(component, props)
        ) : (
            React.createElement(component_fail, props)
        )
        
    )} />
);

export default PrivateRoute;