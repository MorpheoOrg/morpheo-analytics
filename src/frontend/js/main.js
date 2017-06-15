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

/* globals document */

import 'babel-core/register';
import 'babel-polyfill';

import FastClick from 'fastclick';
import React from 'react';
import {render} from 'react-dom';
import {createRenderer} from 'fela';
import {Provider as FelaProvider} from 'react-fela';
import {AsyncComponentProvider} from 'react-async-component';
import injectTapEventPlugin from 'react-tap-event-plugin';

import ReactHotLoader from './ReactHotLoader';
import Root from './app/Root/index';
import configureStore from './app/configureStore/index';

const store = configureStore();

FastClick.attach(document.body);
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const root = document.getElementById('root');
const renderer = createRenderer();
const mountNode = document.getElementById('stylesheet');

const renderApp = (RootElement) => {
    const app = (<ReactHotLoader key={Math.random()}>
        <AsyncComponentProvider>
            <FelaProvider renderer={renderer} mountNode={mountNode}>
                <RootElement {...{store}} />
            </FelaProvider>
        </AsyncComponentProvider>
    </ReactHotLoader>);

    render(app, root);
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./app/Root/index', () =>
        System.import('./app/Root/index').then(module => renderApp(module.default)),
    );
}

renderApp(Root);
