import {reloadSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-reducers-injector';

import Main from './components/Main';

export settingsReducer from './reducers/index';
export modelsReducer from '../models/reducer';
export modelsSaga from '../models/sagas';
// export modelsChallengeSaga from '../models/challenge/sagas';
// export modelsExperimentSaga from '../models/experiment/sagas';

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

        // module.hot.accept('../models/experiment/sagas', () => {
        //     reloadSaga('models.experiment', require('../models/experiment/sagas').default);
        // });

        // module.hot.accept('../models/challenge/sagas', () => {
        //     reloadSaga('models.challenge', require('../models/challenge/sagas').default);
        // });

        module.hot.accept('../models/sagas', () => {
            reloadSaga('models', require('../models/sagas').default);
        });
    }
}

export default Main;
