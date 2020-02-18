const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, 'utf-8')
  // 可以借助cli-highlight来高亮显示打印出来的文件内容
  // 在项目目录下使用命令node bundler.js | highlight来执行该文件
  // console.log(content) 

  // 抽象语法树
  const ast = parser.parse(content, {
    // 源代码中使用了ES Module，即import引入模块的方式
    sourceType: 'module'
  })

  // 所有的依赖
  const dependencies = {}
  traverse(ast, {
    // 只要抽象语法树中包含引入的语句，就会执行下面的ImportDeclaration函数
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename)
      // windows系统下，path.join出来的路径中的斜杆是向右的，需要替换成向左的
      let newFilePath = './' + path.join(dirname, node.source.value)
      newFilePath = newFilePath.replace('\\', '/')
      dependencies[node.source.value] = newFilePath
    }
  })

  // 把抽象语法树转换为浏览器可以执行的代码
  // code就是浏览器可以执行的代码
  const { code } = babel.transformFromAst(ast, null, {
    // 插件集合
    presets: ['@babel/preset-env']
  })
  return {
    filename,
    dependencies,
    code
  }
}

const makeDependenciesGraph = entry => {
  const entryModule = moduleAnalyser(entry)
  // graphArray就是依赖图谱
  const graphArray = [entryModule]
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]))
      }
    }
  }
  const graph = {}
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph
}

const generateCode = entry => {
  const graph = JSON.stringify(makeDependenciesGraph(entry))
  return `
    (function(graph){
      function require(module){
        function localRequire(relativePath){
          return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require, exports, code){
          eval(code)
        })(localRequire, exports, graph[module].code)
        return exports
      }
      require('${entry}')
    })(${graph})
  `
}

const code = generateCode('./src/index.js')
console.log(code)