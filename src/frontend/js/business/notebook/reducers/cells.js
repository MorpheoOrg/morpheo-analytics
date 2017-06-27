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

import {actionTypes} from '../actions';
import {actionTypes as kernelActionTypes} from '../../kernel/actions';


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
    case actionTypes.INSERT_AFTER:
        return {
            ...state,
            results: [
                ...state.results.slice(0, index),
                {...state.results[index]},
                {...payload},
                ...state.results.slice(index + 1, state.results.length),
            ],
        };

    case actionTypes.INSERT_BEFORE:
        return {
            ...state,
            results: [
                ...state.results.slice(0, index),
                {...payload},
                {...state.results[index]},
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
    default:
        return state;
    }
};
