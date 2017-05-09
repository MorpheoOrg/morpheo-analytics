import React from 'react';
import {Route, Redirect} from 'react-router';
import {asyncComponent} from 'react-async-component';
import {PropTypes} from 'prop-types';
import {injectReducer} from 'redux-injector';
import {injectSaga} from 'redux-sagas-injector';

import UserRoute from '../business/user/routes';
import CellRoutes from '../business/cell/routes';

/* globals window */

const AsyncApp = asyncComponent({
    resolve: () => {
        const sagas = [System.import('../business/kernel/sagas/index')],
            reducers = [System.import('../business/kernel/reducers')];

        return Promise.all([...sagas, ...reducers]).then((values) => {
            injectSaga('kernel', values[0].default);
            injectReducer('kernel', values[1].default(window.localStorage));

            // Configure hot module replacement for the reducer
            if (process.env.NODE_ENV !== 'production') {
                if (module.hot) {
                    module.hot.accept('../business/kernel/reducers', () => System.import('../business/kernel/reducers').then((module) => {
                        injectReducer('kernel', module.default(window.localStorage));
                    }));
                }
            }

            return System.import('./App');
        });
    },
});

const PrivateRoute = ({component, store}) =>
    <Route
        render={({location, ...props}) => {
            const {user} = store.getState();
            return location.pathname === '/sign-in' ? null : (
                user && user.authenticated ?
                    React.createElement(component, props) :
                    <Redirect
                        to={{ // jsx literal -> rerender, need to avoid it
                            pathname: '/sign-in',
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
        <div className="middle">
            <Route path="/" component={AsyncApp} />
            <PrivateRoute component={CellRoutes} store={store} />
            <UserRoute />
        </div>
    </div>;

Routes.propTypes = {
    store: PropTypes.shape({}).isRequired,
};


export default Routes;
