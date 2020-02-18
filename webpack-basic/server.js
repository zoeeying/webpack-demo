const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
// Webpack不仅可以在命令行中使用，也可以在NodeJS中使用
const compiler = webpack(config) // 代码编译器，编译器执行一次，就会重新打包一次代码

const app = express()

// 只要源代码发生了改变，编译器就会重新执行
// 打包输出的文件路径跟webpack配置文件中的路径一致
// 也可以去掉publicPath，webpack.config.js中的output中的publicPath也去掉
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }))
app.use(webpackDevMiddleware(compiler))

app.listen(3000, () => {
  console.log('server is running')
})