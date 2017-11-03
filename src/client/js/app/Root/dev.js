import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

import Routes from '../../../../common/routes';

const Root = ({store}) =>
    (<Provider store={store}>
        <div>
            <Routes/>
        </div>
    </Provider>);

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Root;
