const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.openweathermap.org/data/2.5/air_pollution/forecast?',
        }
    }
  }
}