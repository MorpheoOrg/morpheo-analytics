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
import {Route, Redirect} from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';

import {asyncComponent} from 'react-async-component';

import ModelsRoute from '../business/models/routes';
import UserRoute from '../business/user/routes';

const AsyncApp = asyncComponent({
    resolve: () => System.import('./App'),
});

const AsyncHome = asyncComponent({
    resolve: () => System.import('../components/home'),
});


const PrivateRoute = ({component, store}) =>
    (<Route
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
        <Route path="/" component={AsyncApp} />
        <div className="middle">
            <Route path="/" component={AsyncHome} />
            <UserRoute />
            <Route component={ModelsRoute} store={store} />
        </div>
    </div>);

Routes.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Routes;
