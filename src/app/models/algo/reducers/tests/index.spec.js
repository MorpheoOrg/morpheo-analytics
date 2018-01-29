import {combineReducers} from 'redux';

import actions from '../../actions';
import reducers from '../index';


describe('algo.reducer', () => {
    const algoReducer = combineReducers(reducers);
    const complexState = {
        list: {
            init: true,
            error: null,
            loading: false,
            results: {
                id1: [
                    {
                        name: 'algo name 1',
                        problem: 'problem id 1',
                        timestamp_upload: 1,
                        uuid: 'algo id 1',
                    },
                    {
                        name: 'algo name 2',
                        problem: 'problem id 2',
                        timestamp_upload: 2,
                        uuid: 'algo id 2',
                    },
                ],
                id2: [
                    {
                        name: 'algo name 3',
                        problem: 'problem id 3',
                        timestamp_upload: 3,
                        uuid: 'algo id 3',
                    },
                    {
                        name: 'algo name 4',
                        problem: 'problem id 4',
                        timestamp_upload: 4,
                        uuid: 'algo id 4',
                    },
                ],
            },
        },
    };

    it('should return initial state for empty state without actions', () => {
        expect(algoReducer(undefined, {})).toEqual({
            list: {
                init: false,
                results: {},
                error: null,
                loading: false,
            },
        });
    });

    it('should set loading to true for a load list request actions', () => {
        const previousState = {
            ...complexState,
            list: {
                ...complexState.list,
                loading: false,
            }
        };
        const requestListAction = actions.list.request();
        expect(algoReducer(previousState, requestListAction)).toEqual({
            ...complexState,
            list: {
                ...complexState.list,
                loading: true,
            }
        });
    });

    it('should set loading to true for a load list reset actions', () => {
        const previousState = {
            ...complexState,
            list: {
                ...complexState.list,
                loading: false,
            }
        };
        const requestListAction = actions.list.reset();
        expect(algoReducer(previousState, requestListAction)).toEqual({
            ...complexState,
            list: {
                ...complexState.list,
                loading: true,
            }
        });
    });

    it('should add the algo list into results for a success actions', () => {
        const previousState = {
            ...complexState,
            list: {
                ...complexState.list,
                init: false,
                loading: true,
            }
        };
        const algos = {
            list: {
                id1: [
                    {
                        name: 'algo name 5',
                        problem: 'problem id 5',
                        timestamp_upload: 5,
                        uuid: 'algo id 5',
                    },
                    {
                        name: 'algo name 6',
                        problem: 'problem id 6',
                        timestamp_upload: 6,
                        uuid: 'algo id 6',
                    },
                ],
                id3: [
                    {
                        name: 'algo name 7',
                        problem: 'problem id 7',
                        timestamp_upload: 7,
                        uuid: 'algo id 7',
                    },
                    {
                        name: 'algo name 8',
                        problem: 'problem id 8',
                        timestamp_upload: 8,
                        uuid: 'algo id 8',
                    },
                ],
            }
        };
        const sucessListAction = actions.list.success(algos);
        expect(algoReducer(previousState, sucessListAction)).toEqual({
            ...previousState,
            list: {
                ...previousState.list,
                init: true,
                error: null,
                loading: false,
                results: {
                    ...complexState.list.results,
                    ...algos.list,
                },
            },
        });
    });

    it('should set loading to true for a load list reset actions', () => {
        const previousState = {
            ...complexState,
            list: {
                ...complexState.list,
                loading: false,
            }
        };
        const requestListAction = actions.list.reset();
        expect(algoReducer(previousState, requestListAction)).toEqual({
            ...complexState,
            list: {
                ...complexState.list,
                loading: true,
            }
        });
    });

    it('should set the error for a list failure actions', () => {
        const previousState = complexState;
        const error = {message: 'error'};
        const failureListAction = actions.list.failure(error);
        expect(algoReducer(previousState, failureListAction)).toEqual({
            ...complexState,
            list: {
                ...complexState.list,
                error,
            }
        });
    });
});
