/*
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

import notificationActions from '../../routes/home/components/Notifications/actions';
import generalActions from '../../actions';
import learnupletActions from '../learnuplet/actions';
import actions, {actionTypes} from './actions';
import {
    fetchAlgos as fetchAlgosApi,
    postAlgo as postAlgoApi,
    postAlgoToOrchestrator as postAlgoToOrchestratorApi,
} from './api';
import {getCredentials} from '../../routes/home/components/Login/selectors';
import {FetchError} from '../../utils/errors';


// TODO: add problemId into payload instead of sending string directly or take
// it directly from the state
export function* loadAlgosListSaga({payload}) {
    const {
        ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
    } = yield select(getCredentials);
    try {
        const {algos} = yield call(fetchAlgosApi, {
            user: ORCHESTRATOR_USER,
            password: ORCHESTRATOR_PASSWORD,
            parameters: {
                problem: payload
            },
        });

        // Let's fetch the learnuplet from orchestrator
        for (let i = 0; i < algos.length; i += 1) {
            yield put(learnupletActions.list.request(
                algos[i].uuid,
            ));
        }

        yield put(actions.list.success({
            list: {
                [payload]: algos,
            }
        }));
    }
    catch (error) {
        if (error instanceof FetchError) {
            yield put(generalActions.error.set(error.message));
            yield put(actions.list.failure({
                message: error.message,
                status: error.status,
            }));
        }
        else throw error;
    }
}


export function* postAlgoSaga({payload}) {
    const {body, problemId} = payload;
    const {
        ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD,
        STORAGE_USER, STORAGE_PASSWORD,
    } = yield select(getCredentials);

    try {
        // First we post the algo on storage
        const algo = yield call(postAlgoApi, {
            body,
            user: STORAGE_USER,
            password: STORAGE_PASSWORD
        });

        // Then we post the algo to orchestrator to launch the computation
        yield call(postAlgoToOrchestratorApi, {
            body: {
                uuid: algo.uuid,
                name: algo.name,
                problem: problemId,
            },
            user: ORCHESTRATOR_USER,
            password: ORCHESTRATOR_PASSWORD,
        });

        yield put(actions.item.post.success({...algo, problemId}));
        yield put(notificationActions.send({
            content: 'Algorithm sucessfully sent',
            type: 'SUCCESS',
        }));
    }
    catch (error) {
        if (error instanceof FetchError) {
            // throw new FetchError('toto', 354);
            yield put(generalActions.error.set(error.message));
            yield put(actions.item.post.failure({
                message: error.message,
                status: error.status,
            }));
            yield put(notificationActions.send({
                content: 'A problem occured during sending algorithm',
                type: 'ERROR',
            }));
        }
        else throw error;
    }
}

export default function* algoSagas() {
    yield all([
        takeLatest(actionTypes.list.REQUEST, loadAlgosListSaga),
        takeLatest(actionTypes.item.post.REQUEST, postAlgoSaga),
    ]);
}
