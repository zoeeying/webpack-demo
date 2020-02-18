const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true, // 自动打开浏览器，自动访问服务器地址
    port: 8080, // 端口号
    hot: true, // 打开热更新
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 如果不加这个选项的话，通过import引入的其它的sass文件在打包的时候，可能不会使用下面的两个loader
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ]
  },
  output: {
    filename: '[name].js', // 打包后的文件
    chunkFilename: '[name].js', // 打包后，非入口文件的文件
  },
}

module.exports = devConfig
