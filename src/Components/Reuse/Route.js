import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('auth') ?
                <Component {...props} />
                : <Navigate to="/login" />
        )} />
    );
};

export default PRoute;