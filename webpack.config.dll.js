const path = require('path');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].js',
    library: '[name]' // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  entry: {
    /*
      指定需要打包的js模块
      或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
    */
    lib: [
      '_react@0.14.3@react',
      '_react-router@0.13.6@react-router',
      '_axios@0.15.3@axios',
      '_core-js@2.5.0@core-js',
      '_moment@2.18.1@moment',
      '_echarts@3.6.2@echarts',
      'react',
      'react-router',
      'axios',
      'core-js',
      'moment',
      'echarts'
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: './manifest.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]' // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
    })
  ],
  module: {
    loaders: [
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
    ]
  }, // 沿用业务代码的module配置
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
  }// 沿用业务代码的resolve配置
};
