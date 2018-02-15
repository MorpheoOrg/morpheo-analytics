import PropTypes from 'prop-types';
import {createActionWithCheck} from '../../utils/redux-actions';


const types = ['request', 'success', 'failure', 'reset', 'update'];

export const actionsTypesFactory = prefix => types.reduce((previousTypes, type) => ({
    ...previousTypes,
    [type]: `${prefix}::${type.toUpperCase()}`,
}), {});

export const actionsFactory = actionTypes => ({
    request: createActionWithCheck(actionTypes.request, {
        id: PropTypes.string,
    }),
    success: createActionWithCheck(actionTypes.success, {
        list: PropTypes.object,
    }),
    failure: createActionWithCheck(actionTypes.failure, {
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }),
    reset: createActionWithCheck(actionTypes.reset),
    update: createActionWithCheck(actionTypes.update),
});


export default {
    actionsTypesFactory,
    actionsFactory,
};
