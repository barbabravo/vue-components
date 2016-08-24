var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var RollupPluginBabel = require('rollup-plugin-babel');

module.exports = {
    entry:[
        'webpack-dev-server/client?http://localhost:9999',
        'webpack/hot/only-dev-server',
        './demo.js'
    ],
    output:{
        filename:'[name].[hash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    module:{
        loaders:[{
            test:/\.vue$/,
            loader:'vue'
        },{ 
            test: /\.js$/, 
            loader: 'babel', 
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        },{
            test: /\.js$/,
            loaders: ['rollup'],
            exclude: [/node_modules/]
        }]
    },
    rollup: [
        RollupPluginBabel({
            exclude: 'node_modules/**',
            preset: ['es2015-rollup']
        })
    ],
    vue: {
        loaders: {
            css: 'style!css!less',
            html:'html-loader'
        }
    },
    plugins: [
        new HtmlwebpackPlugin({
            template:'./demo.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:9999'
        })
    ]
}