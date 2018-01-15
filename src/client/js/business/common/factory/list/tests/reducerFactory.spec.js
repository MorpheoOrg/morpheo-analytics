import reducerFactory from '../reducerFactory';
import {actionsFactory, actionsTypesFactory} from '../actions';


const actionsTypes = actionsTypesFactory('list');
const actions = actionsFactory(actionsTypes);

describe('common.reducer.list', () => {
    const reducer = reducerFactory(actionsTypes);
    const complexState = {
        init: true,
        error: null,
        loading: false,
        results: {
            id1: [
                {
                    name: 'name 1',
                    problem: 'problem id 1',
                    timestamp_upload: 1,
                    uuid: 'id 1',
                },
                {
                    name: 'name 2',
                    problem: 'problem id 2',
                    timestamp_upload: 2,
                    uuid: 'id 2',
                },
            ],
            id2: [
                {
                    name: 'name 3',
                    problem: 'problem id 3',
                    timestamp_upload: 3,
                    uuid: 'id 3',
                },
                {
                    name: 'name 4',
                    problem: 'problem id 4',
                    timestamp_upload: 4,
                    uuid: 'id 4',
                },
            ],
        },
    };

    it('should return initial state for empty state without action', () => {
        expect(reducer(undefined, {})).toEqual({
            init: false,
            loading: false,
            error: null,
            results: {},
        });
    });

    it('should set loading to true for a request action', () => {
        const previousState = {
            ...complexState,
            loading: false,
        };
        const requestListAction = actions.request({
            id: 'identifier'
        });
        expect(reducer(previousState, requestListAction)).toEqual({
            ...complexState,
            loading: true,
        });
    });

    it('should return the initialState for a reset action', () => {
        const previousState = {
            ...complexState,
            loading: false,
        };
        const requestListAction = {
            type: actionsTypes.reset,
        };
        expect(reducer(previousState, requestListAction)).toEqual({
            init: false,
            loading: false,
            error: null,
            results: {},
        });
    });

    it('should merge the list of content into results for a success action',
        () => {
            const previousState = {
                ...complexState,
                init: false,
                loading: true,
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
            const sucessListAction = actions.success(algos);
            expect(reducer(previousState, sucessListAction)).toEqual({
                ...previousState,
                init: true,
                error: null,
                loading: false,
                results: {
                    ...complexState.results,
                    ...algos.list,
                },
            });
        });

    it('should set the error for a failure actions', () => {
        const previousState = complexState;
        const error = {message: 'error'};
        expect(reducer(previousState, actions.failure({error}))).toEqual({
            ...complexState,
            error,
        });
    });
});
