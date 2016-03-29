var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CompressionPlugin = require('compression-webpack-plugin');

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
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-bundle.js'),
        new UglifyJsPlugin({
            // beautify: true, //debug
            // mangle: false, //debug
            // dead_code: false, //debug
            // unused: false, //debug
            // deadCode: false, //debug
            // compress: {
            //   screw_ie8: true,
            //   keep_fnames: true,
            //   drop_debugger: false,
            //   dead_code: false,
            //   unused: false
            // }, // debug
            // comments: true, //debug

            beautify: false,//prod

            // mangle: { screw_ie8 : true }, //prod
            mangle: {
                screw_ie8: true,
                except: [
                    'App',
                    'About',
                    'Contact',
                    'Home',
                    'Menu',
                    'Footer',
                    'XLarge',
                    'RouterActive',
                    'RouterLink',
                    'RouterOutlet',
                    'NgFor',
                    'NgIf',
                    'NgClass',
                    'NgSwitch',
                    'NgStyle',
                    'NgSwitchDefault',
                    'NgControl',
                    'NgControlName',
                    'NgControlGroup',
                    'NgFormControl',
                    'NgModel',
                    'NgFormModel',
                    'NgForm',
                    'NgSelectOption',
                    'DefaultValueAccessor',
                    'NumberValueAccessor',
                    'CheckboxControlValueAccessor',
                    'SelectControlValueAccessor',
                    'RadioControlValueAccessor',
                    'NgControlStatus',
                    'RequiredValidator',
                    'MinLengthValidator',
                    'MaxLengthValidator',
                    'PatternValidator',
                    'AsyncPipe',
                    'DatePipe',
                    'JsonPipe',
                    'NumberPipe',
                    'DecimalPipe',
                    'PercentPipe',
                    'CurrencyPipe',
                    'LowerCasePipe',
                    'UpperCasePipe',
                    'SlicePipe',
                    'ReplacePipe',
                    'I18nPluralPipe',
                    'I18nSelectPipe'
                ] // Needed for uglify RouterLink problem
            }, // prod
            compress: {screw_ie8: true}, //prod
            comments: false //prod
        }),

        // Plugin: CompressionPlugin
        // Description: Prepares compressed versions of assets to serve
        // them with Content-Encoding
        //
        // See: https://github.com/webpack/compression-webpack-plugin
        new CompressionPlugin({
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        })

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
                test: /\.ts$/, loader: 'awesome-typescript-loader',
                query: {
                    'compilerOptions': {

                        // Remove TypeScript helpers to be injected
                        // below by DefinePlugin
                        'removeComments': true

                    }
                },
                exclude: [
                    /\.(spec|e2e)\.ts$/
                ]
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

    // Html loader advanced options
    //
    // See: https://github.com/webpack/html-loader#advanced-options
    // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
        customAttrAssign: [/\)?\]?=/]
    },
    devServer: {
        contentBase: 'wwwroot'
    }
};
