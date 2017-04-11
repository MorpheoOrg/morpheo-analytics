import {Route, Redirect} from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';
import {injectReducer} from 'redux-injector';
import {injectSaga} from 'redux-sagas-injector';

import {asyncComponent} from 'react-async-component';

import ModelsRoute from '../business/models/routes';
import UserRoute from '../business/user/routes';

const AsyncApp = asyncComponent({
    resolve: () => System.import('./App')
});

// models experiment is needed in app root due to left-menu button creation
const AsyncHome = asyncComponent({
    resolve: () => {
        const sagas = System.import('../business/models/experiment/sagas'),
            reducers = System.import('../business/models/experiment/reducers');

        return Promise.all([sagas, reducers]).then((values) => {
            injectSaga('experiment', values[0].default);
            injectReducer('models.experiment', values[1].default);

            // Configure hot module replacement for the reducer
            if (process.env.NODE_ENV !== 'production') {
                if (module.hot) {
                    module.hot.accept('../business/models/experiment/reducers', () => System.import('../business/models/experiment/reducers').then((module) => {
                        injectReducer('models.experiment', module.default);
                    }));
                }
            }

            return System.import('../components/home');
        });
    },
});


const PrivateRoute = ({component, store}) =>
    <Route
        render={({location, ...props}) => {
            const {user} = store.getState();
            return location.pathname === 'sign-up' || location.pathname.startsWith('/verify/') ? null : (
                user && user.authenticated ?
                    React.createElement(component, props) :
                    <Redirect
                        to={{ // jsx literal -> rerender
                            pathname: '/',
                            // save previous route if set
                            state: {
                                ...location,
                                ...(location.state ? location.state : null),
                            },
                        }}
                    />
            );
        }}
    />;

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    store: PropTypes.shape({
        getState: PropTypes.func,
    }).isRequired,
};

PrivateRoute.defaultProps = {
    location: null,
};

const Routes = ({store}) =>
    <div id="routes">
        <Route path="/" component={AsyncApp}/>
        <div className="middle">
            <Route path="/" component={AsyncHome}/>
            <UserRoute />
            <PrivateRoute component={ModelsRoute} store={store}/>
        </div>
    </div>;

Routes.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Routes;
