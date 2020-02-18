
// MiniCssExtractPlugin插件不能热更新，一般用于线上环境
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ]
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({})]
  },
  output: {
    filename: '[name].[hash].js', // 打包后的文件
    chunkFilename: '[name].[hash].js', // 打包后，非入口文件的文件
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
  ],
}

module.exports = prodConfig