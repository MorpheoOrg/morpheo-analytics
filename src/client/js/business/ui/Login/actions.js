import {createAction} from 'redux-actions';


export const actionsTypes = {
    env: {
        set: 'LOGIN::ENV::SET',
    },
};

export default {
    env: {
        /**
         * Set env variables. If a variable exists, it will be overridden.
         *
         * @param {object.<string, string|number>} payload -
         *     Dictionnary of env variables.
         */
        set: createAction(actionsTypes.env.set),
    }
};
