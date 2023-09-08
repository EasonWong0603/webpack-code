const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    // console.log('compiler: ', compiler.hooks.run);
    compiler.hooks.run.tap(pluginName, (compilation) => {
      // console.log('compilation: ', compilation);
      console.log('🦆🦆🦆 The webpack build process is starting!');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;

/**
 * @description
 * apply ->
 * @description compiler实例
 * compiler.hooks.run  ->
 * @description tapable上的方法
 * tap() ->
 * @description chunk资源
 * compilation
 */
