import webpack from 'webpack';
import config from 'config';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.babel';

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
    await new Promise((resolve) => {
        // Patch the client-side bundle configurations
        // to enable Hot Module Replacement (HMR) and React Transform
        webpackConfig[0].entry.index = [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${config.apps.frontend.api_port}/`, // WebpackDevServer host and port
            'webpack/hot/only-dev-server',  // "only" prevents reload on syntax errors
            ...webpackConfig[0].entry.index,
        ];

        webpackConfig[0].plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),

            new BrowserSyncPlugin(
                // BrowserSync options
                {
                    // browse to http://localhost:3000/ during development
                    open: false,
                    // proxy the Webpack Dev Server endpoint
                    // (which should be serving on http://localhost:3100/)
                    // through BrowserSync
                    proxy: {
                        target: `localhost:${config.apps.frontend.api_port}`,
                    },
                    ghostMode: false,
                },
                // plugin options
                {
                    // prevent BrowserSync from reloading the page
                    // and let Webpack Dev Server take care of this
                    reload: false,
                    callback: () => console.log('Finished proxifying...'),
                },
            ),
            ...webpackConfig[0].plugins,
        ];

        const compiler = webpack(webpackConfig[0]);

        // First we fire up Webpack an pass in the configuration we
        // created
        let bundleStart = null;
        // We give notice in the terminal when it starts bundling and
        // set the time it started
        compiler.plugin('compile', () => {
            console.log('Bundling...');
            bundleStart = Date.now();
        });
        // We also give notice when it is done compiling, including the
        // time it took. Nice to have
        compiler.plugin('done', () => {
            console.log(`Bundled in ${(Date.now() - bundleStart)}ms!`);
            resolve();
        });


        new WebpackDevServer(compiler, {
            publicPath: webpackConfig[0].output.publicPath,
            hot: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000,
            },
            quiet: false,
            noInfo: false,
            // Pretty colored output
            stats: webpackConfig[0].stats,
            historyApiFallback: webpackConfig[0].devServer.historyApiFallback,
            headers: webpackConfig[0].devServer.headers,
        }).listen(config.apps.frontend.api_port, 'localhost', (err, result) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Listening at http://localhost:${config.apps.frontend.api_port}/`);
        });
    });
}

export default start;
