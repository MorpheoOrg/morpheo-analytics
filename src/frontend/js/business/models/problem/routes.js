/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

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
                    System.import('../algo/sagas'),
                    System.import('../learnuplet/sagas'),
                    System.import('../storage_problem/sagas'),
                ],
                reducers = [
                    System.import('./reducers'),
                    System.import('../algo/reducers'),
                    System.import('../learnuplet/reducers'),
                    System.import('../storage_problem/reducers'),
                ];

            return Promise.all([...sagas, ...reducers]).then((values) => {
                injectSaga('problem', values[0].default);
                injectSaga('algo', values[1].default);
                injectSaga('learnuplet', values[2].default);
                injectSaga('storage_problem', values[3].default);
                injectReducer('models.problem', values[4].default);
                injectReducer('models.algo', values[5].default);
                injectReducer('models.learnuplet', values[6].default);
                injectReducer('models.storage_problem', values[7].default);

                // Configure hot module replacement for the reducer
                if (process.env.NODE_ENV !== 'production') {
                    if (module.hot) {
                        module.hot.accept('./reducers', () => System.import('./reducers').then((module) => {
                            injectReducer('models.problem', module.default);
                        }));
                        module.hot.accept('../algo/reducers', () => System.import('../algo/reducers').then((module) => {
                            injectReducer('models.algo', module.default);
                        }));
                        module.hot.accept('../learnuplet/reducers', () => System.import('../learnuplet/reducers').then((module) => {
                            injectReducer('models.learnuplet', module.default);
                        }));
                        module.hot.accept('../storage_problem/reducers', () => System.import('../storage_problem/reducers').then((module) => {
                            injectReducer('models.storage_problem', module.default);
                        }));
                    }
                }

                return System.import(`${component_path}`);
            });
        },
        LoadingComponent: props => <div>Loading</div>,
    });

const List = createAsyncComponentWith('./components/list/index');
const Detail = createAsyncComponentWith('./components/detail/index');

export default props =>
    (<Switch>
        <Route exact path="/problem" component={List} />
        <Route exact path="/problem/:id" component={Detail} />
    </Switch>);
