import React from 'react';
import universal from 'react-universal-component';
import {injectSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-reducers-injector';


const Universal = universal(import('./preload'), {
    loading: <div>Loading</div>,
    onLoad: (preload, {isSync, isServer}, props, context) => {
        injectReducer('settings', preload.settingsReducer);
        injectReducer('models', preload.modelsReducer);
        injectSaga('setttings', preload.settingsSaga);
        injectSaga('models', preload.modelsSaga);
        // injectSaga('models.experiment', preload.modelsExperimentSaga);
        // injectSaga('models.challenge', preload.modelsChallengeSaga);
    },
});


export default Universal;
