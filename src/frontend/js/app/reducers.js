import {routerReducer} from 'react-router-redux';

import rootReducer from '../reducers';


export default {
    routing: routerReducer,
    ...rootReducer,
};
