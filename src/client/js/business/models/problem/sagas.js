import {
    all, call, put, select, takeEvery, takeLatest,
} from 'redux-saga/effects';
import generalActions from '../../../../../common/actions';
import storageProblemActions from '../storage_problem/actions';

import actions, {actionTypes} from './actions';
import {
    fetchProblems as fetchProblemsApi,
    fetchProblem as fetchProblemApi,
} from './api';
import {getLoginVariables} from '../../ui/Login/selectors';


export const loadList = (actions, fetchList) =>
    function* loadListSaga() {
        const {
            ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD
        } = yield select(getLoginVariables);

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
                    list.problems[i].workflow,
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
            yield put(storageProblemActions.item.get.request(item.workflow));

            return item;
        }
    };

/* istanbul ignore next */
const challengeSagas = function* challengeSagas() {
    yield all([
        takeLatest(actionTypes.list.REQUEST, loadList(actions, fetchProblemsApi)),
        takeEvery(actionTypes.item.get.REQUEST, loadItem(actions, fetchProblemApi)),
    ]);
};


export default challengeSagas;
