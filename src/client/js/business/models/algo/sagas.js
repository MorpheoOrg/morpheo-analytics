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

import {call, put, select, takeLatest, all} from 'redux-saga/effects';

import generalActions from '../../../../../common/actions';
import learnupletActions from '../learnuplet/actions';
import actions, {actionTypes} from './actions';
import {
    fetchAlgos as fetchAlgosApi,
    postAlgo as postAlgoApi,
    postAlgoToOrchestrator as postAlgoToOrchestratorApi,
} from './api';
import {getLoginVariables} from '../../ui/Login/selectors';


function* postAlgo(request) {
    const {body, problemId} = request.payload;
    const {STORAGE_USER, STORAGE_PASSWORD} = yield select(getLoginVariables);
    const {item, error} = yield call(
        postAlgoApi, body, STORAGE_USER, STORAGE_PASSWORD
    );

    if (error) {
        console.error(error.message);
        yield put(actions.item.post.failure(error.body));
    }
    else {
        yield put(actions.item.post.success({...item, problemId}));
        // Post to orchestrator too
        yield put(actions.item.postToOrchestrator.request({
            uuid: item.uuid,
            name: item.name,
            problem: problemId,
        }));
    }
}

function* postToOrchestrator(request) {
    const {
        ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
    } = yield select(getLoginVariables);
    const {item, error} = yield call(
        postAlgoToOrchestratorApi, request.payload,
        ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
    );

    if (error) {
        console.error(error.message);
        yield put(actions.item.postToOrchestrator.failure(error.body));
    }
    else {
        yield put(actions.item.postToOrchestrator.success(item));
    }
}

export const loadList = (actions, fetchList) =>
    function* loadListSaga(request) {
        const {
            ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
        } = yield select(getLoginVariables);
        const {error, list} = yield call(
            fetchList, {problem: request.payload},
            ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
        );

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.list.failure(error.body));
        }
        else {
            // Let's fetch the learnuplet from orchestrator
            const l = list.algos.length;

            for (let i = 0; i < l; i += 1) {
                yield put(learnupletActions.list.request(
                    list.algos[i].uuid,
                ));
            }

            yield put(actions.list.success({[request.payload]: list.algos}));

            return list;
        }
    };

const algoSagas = function* algoSagas() {
    yield all([
        takeLatest(actionTypes.list.REQUEST, loadList(actions, fetchAlgosApi)),
        takeLatest(actionTypes.item.post.REQUEST, postAlgo),
        takeLatest(actionTypes.item.postToOrchestrator.REQUEST, postToOrchestrator),
    ]);
};


export default algoSagas;
