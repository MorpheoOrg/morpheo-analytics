import {actionTypes as algoActionTypes} from '../../algo/actions';
import {actionTypes as trialActionTypes} from '../../trial/actions';

const initialState = {
    error: null,
    id: null,
    results: {},
    loading: false,
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.item.SET:
            return {
                ...state,
                id: payload,
            };
        case actionTypes.item.get.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.item.get.SUCCESS:

            return {
                ...state,
                results: {
                    ...state.results,
                    ...payload,
                },
                loading: false,
            };
        case actionTypes.item.delete.SUCCESS:
            return {
                ...state,
                id: null,
            };
        case actionTypes.item.get.FAILURE:
        case actionTypes.item.create.FAILURE:
        case actionTypes.item.update.FAILURE:
        case actionTypes.item.delete.FAILURE:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case actionTypes.modal.create.SET:
        case actionTypes.modal.update.SET:
            return {
                ...state,
                error: null,
            };


        // update counts
        case algoActionTypes.item.create.SUCCESS:
            return {
                ...state,
                results: Object.keys(state.results).reduce((previous, current) =>({
                    ...previous,
                    [current]: payload.experiment === current ? {
                        ...state.results[current],
                        algo_count: state.results[current].algo_count + 1,
                    } : state.results[current],
                }), {}),
            };

        case trialActionTypes.item.create.SUCCESS:
            return {
                ...state,
                results: Object.keys(state.results).reduce((previous, current) =>({
                    ...previous,
                    [current]: payload.experiment === current ? {
                        ...state.results[current],
                        trial_count: state.results[current].trial_count + 1,
                    } : state.results[current],
                }), {}),
            };


        // TODO find a way to decrement algo_count and trial_count on delete of algos and trial (-> modify payload)
        // case algoActionTypes.item.delete.SUCCESS:
        //     return {
        //         ...state,
        //         results: Object.keys(state.results).reduce((previous, current) =>({
        //             ...previous,
        //             [current]: payload.experiment === current ? {
        //                 ...state.results[current],
        //                 algo_count: state.results[current].algo_count - 1,
        //             } : state.results[current],
        //         })),
        //     };

        default:
            return state;
        }
    };

