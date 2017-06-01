import {createAction} from 'redux-actions';

const prefix = 'SETTINGS';

export const actionTypes = {
    theme: {
        SET: `${prefix}_THEME_SET`,
    },
    preferred_language: {
        SET: `${prefix}_PREFERRED_LANGUAGE_SET`,
    },
    keybindings: {
        SET: `${prefix}_KEY_BINDINGS_SET`,
    },
    line_numbers: {
        SET: `${prefix}_LINE_NUMBERS_SET`,
    },
    UPDATE: `${prefix}_UPDATE`,
};

export const actions = {
    setTheme: createAction(actionTypes.theme.SET),
    setPreferredLanguage: createAction(actionTypes.preferred_language.SET),
    setKeyBindings: createAction(actionTypes.keybindings.SET),
    setLineNumbers: createAction(actionTypes.line_numbers.SET),
    update: createAction(actionTypes.UPDATE),
};

export default {
    actionTypes,
    actions,
};
