import React from 'react';
import {connect} from 'react-redux';
import universal from 'react-universal-component';
import {injectSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-reducers-injector';


const Universal = universal(import('./preload'), {
    loading: <div>Loading</div>,
    onLoad: (preload, {isSync, isServer}, props, context) => {
        injectReducer('settings', preload.settingsReducer);
        injectReducer('models', preload.modelsReducer);
        // injectSaga('models.experiment', preload.modelsExperimentSaga);
        // injectSaga('models.challenge', preload.modelsChallengeSaga);
        injectSaga('setttings', preload.settingsSaga);
        injectSaga('models', preload.modelsSaga);
    },
});

const mapStateToProps = (state, ownProps) => (ownProps);

export default connect(mapStateToProps)((props) => {
    return <Universal />;
});
