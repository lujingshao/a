
const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: 'localhost',
    port: '8080',
    // autoOpenBrowser: false,
    https: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/apis': {
        target: 'http://www.baidu.com/api',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    },
  },
  configureWebpack: (config) => {
    if(process.env.NODE_ENV === 'production') {
      config.mode = 'production'

      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        })]
      }
    } else {
      config.mode = 'development'
    }
    Object.assign(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
    })
  },
}
