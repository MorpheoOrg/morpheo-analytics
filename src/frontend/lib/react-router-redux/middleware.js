/**
 * Created by guillaume on 3/17/17.
 */
import { CALL_HISTORY_METHOD } from 'react-router-redux'
import { LOCATION_CHANGE } from 'react-router-redux'

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 *
 * It also listens to history changes and dispatches LOCATION_CHANGE actions
 */
export default function routerMiddleware(history) {
    return ({ dispatch }) => {
        history.listen(payload => dispatch({
            type: LOCATION_CHANGE,
            payload
        }));
        return next => action => {
            if (action.type !== CALL_HISTORY_METHOD) {
                return next(action)
            }

            const { method, args } = action.payload
            history[method](...args)
        }
    }
}
