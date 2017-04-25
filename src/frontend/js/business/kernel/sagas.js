/* globals API_SOCKET_URL, WebSocket */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import {call, fork, put, take, takeLatest} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';

import {
  close as closeActions,
  connect as connectActions,
  create as createActions,
  message as messageActions,
  actionTypes,
} from './actions';
import {
  fetchCreateKernel as fetchCreateKernelApi,
  fetchConnectKernel as fetchConnectKernelApi,
} from './api';

export const createKernel = fetchCreateKernel =>
    function* createKernelSagas({payload: {jwt}}) {
        const {error, res} = yield call(fetchCreateKernel, jwt);

        if (error) {
            yield put(createActions.failure(error));
        }
        else {
            const {id: kernel_id} = res;
            yield put(createActions.success({kernel_id}));

            // TODO remove the automatic socket connection
            yield put(connectActions.request({jwt, kernel_id}));
        }
    };

const subscribeSocketChannel =
    (socket, closeAfterReception = false) => eventChannel((emit) => {
        socket.onmessage = (e) => {
            let msg = null;
            try {
                msg = JSON.parse(e.data);
                emit(messageActions.receive(msg));
            }
            catch (e) {
                emit(messageActions.error(e.data));
            }
        };

        return () => {
            socket.onmessage = undefined;
        };
    });

function* receiveSocketMessage(socket) {
    const socketChannel = yield call(subscribeSocketChannel, socket, true);
    while (true) {
        const action = yield take(socketChannel);
        yield put(action);
    }
}

function* sendSocketMessage(socket) {
    while (true) {
        const {payload: message} = yield take(actionTypes.message.SEND);
        console.log(message);
        socket.send(JSON.stringify(message));
    }
}

function* manageSocketMessage(socket) {
    yield fork(receiveSocketMessage, socket);
    yield fork(sendSocketMessage, socket);
    // TODO Add closeSocket sagas
    // yield fork(closeSocket, socket);
}

export const connectKernel = fetchConnectKernel =>
    function* connectKernelSagas() {
        while (true) {
            const {payload: {jwt, kernel_id}} = yield take(actionTypes.connect.REQUEST);
            const socket = new WebSocket(
                `${API_SOCKET_URL}/api/kernels/${kernel_id}/channels`);
            const authenticateChannel = yield call(
                subscribeSocketChannel, socket, true);

            // Send authentication
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    Authorization: `Bearer ${jwt}`,
                }));
            };

            // Validate authentication
            const {payload} = yield take(authenticateChannel);
            if (payload.connection !== 'validated') {
                yield put(connectActions.failure(payload));
            }
            else {
                yield put(connectActions.success());
                yield fork(manageSocketMessage, socket);
                yield take(actionTypes.close.REQUEST);
            }

            socket.close();
            yield put(closeActions.success());
        }
    };


/* istanbul ignore next */
const sagas = function* sagas() {
    yield [
        takeLatest(actionTypes.create.REQUEST,
                   createKernel(fetchCreateKernelApi)),
        // takeLatest(actionTypes.connect.REQUEST,
        //            connectKernel(fetchConnectKernelApi)),
        connectKernel(fetchConnectKernelApi)(),
    ];
};


export default sagas;
