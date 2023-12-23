const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://1.15.179.44:3001',
        pathRewrite: {'^/api': ''}
      }
    }
  }
})
