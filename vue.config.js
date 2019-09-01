const path = require('path');

function resolve(dir){
  //__dirname .../vue-project/
  return path.join(__dirname, dir);
}

module.exports = {
  // publicPath: '/news/',
  //webpack配置
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'iview': 'iview',
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias:{
        'SRC': resolve('src'),
        'STYLE': resolve('src/style'),
        'STORE': resolve('src/store'),
        'API': resolve('src/api'),
        'COMPONENT': resolve('src/components'),
        'UTIL': resolve('src/util'),
      }
    },
    devServer:{
      compress: true,
    },
  },
  // 多页面配置
  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //   },
  //   subpage: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'subpage/index.html',
  //   }
  // },
}