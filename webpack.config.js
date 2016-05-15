var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    entry: {
        'vendor': './app/modules/vendor.ts',
        'app': './app/modules/main.ts'
    },
    output: {
        path:'wwwroot',
        publicPath: '/',
        filename: "app-bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            "_": "underscore",
            '$': "jquery",
            $: "jquery",
            moment: "moment",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js')
    ],

    resolve: {
        extensions: ['','.ts','.js'],
        alias: {
            "_": "underscore"
        }
    },

    devtool: 'source-map',

    node: {
        fs: "empty"
    },

    module: {
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|jpeg)(\?.*$|$)/,
                exclude: /node_modules/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.(ttf|eot|woff2|woff|svg)(\?.*$|$)/,
                exclude: '/node_modules/',
                loader: 'file-loader?limit=10000'
            },
            {   test: /materialize-css\/bin\//,
                loader: 'imports?jQuery=jquery,$=jquery,hammerjs'
            }
        ],
        noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
    },
    devServer: {
        contentBase: 'wwwroot'
    }
};
