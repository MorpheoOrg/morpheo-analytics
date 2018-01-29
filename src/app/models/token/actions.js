import PropTypes from 'prop-types';
import {createActionWithCheck} from '../../utils/redux-actions';


export const actionTypes = {
    get: {
        request: 'TOKEN::GET::REQUEST',
        success: 'TOKEN::GET::SUCCESS',
        failure: 'TOKEN::GET::FAILURE'
    }
};

export default {
    get: {
        request: createActionWithCheck(actionTypes.get.request),
        success: createActionWithCheck(actionTypes.get.success),
        failure: createActionWithCheck(actionTypes.get.failure),
    }
};
