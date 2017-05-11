import {createAction} from 'redux-actions';

const prefix = 'SETTINGS';

export const actionTypes = {
    theme: {
        SET: `${prefix}_THEME_SET`,
    },
    preferredLanguage: {
        SET: `${prefix}_PREFERRED_LANGUAGE_SET`,
    },
};

export const actions = {
    setTheme: createAction(actionTypes.theme.SET),
    setPreferredLanguage: createAction(actionTypes.preferredLanguage.SET),
};

export default actions;
