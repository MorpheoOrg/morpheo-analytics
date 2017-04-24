/* globals document */

import {createStore, applyMiddleware} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger'
import App from './components/App';
import reducer from './reducers';
import {addCell, connectKernel} from './actions';


const middleware = [thunk];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpsb3RlbiJ9.6kZ-0Y96-gAzrOXzqH91F9WAgAAFXpRaayVifYjuEv4';


const store = createStore(
  reducer,
  applyMiddleware(...middleware),
  // pesisted_state
);

store.dispatch(addCell());
store.dispatch(connectKernel('127.0.0.1', '8080', jwt));

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
