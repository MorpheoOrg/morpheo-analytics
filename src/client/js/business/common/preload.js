import {reloadSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-injector';

import Konami from './components/Konami';

export sagas from '../kernel/sagas';
export reducers from '../kernel/reducer';


// Configure hot module replacement for the reducer
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('../kernel/reducer', () => {
            const reducer = require('../kernel/reducer').default;
            injectReducer('kernel', reducer(localStorage), true);
        });
        module.hot.accept('../kernel/sagas', () => {
            reloadSaga('kernel', require('../kernel/sagas').default);
        });
    }
}

export default Konami;
