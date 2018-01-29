import settings from 'electron-settings';

import {actionsTypes} from './actions';


const initialState = settings.get('settings.login', {});

export default (state = initialState, {type, payload}) => {
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
