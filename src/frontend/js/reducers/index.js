// import {combineReducers} from 'redux';

import * as types from '../constants/ActionTypes';
import {actionTypes as kernelActionTypes} from '../business/kernel/actions';


const cell = (state, action) => {
    const {payload} = action;
    switch (action.type) {
    case types.ADD_CELL:
        return {
            id: action.id,
            value: null,
            msg_id: null,
            content: null,
            status: null,
        };

    case types.SEND_CODE:
        if (state.id !== parseInt(action.msg_id.split('-')[0], 10)) {
            return state;
        }
        return {
            ...state,
            msg_id: action.msg_id,
          // content: 'COMPUTING',
            status: 'COMPUTING',
        };

    case types.RECEIVE_RESULTS:
        if (state.id === parseInt(action.msg_id.split('-')[0], 10) &&
         state.msg_id === action.msg_id) {
            return {
                ...state,
                msg_id: action.msg_id,
                content: action.content,
        //  status: 'DONE',
            };
        }
        return state;

    case kernelActionTypes.message.RECEIVE:
        if (state.id !== parseInt(payload.parent_header.msg_id.split('-')[0], 10)) {
            return state;
        }

        switch (payload.msg_type) {
        case 'stream':
            return {
                ...state,
                content: payload.content.text,
            };

        case 'display_data':
            return {
                ...state,
                content: payload.content.data['image/svg+xml'],
            };

        default:
            return state;
        }

    default:
        return state;
    }
};


const cells = (state = [], action) => {
    switch (action.type) {
    case types.ADD_CELL:
        return [
            ...state,
            cell(undefined, action),
        ];

    case types.REMOVE_CELL:
        return state.filter(c => c.id !== action.id);

    case types.SEND_CODE:
    case types.RECEIVE_RESULTS:
    case kernelActionTypes.message.RECEIVE:
        return state.map(c => cell(c, action));

    default:
        return state;
    }
};


// const ws_connection = (state = false, action) => {
//     switch (action.type) {
//     case types.CONNECT_WS:
//         return true;
//
//     case types.DISCONNECT_WS:
//         return false;
//
//     default:
//         return state;
//     }
// };

const NotebookApp = {
    cells,
    // ws_connection,
};

export default NotebookApp;
