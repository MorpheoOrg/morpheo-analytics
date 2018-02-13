import settings from 'electron-settings';

import {actionsTypes} from './actions';


const getInitialState = () => {
    const {version, ...login} = settings.get('settings.login', {});

    // Manage the different versions of the settings of analytics
    if (version !== '0.0.2') {
        return {};
    }

    return login;
};


export default (state = getInitialState(), {type, payload}) => {
    switch (type) {
    case actionsTypes.env.set:
        return {
            ...state,
            ...payload,
        };

    default:
        return state;
    }
};
