import {createAction} from 'redux-actions';


export const actionTypes = {
    error: {
        SET: 'GENERAL_500_SET',
    },
};

export default {
    error: {
        set: createAction(actionTypes.error.SET),
    },
};
