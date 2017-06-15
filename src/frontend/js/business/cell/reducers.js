/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

// import {Raw} from 'slate';

import {actionTypes} from './actions';
import {actionTypes as kernelActionTypes} from '../kernel/actions';
import {actionTypes as settingsActionTypes} from '../settings/actions';


const getContent = (content, type) => {
    switch (type) {
    case 'stream':
        return content.text;
    case 'display_data':
        return content.data['image/svg+xml'] || content.data['text/plain'] || content.data['image/png'];
    case 'error':
        return content;
    default:
        return undefined;
    }
};

const getType = (content, type) => {
    switch (type) {
    case 'stream':
        return 'text';
    case 'display_data':
        return content.data['image/svg+xml'] ? 'text' : 'img';
    case 'error':
        return 'error';
    default:
        return undefined;
    }
};

const initialState = {
    results: [],
};

export default (state = initialState, {type, payload}) => {
    const index = state.results.findIndex(o => o.isActive);
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

                // force slateState to update for updating schema
                [
                    ...p,
                    c.id === payload.id ? {
                        ...c,
                        language: payload.language,
                        slateState: payload.state,
                    } : c,
                ]

                // old one
                // const nodes = Raw.serialize(c.slateState, {terse: true}).nodes;
                // return [
                //     ...p,
                //     c.id === payload.id ? {
                //         ...c,
                //         language: payload.language,
                //         slateState: Raw.deserialize({
                //             nodes: nodes.reduce((p, c) => [...p, {
                //                 ...c,
                //                 data: {...c.data, syntax: payload.language},
                //             }], []),
                //         }, {terse: true}),
                //     } : c,
                // ];

            , []),
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

    case actionTypes.SET_ACTIVE:
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, {
                        ...c,
                        isActive: c.id === payload,
                    }]),
                []),
        };

    case actionTypes.INSERT_AFTER:
        return {
            ...state,
            results: [
                ...state.results.slice(0, index),
                {...state.results[index], isActive: false},
                {...payload, isActive: true},
                ...state.results.slice(index + 1, state.results.length),
            ],
        };

    case actionTypes.INSERT_BEFORE:
        return {
            ...state,
            results: [
                ...state.results.slice(0, index),
                {...payload, isActive: true},
                {...state.results[index], isActive: false},
                ...state.results.slice(index + 1, state.results.length),
            ],
        };
    case kernelActionTypes.message.RECEIVE: {
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, payload.parent_header.msg_id && c.id === parseInt(payload.parent_header.msg_id.split('-')[0], 10) ? {
                        ...c,
                        content: getContent(payload.content, payload.msg_type) || c.content,
                        type: getType(payload.content, payload.msg_type) || c.type,
                        status: payload.msg_type === 'error' ? 'ERROR' : 'DONE',
                    } : c]),
                []),
        };
    }

    case actionTypes.save.REQUEST:
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, c.id === payload.id ? {
                        ...c,
                        loading: true,
                    } : c]),
                []),
        };
    case actionTypes.save.SUCCESS:
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, c.id === payload.id ? {
                        ...c,
                        version: payload.version,
                        loading: false,
                    } : c]),
                []),
        };
    case actionTypes.save.FAILURE:
        return {
            ...state,
            results: state.results.reduce((p, c) =>
                    ([...p, c.id === payload.id ? {
                        ...c,
                        loading: false,
                        error: payload.error,
                    } : c]),
                []),
        };
    case settingsActionTypes.line_numbers.SET:
        return {
            ...state,
            results: state.results.reduce((p, c) => {
                const {slateState} = c;
                const code_block = slateState.document.getParent(slateState.startBlock.key);

                // force code_block slateState to update for updating schema
                return [
                    ...p,
                    {
                        ...c,
                        ...(code_block.type === 'code_block' ? {slateState: c.slateState.transform().focus().apply()} : {}),
                    },
                ];

                // old
                // const nodes = Raw.serialize(c.slateState, {terse: true}).nodes;
                // return [
                //     ...p,
                //     {
                //         ...c,
                //         language: payload.language,
                //         slateState: Raw.deserialize({
                //             nodes: nodes.reduce((p, c) => [...p, {
                //                 ...c,
                //                 ...(c.type === 'code_block' ? {
                //                     data: {
                //                         ...c.data,
                //                         line_numbers: payload,
                //                     },
                //                 } : {}),
                //             }], []),
                //         }, {terse: true}),
                //     },
                // ];
            }, []),
        };

    default:
        return state;
    }
};
