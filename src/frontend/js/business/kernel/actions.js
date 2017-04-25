import {createAction} from 'redux-actions';
import uuid from 'uuid';

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

const sendCodeSocket = (code, cell_id) => {
    const message = {
        header: {
            username: '',
            version: '5.1',
            session: '',
            msg_id: `${cell_id}-${uuid.v4()}`,
            msg_type: 'execute_request',
        },
        parent_header: {},
        channel: 'shell',
        content: {
            code,
            silent: false,
            store_history: false,
            user_expression: {},
            allow_stdin: false,
        },
        metadata: {},
        buffers: {},
    };

    return createAction(actionTypes.message.SEND)(message);
};

export const message = {
    error: createAction(actionTypes.message.ERROR),
    receive: createAction(actionTypes.message.RECEIVE),
    send: sendCodeSocket,
};

export default {
    create,
    connect,
    close,
    message,
};
