import {all, call, put, select, takeLatest} from 'redux-saga/effects';

import learnupletActions from '../../learnuplet/actions';
import {getCredentials} from '../../../routes/home/components/Login/selectors';
import itSagaHelper from '../../../utils/testing/itSagaHelper';
import {FetchError} from '../../../utils/errors';
import generalActions from '../../../actions';
import notificationActions from '../../../routes/home/components/Notifications/actions';
import actions, {actionTypes} from '../actions';
import {fetchAlgos, postAlgo, postAlgoToOrchestrator} from '../api';
import algoSagas, {loadAlgosListSaga, postAlgoSaga} from '../sagas';


describe('loadAlgosListSaga', () => {
    const payload = 'problemid';
    const loadSaga = itSagaHelper(loadAlgosListSaga)({payload});

    it('should get algos and put success actions', () => {
        loadSaga.test((result) => {
            expect(result).toEqual(select(getCredentials));
            return ({
                ORCHESTRATOR_USER: 'orchestrator_user',
                ORCHESTRATOR_PASSWORD: 'orchestrator_password',
            });
        });

        const algos = [{uuid: 'uuid1'}, {uuid: 'uuid2'}];
        loadSaga.test((result) => {
            expect(result).toEqual(call(fetchAlgos, {
                user: 'orchestrator_user',
                password: 'orchestrator_password',
                parameters: {
                    problem: payload
                },
            }));
            return ({algos});
        });

        const loadSagaSuccessBranch = loadSaga.clone();
        algos.forEach(({uuid}, id) => loadSagaSuccessBranch.test((result) => {
            expect(result).toEqual(put(learnupletActions.list.request(
                uuid,
            )));
        }));

        loadSagaSuccessBranch.test((result) => {
            expect(result).toEqual(put(actions.list.success({
                list: {[payload]: algos},
            })));
            return ({algos});
        });

        expect(loadSagaSuccessBranch.isEnded()).toBe(true);
    });

    it('should manage FetchError and put failed actions', () => {
        // Error process branch
        const messageError = 'error message';
        const statusError = 404;
        const loadSagaFetchFailureBranch = loadSaga
            .clone(new FetchError(messageError, statusError));

        loadSagaFetchFailureBranch.test((result) => {
            expect(result).toEqual(put(generalActions.error.set(messageError)));
        });

        loadSagaFetchFailureBranch.test((result) => {
            expect(result).toEqual(put(actions.list.failure({
                message: messageError,
                status: statusError,
            })));
        });

        expect(() => loadSagaFetchFailureBranch.test()).not.toThrow();
        expect(loadSagaFetchFailureBranch.isEnded()).toBe(true);
    });

    it('should throw Error different from FetchError', () => {
        const loadSagaFetchFailureBranch = loadSaga
            .clone(new Error('this is an error'));

        // TODO: Change the code to have 100% coverage
        expect(() => loadSagaFetchFailureBranch.test())
            .toThrow('this is an error');
        expect(loadSagaFetchFailureBranch.isEnded()).toBe(true);
    });
});


describe('postAlgoSaga', () => {
    const payload = {body: 'body content', problemId: 'problemid'};
    const postSaga = itSagaHelper(postAlgoSaga)({payload});

    it('should post an algo and put success actions', () => {
        postSaga.test((result) => {
            expect(result).toEqual(select(getCredentials));
            return ({
                ORCHESTRATOR_USER: 'orchestrator_user',
                ORCHESTRATOR_PASSWORD: 'orchestrator_password',
                STORAGE_USER: 'storage_user',
                STORAGE_PASSWORD: 'storage_password',
            });
        });

        postSaga.test((result) => {
            expect(result).toEqual(call(postAlgo, {
                body: payload.body,
                user: 'storage_user',
                password: 'storage_password',
            }));
            return ({uuid: 'algo_uuid', name: 'algo_name'});
        });

        const postSagaSuccessBranch = postSaga.clone();
        postSagaSuccessBranch.test((result) => {
            expect(result).toEqual(call(postAlgoToOrchestrator, {
                body: {
                    uuid: 'algo_uuid',
                    name: 'algo_name',
                    problem: 'problemid',
                },
                user: 'orchestrator_user',
                password: 'orchestrator_password',
            }));
        });

        postSagaSuccessBranch.test((result) => {
            expect(result).toEqual(put(actions.item.post.success({
                uuid: 'algo_uuid',
                name: 'algo_name',
                problemId: 'problemid'
            })));
        });

        postSagaSuccessBranch.test((result) => {
            expect(result).toEqual(put(notificationActions.send({
                content: 'Algorithm sucessfully sent',
                type: 'SUCCESS',
            })));
        });

        expect(postSagaSuccessBranch.isEnded()).toBe(true);
    });

    it('should manage FetchError and put failed actions', () => {
        // Error process branch
        const messageError = 'error get message';
        const statusError = 201;
        const postSagaFailureBranch = postSaga
            .clone(new FetchError(messageError, statusError));

        postSagaFailureBranch.test((result) => {
            expect(result).toEqual(put(generalActions.error.set(messageError)));
        });

        postSagaFailureBranch.test((result) => {
            expect(result).toEqual(put(actions.item.post.failure({
                message: messageError,
                status: statusError,
            })));
        });

        postSagaFailureBranch.test((result) => {
            expect(result).toEqual(put(notificationActions.send({
                content: 'A problem occured during sending algorithm',
                type: 'ERROR',
            })));
        });

        expect(() => postSagaFailureBranch.test()).not.toThrow();
        expect(postSagaFailureBranch.isEnded()).toBe(true);
    });

    it('should throw Error different from FetchError', () => {
        const postSagaFailureBranch = postSaga
            .clone(new Error('this is an error'));

        expect(() => postSagaFailureBranch.test())
            .toThrow('this is an error');

        expect(postSagaFailureBranch.isEnded()).toBe(true);
    });
});


describe('algoSagas', () => {
    it('should pass the action to the corresponding saga', () => {
        const sagas = itSagaHelper(algoSagas)();
        sagas.test((result) => {
            expect(result).toEqual(all([
                takeLatest(actionTypes.list.REQUEST, loadAlgosListSaga),
                takeLatest(actionTypes.item.post.REQUEST, postAlgoSaga),
            ]));
        })
    });
});
