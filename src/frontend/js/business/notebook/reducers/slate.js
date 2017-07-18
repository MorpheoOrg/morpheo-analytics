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

import {Raw, State, Document, Selection} from 'slate';

import {actionTypes} from '../actions';
import {actionTypes as settingsActionTypes} from '../../settings/actions';
import {actionTypes as kernelActionTypes} from '../../kernel/actions';
import languages from '../components/Editor/languages';

const createState = (type = 'code_block') => {
    if (!['code_block', 'paragraph'].includes(type)) {
        throw new Error(`type must be of types code_block or paragraph. ${type} is invalid.`);
    }

    return Raw.deserialize({
        nodes: [
            {
                kind: 'block',
                type,
                ...(type === 'code_block' ? {
                    data: {syntax: languages[0]},
                    nodes: [
                        {
                            kind: 'block',
                            type: 'code_line',
                            nodes: [{
                                kind: 'text',
                                text: '',
                            }],
                        },
                    ],
                } : {
                    nodes: [
                        {
                            kind: 'text',
                            ranges: [
                                {
                                    text: '', // initialize to empty
                                },
                            ],
                        },
                    ],
                }),
            },
        ],
    }, {terse: true});
};

const initialState = {
    state: State.create({
        document: Document.create({
            nodes: [
                {
                    kind: 'block',
                    type: 'code_block',
                    data: {syntax: languages[0]},
                    nodes: [
                        {
                            type: 'code_line',
                            nodes: [{
                                type: 'text',
                                text: '',
                            }],
                        },
                    ],
                },
            ],
        }),
        // selection: Selection.create(),
    }),
    language: null,
    loading: false,
    version: null,
    error: null,
    line_numbers: false,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionTypes.SET_LANGUAGE:
        return {
            ...state,
            language: payload.language,
            state: payload.state,
        };
    case actionTypes.SET_SLATE:
        return {
            ...state,
            state: payload.state,
        };
    case actionTypes.save.REQUEST:
        return {
            ...state,
            loading: true,
        };
    case actionTypes.save.SUCCESS:
        return {
            ...state,
            version: payload.version,
            loading: false,
        };
    case actionTypes.save.FAILURE:
        return {
            ...state,
            loading: false,
            error: payload.error,
        };
    case settingsActionTypes.line_numbers.SET:
        return {
            ...state,
            state: state.state.transform().focus().apply(),
            line_numbers: payload,
        };
    case kernelActionTypes.message.RECEIVE:
        console.log(payload);
        return {
            ...state,
            output: payload,
            state: state.state.transform().focus().apply(),
        };
    default:
        return state;
    }
};
