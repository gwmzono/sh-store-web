const path = require('path');

function resolve(dir){
  //__dirname .../vue-project/
  return path.join(__dirname, dir);
}

module.exports = {
  // publicPath: '/news/',
  //webpack配置
  configureWebpack: {
    // externals: {
    //   'vue': 'Vue',
    // },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias:{
        'SRC': resolve('src'),
        'STYLE': resolve('src/style'),
        'API': resolve('src/api'),
        'MODULE': resolve('node_modules'),
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