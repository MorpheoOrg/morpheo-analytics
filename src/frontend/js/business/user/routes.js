import {Route, Switch} from 'react-router';
import React from 'react';

import {asyncComponent} from 'react-async-component';

const AsyncSignIn = asyncComponent({
    resolve: () => System.import('./components/SignIn'),
    LoadingComponent: props => <div>Loading</div>});


export default props => (<Switch>
    <Route exact path="/sign-in" component={AsyncSignIn} />
</Switch>);
