import {reloadSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-reducers-injector';

import Notebook from './components/Notebook';

export notebookSagas from './sagas';
export notebookReducer from './reducers/index';
export settingsReducer from '../settings/reducer';
export settingsSagas from '../settings/sagas';

// Configure hot module replacement for the reducer
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./reducers/index', () => {
            const notebookReducer = require('./reducers/index').default;
            injectReducer('notebook', notebookReducer, true);
        });
        module.hot.accept('../settings/reducer', () => {
            const settingsReducer = require('../settings/reducer').default;
            injectReducer('settings', settingsReducer(localStorage), true);
        });
        module.hot.accept('./sagas', () => {
            reloadSaga('notebook', require('./sagas').default);
        });
        module.hot.accept('../settings/sagas', () => {
            reloadSaga('settings', require('../settings/sagas').default);
        });
    }
}

export default Notebook;
