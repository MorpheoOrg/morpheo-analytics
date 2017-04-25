import React from 'react';
import {Route} from 'react-router';
import {asyncComponent} from 'react-async-component';
import {PropTypes} from 'prop-types';


const AsyncApp = asyncComponent({
    resolve: () => System.import('./App'),
});


const Routes = ({store}) =>
    <div id="routes">
        <Route path="/" component={AsyncApp} />
    </div>;

Routes.propTypes = {
    store: PropTypes.shape({}).isRequired,
};


export default Routes;
