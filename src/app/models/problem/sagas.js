import {all, call, put, select, takeLatest} from 'redux-saga/effects';

import actions, {actionTypes} from './actions';
import storageProblemActions from '../storage_problem/actions';
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

export default function* challengeSagas() {
    yield all([
        takeLatest(actionTypes.list.REQUEST, loadList),
    ]);
}
