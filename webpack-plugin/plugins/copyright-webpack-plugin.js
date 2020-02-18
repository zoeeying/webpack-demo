class CopyrightWebpackPlugin {
  // 在constructor中通过options接收传过来的参数
  // constructor(options) {
  //   console.log(options)
  // }

  apply(compiler) {
    // compiler可以理解为Webpack的实例，存储了Webpack的打包过程、各种配置等各种内容
    // compiler中有很多hooks，表示不同的生命周期
    // emit表示把打包好的资源放到dist目录的那个时刻，是异步的hook
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
      // compilation中存放的只是跟本次打包相关的内容
      // 打包后生成哪些内容是放在compilation.assets中的
      // 通过debugger来调试，可以看到compilation中有哪些内容，需要在package.json中做相应的配置
      debugger
      compilation.assets['copyright.txt'] = {
        source: function () {
          return 'copyright is reserved by zoe'
        },
        size: function () {
          return 28
        }
      }
      callback()
    })
    // 对于同步的hook，比如compile
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('compile是同步的hook')
    })
  }
}

module.exports = CopyrightWebpackPlugin