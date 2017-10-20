import {call, put, takeLatest, takeEvery, all} from 'redux-saga/effects';
import path from 'path';
import hfc from 'fabric-client';

import generalActions from '../../../../../../common/actions';
import storageProblemActions from '../../storage_problem/actions';

import actions, {actionTypes} from '../actions';
import {
    fetchProblems as fetchProblemsApi,
    fetchProblem as fetchProblemApi,
} from '../api';

let client,
channel;

const options = {
    wallet_path: path.join(__dirname, './creds'),
    user_id: 'PeerAdmin',
    channel_id: 'myc',
    chaincode_id: 'mycc',
    network_url: 'grpc://localhost:7051',
};

export const loadList = (actions, fetchList, query) =>
    function* loadListSaga() {

        console.log('Create a client and set the wallet location');
        client = new hfc();
        const wallet = yield call(hfc.newDefaultKeyValueStore, {path: options.wallet_path});

        console.log('Set wallet path, and associate user ', options.user_id, ' with application');
        client.setStateStore(wallet);

        const user = yield call(client.getUserContext.bind(client), options.user_id, true);
        console.log('Check user is enrolled, and set a query URL in the network');
        if (!user || (user && user.isEnrolled() === false)) {
            console.error('User not defined, or not enrolled - error');
        }
        else {
            channel = client.newChannel(options.channel_id);
            channel.addPeer(client.newPeer(options.network_url));

            console.log('Make query');
            const transaction_id = client.newTransactionID();
            console.log('Assigning transaction_id: ', transaction_id._transaction_id);

            const request = {
                chaincodeId: options.chaincode_id,
                txId: transaction_id,
                fcn: 'queryProblems',
                args: [''],
            };
            const query_responses = yield call(channel.queryByChaincode, request);

            console.log('returned from query');
            if (!query_responses.length) {
                console.log('No payloads were returned from query');
            } else {
                console.log('Query result count = ', query_responses.length);
            }
            if (query_responses[0] instanceof Error) {
                const error = query_responses[0];
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
                console.log('Response is ', query_responses[0].toString());

                const results = query_responses[0];
                yield put(actions.list.success({results}));
                const l = results.length;
                // load item from storage
                for (let i = 0; i < l; i += 1) {
                    yield put(storageProblemActions.item.get.request(
                        results[i].workflow,
                    ));
                }
            }
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
