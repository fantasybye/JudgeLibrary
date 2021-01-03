const path = require('path');
const webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: [
    'es5-shim', 'es5-shim/es5-sham', 'babel-polyfill', './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    publicPath: '/static/'
  },
  debug: true,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: path.join(__dirname, 'index.html')
    // }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'dll'),
      manifest: require('./manifest.json'), // 指定manifest.json
      name: 'lib' // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   mangle: false,
    //   output: {
    //     comments: false
    //   },
    //   'support-ie8': true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new Es3ifyPlugin()
  ],
  resolve: {
    extensions: ['.less', '.css', '.js', '.json', ''],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      src: resolve('src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      static: resolve('src/static')
    }
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [/src/, /node_modules/],
        loaders: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: '[name].[hash:7].[ext]'
      //   }
      // }
    ]
  }
};
