import {Raw} from 'slate';

import {actionTypes} from './actions';
import {actionTypes as kernelActionTypes} from '../kernel/actions';


const getContent = (content, type) => {
    switch (type) {
    case 'stream':
        return content.text;
    case 'display_data':
        return content.data['image/svg+xml'] || content.data['text/plain'];
    case 'error':
        return content;
    default:
        return undefined;
    }
};

const initialState = {
    results: [],
};

export default (state = initialState, {type, payload}) => {
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
    case actionTypes.SET_LANGUAGE:
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, c.id === payload.id ? {
                        ...c,
                        language: payload.language,
                        slateState: Raw.deserialize({
                            nodes: [
                                {
                                    kind: 'block',
                                    type: 'code_block',
                                    data: {syntax: payload.language},
                                    nodes: [
                                        {
                                            kind: 'text',
                                            ranges: [
                                                {
                                                    text: c.value,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        }, {terse: true}),
                    } : c]),
                []),
        };
    case actionTypes.SET_SLATE:
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, c.id === payload.id ? {
                        ...c,
                        slateState: payload.state,
                    } : c]),
                []),
        };

    case kernelActionTypes.message.RECEIVE: {
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, payload.parent_header.msg_id && c.id === parseInt(payload.parent_header.msg_id.split('-')[0], 10) ? {
                        ...c,
                        content: getContent(payload.content, payload.msg_type) || c.content,
                        status: payload.msg_type === 'error' ? 'ERROR' : 'DONE',
                    } : c]),
                []),
        };
    }

    default:
        return state;
    }
};
