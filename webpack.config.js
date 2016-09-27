var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var RollupPluginBabel = require('rollup-plugin-babel');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:9999',
        'webpack/hot/only-dev-server',
        './example/index.js'
    ],
    output: {
        filename: '[name].[hash].js'
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
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        },{
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders:
            // "url-loader?limit=100000&mimetype=image/png&name=[name].[hash].[ext]"
             [
                
                'file?hash=sha512&digest=hex&name=/[path]/[name].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    vue: {
        loaders: {
            css: 'style!css!less',
            html: 'html-loader'
        }
    },
    plugins: [
        new HtmlwebpackPlugin({
            filename:'./example/index.html',
            template: './example/tpl.html',
            inject: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:9999/example/index.html'
        })
    ]
}