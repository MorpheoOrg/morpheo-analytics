import {reloadSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-reducers-injector';

import Main from './components/Main';

export settingsReducer from './reducers/index';
export modelsReducer from '../models/reducer';
export modelsSaga from '../models/sagas';

// Configure hot module replacement for the reducer
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./reducers/index', () => {
            const settingsReducer = require('./reducers/index').default;
            injectReducer('settings', settingsReducer, true);
        });

        module.hot.accept('../models/reducer', () => {
            const modelsReducer = require('../models/reducer').default;
            injectReducer('models', modelsReducer, true);
        });

        module.hot.accept('../models/sagas', () => {
            reloadSaga('models', require('../models/sagas').default);
        });

        // module.hot.accept('../settings/sagas', () => {
        //     reloadSaga('settings', require('../settings/sagas').default);
        // });
    }
}

export default Main;
