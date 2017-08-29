const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const DEBUG = !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production');
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

export default () => [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=babel',
        //use: 'babel-loader',
    }, {
        test: /\.jpe?g$|\.gif$|\.png$/,
        use: `url-loader?limit=10000&name=/[hash].[ext]`,
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
    }, {
        test: /\.s?css$/,
        exclude: /node_modules\/^(?!prismjs)/,
        // ...(PRODUCTION ? {
                use: ExtractCssChunks.extract({
                    use: ['css-loader?importLoaders=1', 'postcss-loader?sourceMap', 'sass-loader'],
                }),
            // } :
            // {
            //     loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap&sourceComments'],
            // }),
    }];