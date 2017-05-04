import {createAction} from 'redux-actions';

import createRequestActionTypes from '../../actions/createRequestActionTypes';

export const actionTypes = {
    create: createRequestActionTypes('KERNEL::CREATE'),
    connect: createRequestActionTypes('KERNEL::CONNECT'),
    close: createRequestActionTypes('KERNEL::CLOSE', ['REQUEST', 'SUCCESS']),
    message: createRequestActionTypes('KERNEL::MESSAGE', ['ERROR', 'RECEIVE', 'SEND']),
};

export const create = {
    request: createAction(actionTypes.create.REQUEST),
    success: createAction(actionTypes.create.SUCCESS),
    failure: createAction(actionTypes.create.FAILURE),
};

export const connect = {
    request: createAction(actionTypes.connect.REQUEST),
    success: createAction(actionTypes.connect.SUCCESS),
    failure: createAction(actionTypes.connect.FAILURE),
};

export const close = {
    request: createAction(actionTypes.close.REQUEST),
    success: createAction(actionTypes.close.SUCCESS),
};

export const message = {
    error: createAction(actionTypes.message.ERROR),
    receive: createAction(actionTypes.message.RECEIVE),
    send: createAction(actionTypes.message.SEND),
};

export default {
    create,
    connect,
    close,
    message,
};
