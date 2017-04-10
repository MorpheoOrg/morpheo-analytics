/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.config';


const handleError = (resolve, reject) =>
    (err, stats) => {

        if (err || stats.compilation.errors.length) {
            return reject(err ? err.stack : stats.compilation.errors);
        }

        console.log(stats.toString(webpackConfig.stats));
        return resolve();
    };


/**
 * Creates application bundles from the source files.
 */
function bundle() {
    return new Promise((resolve, reject) => {

        if (['development', 'debug'].includes(process.env.NODE_ENV)) { // add a watcher in debug mode for allowing breakpoint
            webpack(webpackConfig).watch(
                {  // watch options:
                    aggregateTimeout: 300, // wait so long for more changes
                    poll: true // use polling instead of native watchers
                    //pass a number to set the polling interval
                }, handleError(resolve, reject));
        }
        else {
            webpack(webpackConfig).run(handleError(resolve, reject));
        }
    });
}

export default bundle;
