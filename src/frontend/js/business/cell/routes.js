import {Route} from 'react-router';
import React from 'react';
import {injectReducer} from 'redux-injector';
import {injectSaga} from 'redux-sagas-injector';

import {asyncComponent} from 'react-async-component';

const AsyncCell = asyncComponent({
    resolve: () => {
        const sagas = [System.import('./sagas')],
            reducers = [System.import('./reducers'), System.import('../settings/reducers')];

        return Promise.all([...sagas, ...reducers]).then((values) => {
            injectSaga('cell', values[0].default);
            injectReducer('cell', values[1].default);
            injectReducer('settings', values[2].default(window.localStorage));

            // Configure hot module replacement for the reducer
            if (process.env.NODE_ENV !== 'production') {
                if (module.hot) {
                    module.hot.accept('./reducers', () => System.import('./reducers').then((module) => {
                        injectReducer('cell', module.default);
                    }));

                    module.hot.accept('../settings/reducers', () => System.import('../settings/reducers').then((module) => {
                        injectReducer('settings', module.default(window.localStorage));
                    }));
                }
            }

            return System.import('./components/CellList');
        });
    },
});


// automatically redirect to models pokemon if we signed in and redirection has not been made
export default props =>
    <div className="cells">
        <Route path="/" component={AsyncCell} />
    </div>;
