import Konami from './components/index';

import {reloadSaga} from 'redux-sagas-injector';
import {injectReducer} from 'redux-reducers-injector';

export sagas from './sagas';
export reducer from './reducer';


// Configure hot module replacement for the reducer
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            const reducer = require('./reducer').default;
            injectReducer('kernel', reducer(localStorage), true);
        });
        module.hot.accept('./sagas', () => {
            reloadSaga('kernel', require('./sagas').default);
        });
    }
}

export default Konami;
