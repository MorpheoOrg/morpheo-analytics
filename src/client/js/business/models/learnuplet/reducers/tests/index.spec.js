import {combineReducers} from 'redux';

import actions from '../../actions';
import reducers from '../index';


describe('learnuplet.reducer', () => {
    const learnupletReducer = combineReducers(reducers);
    const complexState = {
        list: {
            init: true,
            loading: false,
            error: null,
            results: {
                id1: [
                    {
                        name: 'learnuplet name 1',
                        problem: 'problem id 1',
                        timestamp_upload: 1,
                        uuid: 'learnuplet id 1',
                    },
                    {
                        name: 'learnuplet name 2',
                        problem: 'problem id 2',
                        timestamp_upload: 2,
                        uuid: 'learnuplet id 2',
                    },
                ],
                id2: [
                    {
                        name: 'learnuplet name 3',
                        problem: 'problem id 3',
                        timestamp_upload: 3,
                        uuid: 'learnuplet id 3',
                    },
                    {
                        name: 'learnuplet name 4',
                        problem: 'problem id 4',
                        timestamp_upload: 4,
                        uuid: 'learnuplet id 4',
                    },
                ],
            },
        },
    };

    it('should return initial state for empty state without actions', () => {
        expect(learnupletReducer(undefined, {})).toEqual({
            list: {
                init: false,
                loading: false,
                error: null,
                results: {},
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
        const requestListAction = actions.list.request({
            id: 'algo_id',
        });
        expect(learnupletReducer(previousState, requestListAction)).toEqual({
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
        expect(learnupletReducer(previousState, requestListAction)).toEqual({
            ...complexState,
            list: {
                ...complexState.list,
                loading: true,
            }
        });
    });

    it('should add the learnuplet list into results for a success actions', () => {
        const previousState = {
            ...complexState,
            list: {
                ...complexState.list,
                init: false,
                loading: true,
            }
        };
        const learnuplets = {
            list: {
                id1: [
                    {
                        name: 'learnuplet name 5',
                        problem: 'problem id 5',
                        timestamp_upload: 5,
                        uuid: 'learnuplet id 5',
                    },
                    {
                        name: 'learnuplet name 6',
                        problem: 'problem id 6',
                        timestamp_upload: 6,
                        uuid: 'learnuplet id 6',
                    },
                ],
                id3: [
                    {
                        name: 'learnuplet name 7',
                        problem: 'problem id 7',
                        timestamp_upload: 7,
                        uuid: 'learnuplet id 7',
                    },
                    {
                        name: 'learnuplet name 8',
                        problem: 'problem id 8',
                        timestamp_upload: 8,
                        uuid: 'learnuplet id 8',
                    },
                ],
            }
        };
        const sucessListAction = actions.list.success(learnuplets);
        expect(learnupletReducer(previousState, sucessListAction)).toEqual({
            ...previousState,
            list: {
                ...previousState.list,
                init: true,
                error: null,
                loading: false,
                results: {
                    ...complexState.list.results,
                    ...learnuplets.list,
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
        expect(learnupletReducer(previousState, requestListAction)).toEqual({
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
        const failureListAction = actions.list.failure({error});
        expect(learnupletReducer(previousState, failureListAction)).toEqual({
            ...complexState,
            list: {
                ...complexState.list,
                error,
            }
        });
    });
});
