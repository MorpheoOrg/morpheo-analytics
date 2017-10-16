import {reloadSaga} from 'redux-sagas-injector';
import {replaceReducer} from 'redux-reducers-injector';

import Main from './components/Main';

export modelsSaga from '../models/sagas';
export settingsReducer from './reducers/index';
export modelsReducer from '../models/reducer';

// Configure hot module replacement for the reducer
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./reducers/index', () => {
            const settingsReducer = require('./reducers/index').default;
            replaceReducer('settings', settingsReducer);
        });

        module.hot.accept('../models/reducer', () => {
            const modelsReducer = require('../models/reducer').default;
            replaceReducer('models', modelsReducer);
        });

        module.hot.accept('../models/sagas', () => {
            reloadSaga('models', require('../models/sagas').default);
        });
    }
}

export default Main;
