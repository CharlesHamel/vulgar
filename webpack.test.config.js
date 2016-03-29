// ```
// @datatype_void
// david.r.niciforovic@gmail.com
// webpack.config.js may be freely distributed under the MIT license
// ```

var helpers = require('./helpers');
//# Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
//# Webpack Constants
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

//# Webpack Configurations
module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.js', '.scss']
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules')
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          helpers.root('node_modules/rxjs')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          "compilerOptions": {
            "removeComments": true,
          }
        },
        exclude: [ /\.e2e\.ts$/ ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [ helpers.root('src/index.html') ] },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [ helpers.root('src/index.html') ] },
      {
        test: /\.css$/,
        loader: 'raw-loader',
        exclude: [ helpers.root('src/index.html') ] },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer-loader?browsers=last 2 versions!sass',
        exclude: [ helpers.root('src/index.html') ] },
    ],
    postLoaders: [
      // Instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: helpers.root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      // Environment helpers
      'ENV': JSON.stringify(ENV),
      'HMR': false
    })
  ],
  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  }
};
