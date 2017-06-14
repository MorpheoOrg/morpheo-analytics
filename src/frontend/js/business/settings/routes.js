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
