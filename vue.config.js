const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'raspberrypi:3000',
        }
    }
  }
}