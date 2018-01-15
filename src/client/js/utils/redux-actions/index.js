import {identity} from 'lodash';
import {createAction} from 'redux-actions';
// use instead of checkPropTypes of 'prop-types' because throw error instead
// warnings
import {assertPropTypes} from 'check-prop-types';


// Define custom createAction with parameter checking
export const createActionWithCheck = (type, propTypes, payloadCreator = identity) => {
    // TODO Check if type is defined when mode debug
    // TODO display warning as error
    // Remove the proptype check in production mode
    const payloadChecker = process.env.NODE_ENV !== 'production' ? (args) => {
        const payload = payloadCreator(args);
        assertPropTypes(propTypes, payload, 'argument', `action ${type}`);
        return payload;
    } : payloadCreator;

    return createAction(type, payloadChecker);
};

export default {
    createActionWithCheck,
};
