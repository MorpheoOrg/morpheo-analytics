import {actionsFactory, actionsTypesFactory} from '../actions';


describe('actionsTypesFactory', () => {
    const actionsTypes = actionsTypesFactory('list');

    it('should generate actionsTypes when we give a prefix', () => {
        expect(actionsTypes).toEqual({
            request: 'list::REQUEST',
            success: 'list::SUCCESS',
            failure: 'list::FAILURE',
            reset: 'list::RESET',
            update: 'list::UPDATE',
        });
    });
});

describe('actionsFactory', () => {
    const actionsTypes = actionsTypesFactory('list');
    const actions = actionsFactory(actionsTypes);

    it('should generate an object containing the neecessary actions', () => {
        expect(typeof actions).toBe('object');
        expect(Object.keys(actions)).toEqual([
            'request', 'success', 'failure', 'reset', 'update',
        ]);
    });
});
