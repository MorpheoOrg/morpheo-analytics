import {
    all, call, put, select, takeEvery, takeLatest,
} from 'redux-saga/effects';
import generalActions from '../../actions';
import storageProblemActions from '../storage_problem/actions';

import actions, {actionTypes} from './actions';
import {
    fetchProblems as fetchProblemsApi,
    fetchProblem as fetchProblemApi,
} from './api';
import {getCredentials} from '../../routes/home/components/Login/selectors';
import {getProblems, getToken} from '../ledger/api';
import {FetchError} from '../../utils/errors';


export function* loadList() {
    try {
        const {token} = yield call(getToken);
        const {channelName, chaincodeName, peer} = yield select(getCredentials);

        const problems = yield call(getProblems, {
            channelName, chaincodeName, peer, token,
        });

        for (let i = 0; i < problems.length; i += 1) {
            yield put(storageProblemActions.item.get.request(
                problems[i].storageAddress,
            ));
        }

        yield put(actions.list.success({results: problems}));
    }
    catch (error) {
        if (error instanceof FetchError) {
            yield put(actions.list.failure({
                error: {
                    message: error.message,
                    status: error.status,
                }
            }));
        }
        else throw error;
    }
}

export const loadList1 = (actions, fetchList) =>
    function* loadListSaga() {
        const {
            ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
        } = yield select(getCredentials);

        const {error, list} = yield call(
            fetchList, ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD,
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
            // Let's fetch description problem from storage
            const l = list.problems.length;
            for (let i = 0; i < l; i += 1) {
                yield put(storageProblemActions.item.get.request(
                    list.problems[i].storageAddress,
                ));
            }

            yield put(actions.list.success({results: list.problems}));

            return list;
        }
    };


export const loadItem = (actions, fetchItem) =>
    function* loadItemSaga(request) {
        const {error, item} = yield call(fetchItem, request.payload);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.item.get.failure(error.body));
        }
        else {
            yield put(actions.item.get.success(item));

            // load storage problem too
            yield put(storageProblemActions.item.get.request(item.storageAddress));

            return item;
        }
    };

/* istanbul ignore next */
const challengeSagas = function* challengeSagas() {
    yield all([
        takeLatest(actionTypes.list.REQUEST, loadList),
        takeEvery(actionTypes.item.get.REQUEST, loadItem(actions, fetchProblemApi)),
    ]);
};


export default challengeSagas;
