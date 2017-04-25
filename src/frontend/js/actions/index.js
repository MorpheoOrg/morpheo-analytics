import fetch from 'isomorphic-fetch';
import {Observable} from 'rxjs/Rx';
import uuid from 'uuid';

import * as types from '../constants/ActionTypes';


let ws;
let nextCellId = 0;
export const addCell = () => {
    nextCellId += 1;
    return {
        type: types.ADD_CELL,
        id: nextCellId,
    };
};


export const removeCell = id => ({
    type: types.REMOVE_CELL,
    id,
});


export const showResult = (msg_id, content) => ({
    type: types.RECEIVE_RESULTS,
    msg_id,
    content,
});


// TODO create class for websocket
const handleSocketMessage = (msg, dispatch, connected) => {
    if (connected) {
    // Authentication already satisfied
        console.log('message received: ', msg);

    // Handle message type
        switch (msg.msg_type) {
        case 'stream':
            dispatch(showResult(
          msg.parent_header.msg_id,
          msg.content.text,
        ));
            break;

        case 'display_data':
            dispatch(showResult(
          msg.parent_header.msg_id,
          msg.content.data['image/svg+xml'],
        ));
            break;

        default:
            break;
        }
    }
    else if (msg.connection === 'validated') {
    // Authentication validated
        dispatch({
            type: types.CONNECT_WS,
        });
    }
    else {
        console.log('Connection error. Are you sure the proxy is running ?');
    }
};

const handleSocketError = (err, dispatch) => {
    console.log(err);
};

const handleSocketComplete = (dispatch) => {
    console.log('complete');
};

export const connectKernel = (ip, port, jwt) => (dispatch, status) => {
  // Allows the authentication for the proxy
    console.log('connection');
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    fetch(`http://${ip}:${port}/api/kernels`, {
        method: 'POST',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    })
  .catch(err => console.log(err))
  .then(response =>
    // TODO Manage case for status !== 200
    // if (response.status !== 200) {
    //   return;
    // }
     response.json())
  .then((kernel) => {
      ws = Observable.webSocket(
      `ws://${ip}:${port}/api/kernels/${kernel.id}/channels`);
    // .catch()
      ws.next(JSON.stringify(headers));
      ws.subscribe(
      msg => handleSocketMessage(msg, dispatch, status().ws_connection),
      err => handleSocketError(err, dispatch),
      () => handleSocketComplete(dispatch),
    );
      console.log('done');
  });
};


export const sendCode = (python_code, cell_id) => (dispatch) => {
    const msg_id = `${cell_id}-${uuid.v4()}`;
    console.log(msg_id);
    const message = {
        header: {
            username: '',
            version: '5.1',
            session: '',
            msg_id,
            msg_type: 'execute_request',
        },
        parent_header: {},
        channel: 'shell',
        content: {
            code: python_code,
            silent: false,
            store_history: false,
            user_expression: {},
            allow_stdin: false,
        },
        metadata: {},
        buffers: {},
    };

    ws.next(JSON.stringify(message));

    dispatch({
        type: types.SEND_CODE,
        msg_id,
    });
    console.log('dispatch');
};
