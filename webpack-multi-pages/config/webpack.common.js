const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

const createPlugins = (configs) => {
  const plugins = [
    new CleanWebpackPlugin()
  ]
  for (let item in configs.entry) {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${item}.html`,
        chunks: ['vendors', item]
      })
    )
  }
  const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
  files.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
      plugins.push(new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll', file)
      }))
    }
    if (/.*\.manifest.js/.test(file)) {
      plugins.push(new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll', file)
      }))
    }
  })
  return plugins
}

const commonConfig = {
  entry: {
    index: './src/index.js',
    list: './src/list.js',
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif|jpeg)$/,
      use: {
        loader: 'url-loader', // 需要安装另外的包
        options: {
          name: '[name].[ext]', // 打包后的文件名不改变，[name]和[ext]是占位符
          outputPath: 'images/', // 打包后的文件放在dist目录下的images文件夹中
          limit: 2048,
        },
      },
    }, {
      test: /\.(oet|ttf|svg)$/,
      use: {
        loader: 'file-loader',
      },
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
      ],
    }],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
      }
    }
  },
  output: {
    // 打包后的文件所在的文件夹，必须使用绝对路径，需要用到node的核心模块 
    // __dirname表示当前目录
    path: path.resolve(__dirname, '../dist'),
    // publicPath: './' // 去掉的话，就可以直接用浏览器打开dist目录下的index.html了，而不需要启动服务器
  },
  performance: false, // 打包的时候不会提示性能上的问题，比如打包后生成的文件很大
}

commonConfig.plugins = createPlugins(commonConfig)

module.exports = env => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  }
  return merge(commonConfig, devConfig)
}