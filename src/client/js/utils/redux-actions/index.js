import {identity} from 'lodash';
import {createAction} from 'redux-actions';
import {checkPropTypes} from 'prop-types';


// Define custom createAction with parameter checking
export const createActionWithCheck = (type, propTypes, payloadCreator = identity) => {
    // Remove the proptype check in production mode
    const payloadChecker = process.env.NODE_ENV !== 'production' ? (args) => {
        const payload = payloadCreator(args);
        checkPropTypes(propTypes, payload, 'argument', `action ${type}`);
        return payload;
    } : payloadCreator;

    return createAction(type, payloadChecker);
};

export default {
    createActionWithCheck,
};
