import {call, put, select, takeLatest, takeEvery, all} from 'redux-saga/effects';
import generalActions from '../../../../../common/actions';
import storageProblemActions from '../storage_problem/actions';

import actions, {actionTypes} from './actions';
import {
    fetchAlgos as fetchAlgosApi,
    fetchProblem as fetchProblemApi,
} from './api';
import {getLoginVariables} from '../../ui/Login/selectors';


export const loadList = (actions, fetchList) =>
    function* loadListSaga(request) {
        const {
            ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
        } = yield select(getLoginVariables);

        // override query if needed, default to current url query
        const query = undefined;
        const {error, list} = yield call(
            fetchList, query, ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
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
            yield put(actions.list.success({results: list.algos}));

            return list;
        }
    };


export const loadItem = (actions, fetchItem, query) =>
    function* loadItemSaga(request) {
        const {
            ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
        } = yield select(getLoginVariables);
        const {error, item} = yield call(
            fetchItem, request.payload, ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
        );

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
            yield put(storageProblemActions.item.get.request(item.workflow));

            return item;
        }
    };

/* istanbul ignore next */
const experimentSagas = function* experimentSagas() {
    yield all([
        takeLatest(
            actionTypes.list.REQUEST,
            loadList(actions, fetchAlgosApi),
        ),
        takeEvery(
            actionTypes.item.get.REQUEST,
            loadItem(actions, fetchProblemApi),
        ),
    ]);
};


export default experimentSagas;
