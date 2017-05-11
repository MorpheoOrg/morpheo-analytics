import {Route} from 'react-router';
import React from 'react';
import {injectSaga} from 'redux-sagas-injector';

import {asyncComponent} from 'react-async-component';

const AsyncSettings = asyncComponent({
    resolve: () => {
        const sagas = [System.import('./sagas')],
            reducers = [];

        return Promise.all([...sagas, ...reducers]).then((values) => {
            injectSaga('settings', values[0].default);

            return System.import('./components/Settings');
        });
    },
});


// automatically redirect to models pokemon if we signed in and redirection has not been made
export default props =>
    <div className="settings">
        <Route path="/" component={AsyncSettings} />
    </div>;
