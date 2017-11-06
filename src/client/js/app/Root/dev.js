import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

import DevTools from '../../../../common/DevTools';
import Routes from '../../../../common/routes';


const Root = ({store}) => (
    <Provider store={store}>
        <div>
            <Routes />
            <DevTools />
        </div>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Root;
