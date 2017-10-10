import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import queryString from 'query-string';
import generalActions from '../../../../../common/actions';
import storageProblemActions from '../storage_problem/actions';

import actions, {actionTypes} from './actions';
import {
    fetchAlgos as fetchAlgosApi,
    fetchProblem as fetchProblemApi,
} from './api';


export const loadList = (actions, fetchList, q) =>
    function* loadListSaga() {
        const state = yield select(),
            location = state.location;

        // override query if needed, default to current url query
        const query = q || (location && location.search ? queryString.parse(location.search) : {});
        const {error, list} = yield call(fetchList, query);
        console.log('sagas: ', error, list);

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
            yield put(actions.list.success({results: list.problems}));

            // Let's fetch description problem from storage
            const l = list.problems.length;
            for (let i = 0; i < l; i += 1) {
                yield put(storageProblemActions.item.get.request(list.problems[i].workflow));
            }

            return list;
        }
    };


export const loadItem = (actions, fetchItem, query) =>
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
    yield [
        takeLatest(actionTypes.list.REQUEST, loadList(actions, fetchAlgosApi)),
        takeEvery(actionTypes.item.get.REQUEST, loadItem(actions, fetchProblemApi)),
    ];
};


export default challengeSagas;
