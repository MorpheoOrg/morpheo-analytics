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
import {createAction} from 'redux-actions';
import createRequestActionTypes from './createRequestActionTypes';

export const actionTypes = prefix => ({
    SET: `${prefix}ITEM_SET`,
    create: createRequestActionTypes(`${prefix}_ITEM_CREATE`),
    get: createRequestActionTypes(`${prefix}_ITEM_GET`),
    update: createRequestActionTypes(`${prefix}_ITEM_UPDATE`),
    delete: createRequestActionTypes(`${prefix}_ITEM_DELETE`),
});

export const actions = actionTypes => ({
    set: createAction(actionTypes.SET),
    get: {
        request: createAction(actionTypes.get.REQUEST),
        success: createAction(actionTypes.get.SUCCESS),
        failure: createAction(actionTypes.get.FAILURE),
    },
    create: {
        request: createAction(actionTypes.create.REQUEST),
        success: createAction(actionTypes.create.SUCCESS),
        failure: createAction(actionTypes.create.FAILURE),
    },
    update: {
        request: createAction(actionTypes.update.REQUEST),
        success: createAction(actionTypes.update.SUCCESS),
        failure: createAction(actionTypes.update.FAILURE),
    },
    delete: {
        request: createAction(actionTypes.delete.REQUEST),
        success: createAction(actionTypes.delete.SUCCESS),
        failure: createAction(actionTypes.delete.FAILURE),
    },
});


export default {
    actions,
    actionTypes,
};
