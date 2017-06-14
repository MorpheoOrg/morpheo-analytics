/**
 * Created by guillaume on 5/4/17.
 */

import {takeEvery} from 'redux-saga/effects';
import uuid from 'uuid';

import {
    actionTypes,
} from '../actions';

const sendSocketMessage = socket =>
    function* sendSocketMessage({payload: {code, id}}) {
        const message = {
            header: {
                username: '',
                version: '5.1',
                session: '',
                msg_id: `${id}-${uuid.v4()}`,
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

        yield socket.send(JSON.stringify(message));
    };

/* istanbul ignore next */
export default function* sendSagas(socket) {
    yield [
        takeEvery(actionTypes.message.SEND, sendSocketMessage(socket)),
    ];
}

