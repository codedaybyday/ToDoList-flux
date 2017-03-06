/**
 * Created by liubeijing on 16/8/10.
 */
var webpack = require('webpack');
//var webpackDevServer = require('webpack-dev-server');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    entry: [
        'webpack-dev-server/client?http://localhost:1024',//资源服务器地址
        'webpack/hot/only-dev-server',
        './components/index.jsx',
    ],
    output: {
        publicPath: "http://127.0.0.1:1024/",
        path:'dist/' ,
        filename: "bundle.js"
        //path: __dirname,
        //filename: 'index.js'
    },
    devServer:{
        contentBase:'./',
        hot: true,
        inline: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx','.less']
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['react-hot','jsx?harmony'] },
            { test: /\.less$/, loader: "style!css!less" }
        ]
    }
};