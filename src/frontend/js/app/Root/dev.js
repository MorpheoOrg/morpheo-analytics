import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

// support react-router v4
//import syncHistoryWithStore from '../../../lib/react-router-redux/sync';
//import ConnectedRouter from '../../../lib/react-router-redux/connectedRouter';
import {ConnectedRouter} from 'react-router-redux';

import DevTools from '../DevTools';

import Routes from '../routes';
import history from '../history/dev';

const Root = ({store, ...props}) =>
    <Provider store={store}>
        <div>
            <ConnectedRouter history={history}>
                <Routes store={store}/>
            </ConnectedRouter>
            <DevTools />
        </div>
    </Provider>;

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Root;
