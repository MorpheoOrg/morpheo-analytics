import React from 'react';
import universal from 'react-universal-component';
import {injectSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-reducers-injector';

const Universal = universal(import('./preload'), {
    onLoad: (preload, {isSync, isServer}, props, context) => {
        injectReducer('settings', preload.settingsReducer);
        injectReducer('models', preload.modelsReducer);
        injectSaga('models', preload.modelsSaga);
    },
});

export default () => <Universal />;
