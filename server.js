const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const config = require('./config');

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

/* eslint-disable no-console */
const app = express();
const compiler = webpack(webpackConfig);
// const hotMiddleware = require('webpack-hot-middleware')(compiler);

// compiler.plugin('compilation', (compilation) => {
//   compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
//     hotMiddleware.publish({ action: 'reload' });
//     cb();
//   });
// });
app.use(express.static(path.join(__dirname, '/')));
// use in webpack development mode
app.use(require('webpack-dev-middleware')(compiler, {
  stats: {
    colors: true,
    chunks: true
  },
  publicPath: webpackConfig.output.publicPath
}));

// app.use(hotMiddleware);

// use in webpack production mode
// app.use(express.static(__dirname));
// const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
// app.use(staticPath, express.static('./static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(3000, '192.168.11.151', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://192.168.11.151:3000');
});
