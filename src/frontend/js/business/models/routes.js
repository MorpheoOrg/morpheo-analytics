import {Route, Redirect} from 'react-router';
import React, {PropTypes} from 'react';

import {asyncComponent} from 'react-async-component';

const AsyncHelp = asyncComponent({resolve: () => System.import('./help'), LoadingComponent: (props) => <div>Loading</div>});
const ExperimentRoutes = asyncComponent({resolve: () => System.import('./experiment/routes')});

const RedirectRoute = ({component}) =>
    <Route
        render={props => props.location.pathname === '/' ?
            <Redirect to={{pathname: '/experiments'}}/> :
            React.createElement(component, props)}
    />;

RedirectRoute.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};

RedirectRoute.defaultProps = {
    location: null,
};

// automatically redirect to models pokemon if we signed in and redirection has not been made
export default props =>
    <div className="models">
        <RedirectRoute component={ExperimentRoutes}/>
        <Route path="/help" component={AsyncHelp}/>
    </div>;
