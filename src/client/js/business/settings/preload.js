import {reloadSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-injector';

import Settings from './components/index';

export sagas from './sagas';
export reducer from './reducer';

// Configure hot module replacement for the reducer
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const reducer = require('./reducer').default;
            injectReducer('settings', reducer(localStorage), true);
        });
        module.hot.accept('./sagas', () => {
            reloadSaga('settings', require('./sagas').default);
        });
    }
}

export default Settings;
