const path = require('path')// 引入path模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].template = 'index.html'
      return args
    })

    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('api', resolve('./src/api'))
      .set('config', resolve('./src/config'))
      .set('style', resolve('./src/assets/style'))
      .set('views', resolve('./src/views'))
      .set('data', resolve('./src/data'))
    // set第一个参数：设置的别名，第二个参数：设置的路径

  },

  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3100',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 规定请求地址以什么作为开头
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
