const acorn = require('acorn'); // 把代码分析成AST
const walk = require('acorn-walk'); // 遍历AST
const MagicString = require('magic-string'); // 魔法字符串

module.exports = function (content) {
  const options = this.getOptions();
  const ast = acorn.parse(content);
  console.log('🚀 --------------🚀');
  console.log('🚀 ~ ast:', ast);
  console.log('🚀 --------------🚀');
  const code = new MagicString(content);

  walk.simple(ast, {
    VariableDeclaration(node) {
      console.log('🚀 --------------------------------------🚀');
      console.log('🚀 ~ VariableDeclaration ~ node:', node);
      console.log('🚀 --------------------------------------🚀');
      if (node.kind === 'const') {
        const { start } = node;
        code.overwrite(start, start + node.kind.length, 'var');
      }
    },
  });

  console.log("🚀 ----------------🚀");
  console.log("🚀 ~ code:", code.toString());
  console.log("🚀 ----------------🚀");

  return code.toString();
};
