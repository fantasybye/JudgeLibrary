var path = require('path'); // eslint-disable-line

module.exports = {
  client_id: 'JudgeReview', // 应用id
  client_secret: '403b494b-38fd-407c-a2fe-b1683916033b', // 应用密钥
  auth_server_remote: 'http://180.96.11.73:9010', // 认证服务器地址
  ucenter_server_remote: 'http://180.96.11.69:8500', // token代理服务器
  build: {
    app_remote: 'http://judge.aegis-info.com', // 应用地址
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    serviceHost: 'http://180.96.11.73:7070'
  },
  dev: {
    app_remote: 'http://192.168.11.151:3000', // 应用地址
    env: require('./dev.env'),
    port: 3000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false,
    serviceHost: 'judgeNative'
  }
};
