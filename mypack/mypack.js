const Compiler = require('./Compiler.js');

const mypack = (options) => {
  const compiler = new Compiler(options);

  if (Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      plugin.apply(compiler);
    }
  }

  return compiler;
};

module.exports = mypack;
