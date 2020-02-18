const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [{
      test: /\.js/,
      use: [{
        // loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
        // 如果上面配置了resolveLoader，这里的loader就可以直接写成replaceLoader
        loader: 'replaceLoader',
        options: {
          name: '小畅叙'
        }
      }]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}