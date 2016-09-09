var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var failPlugin = require('webpack-fail-plugin');

// default values will be overridden by current environment
var packageInfo = require('./package');
var env = {
    NODE_ENV: 'development',
    ROSBRIDGE_URI: 'ws://192.168.99.100:9090',
    PACKAGE_NAME: packageInfo.name,
    PACKAGE_VERSION: packageInfo.version
};
Object.keys(env).forEach(function(key){
    if (key in process.env) {
        env[key] = process.env[key];
    }
    env[key] = JSON.stringify(env[key]);
});

// keep a pointer to css loader so it can change based on environment
var cssPlugin = new ExtractTextPlugin('[name]-style.css');
var cssLoader = {
    test: /\.css$/,
    loader: cssPlugin.extract("style", "css!postcss")
}

// main config object
var config = {
    entry: [
        'main/entry'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name]-bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        modulesDirectories: ['web_modules','node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({'process.env': env}),
        cssPlugin, 
        failPlugin
    ],
    postcss: function(webpack) {
        return [
            autoprefixer({browsers: '> 0.1%'})
        ]
    },
    profile: true,
    module: {
        loaders: [
            cssLoader,
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'],
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url",
                query: {limit: 5000, prefix:"font/"}
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {limit: 10000, mimetype:"application/octet-stream", name:"[path][name].[ext]?[hash]"}
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {limit: 10000, mimetype:"image/svg+xml", name:"[path][name].[ext]?[hash]"}
            },
            {
                test: /\.gif/,
                loader: "url",
                query: {limit: 10000, mimetype:"image/gif", name:"[path][name].[ext]?[hash]"}
            },
            {
                test: /\.jpe?g/,
                loader: "url",
                query: {limit: 10000, mimetype:"image/jpg", name:"[path][name].[ext]?[hash]"}
            },
            {
                test: /\.png/,
                loader: "url",
                query: {limit: 10000, mimetype:"image/png", name:"[path][name].[ext]?[hash]"}
            }
        ]
    },
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map'
};

config.devServer = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || '8080',
    contentBase: config.output.path,
    publicPath: '/',
    compress: true
}

// in production mode, minimize file-size
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

// when running webpack-dev-server, enable hot module reloading
if (require.cache[require.resolve('webpack-dev-server')]) {
    config.plugins.push(new webpack.NoErrorsPlugin());
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer.hot = true;
    config.devServer.inline = true;
    cssLoader.loader = "style!css!postcss";
}

module.exports = config;
