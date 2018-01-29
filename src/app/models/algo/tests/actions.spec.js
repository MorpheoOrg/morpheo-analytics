import actions, {actionTypes} from '../actions';


describe('models.algos.actions.list', () => {
    it('should create an action request', () => {
        const expectedAction = {
            type: actionTypes.list.REQUEST,
        };
        expect(actions.list.request()).toEqual(expectedAction);
    });

    it('should create an action success', () => {
        const payload = {
            list: {
                problem_id: [{
                    name: 'algo_name',
                    problem: 'problem_id',
                    timestamp_upload: 42,
                    uuid: 'algo_id',
                }],
            }
        };
        const expectedAction = {
            type: actionTypes.list.SUCCESS,
            payload,
        };
        expect(actions.list.success(payload)).toEqual(expectedAction);
    });

    it('should create an action failure', () => {
        const payload = {
            error: 'Error during loading.',
        };
        const expectedAction = {
            type: actionTypes.list.FAILURE,
            payload,
        };
        expect(actions.list.failure(payload)).toEqual(expectedAction);
    });

    it('should create an action reset', () => {
        const expectedAction = {
            type: actionTypes.list.RESET,
        };
        expect(actions.list.reset()).toEqual(expectedAction);
    });
});
