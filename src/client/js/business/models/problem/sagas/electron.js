import {call, put, takeLatest, takeEvery, all} from 'redux-saga/effects';
import hfc from 'fabric-client';

import generalActions from '../../../../../../common/actions';
import storageProblemActions from '../../storage_problem/actions';

import actions, {actionTypes} from '../actions';
import {
    fetchProblems as fetchProblemsApi,
    fetchProblem as fetchProblemApi,
} from '../api';

import {getChannelForOrg, getClientForOrg, buildTarget, getKeyStoreForOrg, getOrgName} from '../../../../grpc/helper';

function* queryByChaincode(payload) {
    const org = hfc.getConfigSetting('org'),
        peer = hfc.getConfigSetting('peer'),
        chaincodeId = hfc.getConfigSetting('chainCodeId'),
        user_id = hfc.getConfigSetting('user_id');

    const channel = getChannelForOrg(org);
    const client = getClientForOrg(org);
    const target = buildTarget(peer, org);

    const store = yield call(hfc.newDefaultKeyValueStore, {path: getKeyStoreForOrg(getOrgName(org))});
    client.setStateStore(store);
    // clearing the user context before switching
    client._userContext = null;
    const user = yield call(client.getUserContext.bind(client), user_id, true);

    if (user) {
        // TODO enroll user if not enrolled
        if (!user.isEnrolled()) {

        }

        const txId = client.newTransactionID();
        // send query
        const request = {
            chaincodeId,
            txId,
            fcn: payload.fcn,
            args: payload.args,
        };

        const res = yield call(channel.queryByChaincode.bind(channel), request, target);

        if (!res.length) {
            console.log('No payloads were returned from query');
        }

        if (res[0] instanceof Error) {
            return {error: res[0]};
        }

        return {res};
    }
    else {
        return {error: 'No user'};
    }
}

export const loadList = (actions, fetchList, query) =>
    function* loadListSaga() {

        const {res, error} = yield call(queryByChaincode, {fcn: 'queryProblems', args: ['']});

        if (error) {
            console.error('error from query = ', error);
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.list.failure(error.body));
        }
        else {
            // adapt to web code
            const list = JSON.parse(res[0].toString()).map(o => JSON.parse(o.toString())).map(o => {
                const arr = o.storage_address.split('/');
                return {
                    ...o,
                    workflow: arr[arr.length - 1]
                };
            });

            // Let's fetch description problem from storage
            const l = list.length;
            for (let i = 0; i < l; i += 1) {
                yield put(storageProblemActions.item.get.request(
                    list[i].workflow,
                ));
            }

            yield put(actions.list.success({results: list}));
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
    yield all([
        takeLatest(actionTypes.list.REQUEST, loadList(actions, fetchProblemsApi)),
        takeEvery(actionTypes.item.get.REQUEST, loadItem(actions, fetchProblemApi)),
    ]);
};


export default challengeSagas;
