import {actionTypes} from './actions';
import {actionTypes as kernelActionTypes} from '../kernel/actions';


const getContent = (content, type) => {
    switch (type) {
    case 'stream':
        return content.text;

    case 'display_data':
        return content.data['image/svg+xml'];
    default:
        return undefined;
    }
};

const initialState = {
    results: [],
};

export default (state = initialState, {type, payload, ...rest}) => {
    switch (type) {
    case actionTypes.ADD:
        return {
            ...state,
            results: [...state.results, payload],
        };
    case actionTypes.REMOVE:
        return {
            ...state,
            results: state.results.filter(o => o.id !== payload),
        };
    case actionTypes.SET:
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, c.id === payload.id ? {
                        ...c,
                        value: payload.value,
                    } : c]),
                []),
        };

    case kernelActionTypes.message.RECEIVE: {
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, c.id === parseInt(payload.parent_header.msg_id.split('-')[0], 10) ? {
                        ...c,
                        content: getContent(payload.content, payload.msg_type) || c.content,
                        status: 'DONE',
                    } : c]),
                []),
        };
    }

    default:
        return state;
    }
};
