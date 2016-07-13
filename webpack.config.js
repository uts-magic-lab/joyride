var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');

// default values will be overridden by current environment
var env = {
    NODE_ENV: "'development'",
    ROSBRIDGE_URI: "'ws://192.168.99.100:9090'"
}
Object.keys(env).forEach(function(key){
    if (key in process.env) {
        env[key] = JSON.stringify(process.env[key]);
    }
});

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
        new ExtractTextPlugin('[name]-style.css'), 
        new webpack.DefinePlugin({'process.env': env})
    ],
    postcss: function(webpack) {
        return [
            postcssImport({addDependencyTo: webpack}),
            autoprefixer({browsers: '> 0.1%'})
        ]
    },
    profile: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'],
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
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
                query: {
                    limit: 10000,
                    mimetype:"application/octet-stream",
                    name:"[path][name].[ext]?[hash]",
                    context: "web_modules"
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    limit: 10000,
                    mimetype:"image/svg+xml",
                    name:"[path][name].[ext]?[hash]",
                    context: "web_modules"
                }
            },
            {
                test: /\.gif/,
                loader: "url",
                query: {
                    limit: 10000,
                    mimetype:"image/gif",
                    name:"[path][name].[ext]?[hash]",
                    context: "web_modules"
                }
            },
            {
                test: /\.jpe?g/,
                loader: "url",
                query: {
                    limit: 10000,
                    mimetype:"image/jpg",
                    name:"[path][name].[ext]?[hash]",
                    context: "web_modules"
                }
            },
            {
                test: /\.png/,
                loader: "url",
                query: {
                    limit: 10000,
                    mimetype:"image/png",
                    name:"[path][name].[ext]?[hash]",
                    context: "web_modules"
                }
            }
        ]
    },
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map'
};

config.devServer = {
    contentBase: config.output.path,
    publicPath: '/',
    compress: true
}

// only enable source-maps and hot module reloading in development
if (process.env.NODE_ENV !== 'production') {
    config.plugins.push(new webpack.NoErrorsPlugin());
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer.hot = true;
    config.devServer.inline = true;
}

module.exports = config;
