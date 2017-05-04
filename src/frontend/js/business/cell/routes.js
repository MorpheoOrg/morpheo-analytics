import {Route} from 'react-router';
import React from 'react';
import {injectReducer} from 'redux-injector';

import {asyncComponent} from 'react-async-component';

const AsyncCell = asyncComponent({
    resolve: () => {
        const sagas = [],
            reducers = [System.import('./reducers')];

        return Promise.all([...sagas, ...reducers]).then((values) => {
            injectReducer('cell', values[0].default);

            // Configure hot module replacement for the reducer
            if (process.env.NODE_ENV !== 'production') {
                if (module.hot) {
                    module.hot.accept('./reducers', () => System.import('./reducers').then((module) => {
                        injectReducer('cell', module.default);
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
