import {reloadSaga} from 'redux-sagas-injector';
import {replaceReducer} from 'redux-reducers-injector';

import Home from './components';


export {default as settingsReducer} from './reducers';
export {default as settingsSaga} from './sagas';
export {default as modelsReducer} from '../../models/reducer';
export {default as modelsSaga} from '../../models/sagas';


// Configure hot module replacement for the reducer
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const settingsReducer = require('./reducers').default;
            replaceReducer('settings', settingsReducer);
        });

        module.hot.accept('./sagas', () => {
            reloadSaga('settings', require('./sagas').default);
        });

        module.hot.accept('../../models/reducer', () => {
            const modelsReducer = require('../../models/reducer').default;
            replaceReducer('models', modelsReducer);
        });

        module.hot.accept('../../models/sagas', () => {
            reloadSaga('models', require('../../models/sagas').default);
        });
    }
}

export default Home;
