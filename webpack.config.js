var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');

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
        new webpack.DefinePlugin({'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }})
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
                loader: "url?prefix=font/&limit=5000"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.gif/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png/,
                loader: "url-loader?limit=10000&mimetype=image/png"
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
