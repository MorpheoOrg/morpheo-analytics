import {Route, Switch} from 'react-router';
import React from 'react';

import {asyncComponent} from 'react-async-component';

const AsyncSignIn = asyncComponent({resolve: () => System.import('./components/SignIn'), LoadingComponent: (props) => <div>Loading</div>});
const AsyncSignUp = asyncComponent({resolve: () => System.import('./components/SignUp'), LoadingComponent: (props) => <div>Loading</div>});
const AsyncVerification = asyncComponent({resolve: () => System.import('./components/Verification'), LoadingComponent: (props) => <div>Loading</div>});

export default props => <Switch>
    <Route exact path="/sign-in" component={AsyncSignIn} />
    <Route exact path="/sign-up" component={AsyncSignUp} />
    <Route exact path="/verify/:key" component={AsyncVerification} />
</Switch>;
