import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from 'config';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../../webpack/client';
import serverConfig from '../../webpack/server';

const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const app = express();
app.use(cookieParser());
app.use(compression());

const DEBUG = !(['production', 'development', 'staging'].includes(process.env.NODE_ENV)),
    DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV));

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEVELOPMENT) {
    const multiCompiler = webpack([clientConfig, serverConfig]);
    const clientCompiler = multiCompiler.compilers[0];

    // First we fire up Webpack an pass in the configuration we
    // created
    let bundleStart = null;
    // We give notice in the terminal when it starts bundling and
    // set the time it started
    clientCompiler.plugin('compile', () => {
        console.log('Bundling...');
        bundleStart = Date.now();
    });
    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    clientCompiler.plugin('done', () => {
        console.log(`Bundled in ${(Date.now() - bundleStart)}ms!`);
    });

    app.use(webpackDevMiddleware(multiCompiler, {
        publicPath,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        quiet: false,
        noInfo: false,
        stats: {
            colors: true,
            reasons: DEBUG,
            hash: DEVELOPMENT,
            version: DEVELOPMENT,
            timings: true,
            chunks: DEVELOPMENT,
            chunkModules: DEVELOPMENT,
            cached: DEVELOPMENT,
            cachedAssets: DEVELOPMENT,
        },
        headers: clientConfig.devServer.headers,
    }));
    app.use(webpackHotMiddleware(clientCompiler));
    app.use(
        // keeps serverRender updated with arg: { clientStats, outputPath }
        webpackHotServerMiddleware(multiCompiler, {
            serverRendererOptions: {outputPath},
        }),
    );
}
else {
    const clientStats = require('../../build/client/stats.json'); // eslint-disable-line import/no-unresolved
    const serverRender = require('../../build/server/main.js').default; // eslint-disable-line import/no-unresolved

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({clientStats, outputPath}));
}

app.listen(config.apps.frontend.api_port, () => {
    console.log(`Listening @ http://localhost:${config.apps.frontend.api_port}/`);
});
