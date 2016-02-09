var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        'app': './app/modules/boot.ts',
        'vendor': './app/modules/vendor.ts'
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
            'jQuery': "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js')
    ],

    resolve: {
        extensions: ['','.ts','.js']
    },

    devtool: 'source-map',

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
                loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
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