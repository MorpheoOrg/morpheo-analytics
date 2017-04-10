import {injectReducer} from 'redux-injector';
import {injectSaga} from 'redux-sagas-injector';

import {Route, Switch} from 'react-router';
import React from 'react';

import {asyncComponent} from 'react-async-component';


const createAsyncComponentWith = component_path =>
    asyncComponent({
        resolve: () => {
            const sagas = [
                    System.import('./sagas'),
                    System.import('../trial/sagas'),
                    System.import('../algo/sagas'),
                    System.import('../learnuplet/sagas'),
                ],
                reducers = [
                    System.import('./reducers'),
                    System.import('../trial/reducers'),
                    System.import('../algo/reducers'),
                    System.import('../learnuplet/reducers'),
                ];

            return Promise.all([...sagas, ...reducers]).then((values) => {
                injectSaga('experiment', values[0].default);
                injectSaga('trial', values[1].default);
                injectSaga('algo', values[2].default);
                injectSaga('learnuplet', values[3].default);
                injectReducer('models.experiment', values[4].default);
                injectReducer('models.trial', values[5].default);
                injectReducer('models.algo', values[6].default);
                injectReducer('models.learnuplet', values[7].default);

                // Configure hot module replacement for the reducer
                if (process.env.NODE_ENV !== 'production') {
                    if (module.hot) {
                        module.hot.accept('./reducers', () => System.import('./reducers').then((module) => {
                            injectReducer('models.experiment', module.default);
                        }));
                        module.hot.accept('../trial/reducers', () => System.import('../trial/reducers').then((module) => {
                            injectReducer('models.trial', module.default);
                        }));
                        module.hot.accept('../algo/reducers', () => System.import('../algo/reducers').then((module) => {
                            injectReducer('models.algo', module.default);
                        }));
                        module.hot.accept('../learnuplet/reducers', () => System.import('../learnuplet/reducers').then((module) => {
                            injectReducer('models.learnuplet', module.default);
                        }));
                    }
                }

                return System.import(`${component_path}`);
            });
        },
        LoadingComponent: (props) => <div>Loading</div>
    });

const AsyncComponent = createAsyncComponentWith('./components/list/index');

const AsyncComponentDetail = createAsyncComponentWith('./components/detail/index');

const AsyncComponentDashboard = createAsyncComponentWith('./components/dashboard/index');


export default props =>
    <Switch>
        <Route exact path="/experiments" component={AsyncComponent} />
        <Route exact path="/experiments/:id" component={AsyncComponentDetail} />
        <Route path="/experiments/:id/dashboard" component={AsyncComponentDashboard} />
    </Switch>;
