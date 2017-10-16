import {call, put, select, takeLatest, takeEvery, all} from 'redux-saga/effects';
import generalActions from '../../../../../common/actions';
import storageProblemActions from '../storage_problem/actions';

import actions, {actionTypes} from './actions';
import {
    fetchAlgos as fetchAlgosApi,
    fetchProblem as fetchProblemApi,
} from './api';


export const loadList = (actions, fetchList) =>
    function* loadListSaga(request) {
        const state = yield select(),
            location = state.location;

        // TODO Update payload to send query REST
        console.log('request', request);

        // override query if needed, default to current url query
        const query = undefined;
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
            yield put(actions.list.success({results: list.algos}));

            // Let's fetch algos results from storage
            // const l = list.algos.length;
            // for (let i = 0; i < 1; i += 1) {
            //     yield put()
            // }
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
