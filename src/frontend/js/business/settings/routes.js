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

/* globals window */

import {Route} from 'react-router';
import React from 'react';
import {injectSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-injector';

import {asyncComponent} from 'react-async-component';

const AsyncSettings = asyncComponent({
    resolve: () => {
        const sagas = [System.import('./sagas')],
            reducers = [System.import('./reducers')];

        return Promise.all([...sagas, ...reducers]).then((values) => {
            injectSaga('settings', values[0].default);
            injectReducer('settings', values[1].default(window.localStorage));

            // Configure hot module replacement for the reducer
            if (process.env.NODE_ENV !== 'production') {
                if (module.hot) {
                    module.hot.accept('./reducers', () => System.import('./reducers').then((module) => {
                        injectReducer('settings', module.default(window.localStorage));
                    }));
                }
            }

            return System.import('./components/Settings');
        });
    },
});


// automatically redirect to models pokemon if we signed in and redirection has not been made
export default props =>
    (<div className="settings">
        <Route path="/" component={AsyncSettings} />
    </div>);