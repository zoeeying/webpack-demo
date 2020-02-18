const loaderUtils = require('loader-utils')
// 这里不能用箭头函数，因为我们要使用原始的this指向
// source是我们引入的文件的源代码
// 把拿到的源代码进行变更，再返回回去
module.exports = function (source) {
  // options传递过来的参数通过this.query获取
  // return source.replace('Zoe', this.query.name)

  // 直接用this.query获取参数有时候会比较奇怪，可能得到的不是对象而是字符串，可以使用loader-utils来解决这个的问题
  // const options = loaderUtils.getOptions(this)
  // return source.replace('Zoe', options.name)

  // 上面的方法只能return一个参数（修改后的源代码）出去，可以使用this.callback返回多个参数，比如sourceMap等
  // this.callback中的参数err、content、sourceMap、meta，meta中放的是我们想返回的其它参数
  // this.callback相当于return
  // const options = loaderUtils.getOptions(this)
  // const result = source.replace('Zoe', options.name)
  // this.callback(null, result)

  // 如果我们想写异步的代码
  const options = loaderUtils.getOptions(this)
  const callback = this.async()
  setTimeout(() => {
    const result = source.replace('Zoe', options.name)
    callback(null, result)
  }, 1000)
}