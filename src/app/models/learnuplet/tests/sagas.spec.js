import {all, call, put, select, takeEvery} from 'redux-saga/effects';

import itSagaHelper from '../../../utils/testing/itSagaHelper';
import {getCredentials} from '../../../routes/home/components/Login/selectors';
import {FetchError} from '../../../utils/errors';

import actions, {actionTypes} from '../actions';
import {fetchLearnupletByAlgo} from '../api';
import learnupletSagas, {loadLearnupletList} from '../sagas';


describe('loadLearnupletList', () => {
    const payload = 'algoID';
    const loadSaga = itSagaHelper(loadLearnupletList)({payload});

    it('should get learnuplet and put success actions', () => {
        loadSaga.test((result) => {
            expect(result).toEqual(select(getCredentials));
            return ({
                ORCHESTRATOR_USER: 'orchestrator_user',
                ORCHESTRATOR_PASSWORD: 'orchestrator_password',
            });
        });

        const learnuplets = [{uuid: 'uuid1'}, {uuid: 'uuid2'}]
        loadSaga.test((result) => {
            expect(result).toEqual(call(fetchLearnupletByAlgo, {
                user: 'orchestrator_user',
                password: 'orchestrator_password',
                parameters: {
                    algo: payload
                },
            }));
            return ({learnuplets});
        });

        const loadSagaSuccessBranch = loadSaga.clone();
        loadSagaSuccessBranch.test((result) => {
            expect(result).toEqual(put(actions.list.success({
                list: {
                    [payload]: learnuplets,
                }
            })));
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
            expect(result).toEqual(put(actions.list.failure({
                error: {
                    message: messageError,
                    status: statusError,
                },
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


describe('learnupletSagas', () => {
    it('should pass the action to the corresponding saga', () => {
        const sagas = itSagaHelper(learnupletSagas)();
        sagas.test((result) => {
            expect(result).toEqual(all([
                takeEvery(actionTypes.list.request, loadLearnupletList),
            ]));
        })
    });
});
