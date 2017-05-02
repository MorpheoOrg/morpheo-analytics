import React from 'react';
import {Route, Redirect} from 'react-router';
import {asyncComponent} from 'react-async-component';
import {PropTypes} from 'prop-types';
import {injectReducer} from 'redux-injector';
import {injectSaga} from 'redux-sagas-injector';

import UserRoute from '../business/user/routes';

// const AsyncApp = asyncComponent({
//     resolve: () => System.import('./App'),
// });

const AsyncHome = asyncComponent({
    resolve: () => {
        const sagas = System.import('../business/kernel/sagas'),
            reducers = System.import('../reducers');
            // reducers = System.import('../business/kernel/reducers');

        return Promise.all([sagas, reducers]).then((values) => {
            injectSaga('cells', values[0].default);
            injectReducer('notebooks', values[1].default);

            // Configure hot module replacement for the reducer
            if (process.env.NODE_ENV !== 'production') {
                if (module.hot) {
                    module.hot.accept('../business/kernel/reducers', () => System.import('../business/kernel/reducers').then((module) => {
                        injectReducer('cells', module.default);
                    }));
                }
            }

            return System.import('../components/Home');
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
                        to={{ // jsx literal -> rerender
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
            {/* <Route path="/notebook" component={AsyncApp} /> */}
            <PrivateRoute component={AsyncHome} store={store} />
            <UserRoute />
        </div>
    </div>;

Routes.propTypes = {
    store: PropTypes.shape({}).isRequired,
};


export default Routes;
