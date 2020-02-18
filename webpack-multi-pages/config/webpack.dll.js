const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    lodash: ['lodash'],
    react: ['react-dom', 'react'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      // 使用插件来分析vendors库，把库里面第三方模块的映射关系存储在vendors.manifest.json文件中
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    })
  ],
}