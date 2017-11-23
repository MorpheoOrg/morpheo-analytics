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


const initialState = {
    error: null,
    id: null,
    results: {},
    loading: false,
};

const item = actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.item.SET:
            return {
                ...state,
                id: payload,
            };
        case actionTypes.item.get.REQUEST:
            return {
                ...state,
                results: {...state.results, [payload]: {loading: true}},
                loading: true,
            };
        case actionTypes.item.get.SUCCESS:
            return {
                ...state,
                results: {
                    ...state.results,
                    ...({...payload, loading: false}),
                },
                loading: false,
            };
        case actionTypes.item.delete.SUCCESS:
            return {
                ...state,
                id: null,
                loading: false,
            };
        case actionTypes.item.get.FAILURE:
        case actionTypes.item.create.FAILURE:
        case actionTypes.item.update.FAILURE:
        case actionTypes.item.delete.FAILURE:
            return {
                ...state,
                error: payload,
                results: Object.keys(state.results).reduce((p, c) => (
                    {...p, [c]: {...state.results[c], loading: false}}
                ), {}),
                loading: false,
            };
        default:
            return state;
        }
    };

export default {
    item: item(actionTypes),
};
