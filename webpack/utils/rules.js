const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

export default () => [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                plugins: [
                    // Here, we include babel plugins that are only required for the
                    // renderer process. The 'transform-*' plugins must be included
                    // before react-hot-loader/babel
                    'transform-class-properties',
                    'transform-es2015-classes',
                    'react-hot-loader/babel',
                ],
            },
        },
    }, {
        test: /\.jpe?g$|\.gif$|\.png$/,
        use: 'url-loader?limit=10000&name=/[hash].[ext]',
    }, {
        test: /\.(otf|svg)(\?.+)?$/,
        use: 'url-loader?limit=8192',
    }, {
        test: /\.eot(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject',
    }, {
        test: /\.woff2(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/font-woff2',
    }, {
        test: /\.woff(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/font-woff',
    }, {
        test: /\.ttf(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/font-ttf',
    }, {
        test: /\.html$/,
        use: 'html-loader',
    },
    // {
    //     test: /\.s?css$/,
    //     exclude: /node_modules\/^(?!prismjs)/,
    //     use: ExtractCssChunks.extract({
    //         use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader?sourceMap', 'sass-loader'],
    //     }),
    // },
    {
        test: /\.s?css$/,
        use: [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    importLoaders: true,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                },
            },
            {
                loader: 'sass-loader',
            },
        ],
    },
    ];
