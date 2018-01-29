import React from 'react';

/* Declare routes */
import Home from './home';


export default (page) => {
    switch (page) {
    case 'HOME':
        return <Home />;
    default:
        return <h1>Not Found</h1>;
    }
};
