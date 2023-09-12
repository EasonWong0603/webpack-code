const { join } = require('path');
const Parser = require('./Parser.js');

class Compilation {
  constructor(compiler) {
    const { options, modules } = compiler;
    this.options = options;
    this.modules = modules;
  }

  seal(callback) {
    const entryModule = this.buildModule(this.options.entry, true);
    console.log('[  封装对应的entry和chunk  ]');
    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency, false));
      });
    });
    // 生成模块分析
    console.log('[  封装对应的entry和chunk完成  ]');
    // 输出文件
    callback(null, this);
  }

  buildModule(filename, isEntry) {
    console.log('----filename----', filename);
    let absolutePath = '';
    let ast = '';

    if (!isEntry) {
      // 非入口的文件路径补全
      absolutePath = join(process.cwd(), './src/', filename);
      ast = Parser.parse(absolutePath);
    } else {
      ast = Parser.parse(filename);
    }

    const dependencies = Parser.getDependencies(ast);
    const transformCode = Parser.transform(ast);
    return {
      filename,
      dependencies,
      transformCode,
    };
  }
}

module.exports = Compilation;
