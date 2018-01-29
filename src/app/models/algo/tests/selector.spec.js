import {getError} from '../selector';


describe('models.algo.selector', () => {
    const generateErrorState = error => ({
        models: {
            algo: {
                item: {
                    error
                }
            }
        }
    });

    it('should return null if no error is throwed', () => {
        const error = null;
        expect(getError(generateErrorState(error))).toEqual(null);
    });

    it('should return the error message if an error is throwed', () => {
        const error = {message: 'error message'};
        expect(getError(generateErrorState(error))).toEqual(error);
    });
});
