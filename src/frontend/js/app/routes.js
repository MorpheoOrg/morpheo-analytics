/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

import React from 'react';
import {Route, Redirect} from 'react-router';
import {asyncComponent} from 'react-async-component';
import {PropTypes} from 'prop-types';
import {injectReducer} from 'redux-injector';
import {injectSaga} from 'redux-sagas-injector';

import UserRoute from '../business/user/routes';
import NotebookRoutes from '../business/notebook/routes';
import SettingsRoutes from '../business/settings/routes';

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
    (<Route
        render={({location, ...props}) => {
            const {user} = store.getState();
            return location.pathname.startsWith('/sign-in') ? null : (
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
    />);

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
    (<div id="routes">
        <div className="middle">
            <Route path="/" component={AsyncApp} />
            <PrivateRoute component={SettingsRoutes} store={store} />
            <PrivateRoute component={NotebookRoutes} store={store} />
            <UserRoute />
        </div>
    </div>);

Routes.propTypes = {
    store: PropTypes.shape({}).isRequired,
};


export default Routes;
