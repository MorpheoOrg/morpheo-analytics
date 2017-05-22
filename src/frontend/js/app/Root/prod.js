import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
// support react-router v4
//import syncHistoryWithStore from '../../../lib/react-router-redux/sync';
//import ConnectedRouter from '../../../lib/react-router-redux/connectedRouter';
import {ConnectedRouter} from 'react-router-redux';

import Routes from '../routes';
import history from '../history/prod';

// For using browserHistory with amazon s3, we need our own domain name (for not impacting customer and record)
// and a custom routerHistory
// http://stackoverflow.com/questions/16267339/s3-static-website-hosting-route-all-paths-to-index-html

/*
 <RoutingRules>
 <RoutingRule>
 <Condition>
 <KeyPrefixEquals>ghost/</KeyPrefixEquals>
 <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
 </Condition>
 <Redirect>
 <Protocol>https</Protocol>
 <HostName>admin.rythm.co</HostName>
 <ReplaceKeyPrefixWith>ghost#</ReplaceKeyPrefixWith>
 </Redirect>
 </RoutingRule>
 </RoutingRules>
 */

const Root = ({store}) => {
    // handle custom listen override for replacing fragment url from s3
    const path = (/#(.*)$/.exec(history.location.hash) || [])[1];
    if (path) {
        history.replace(path);
    }

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Routes store={store} />
            </ConnectedRouter>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
};

export default Root;
