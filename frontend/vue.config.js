const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/vue3memo',
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
})
