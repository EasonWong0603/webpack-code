const path = require('path');
const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin');
module.exports = {
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: path.resolve(__dirname, './loader/babel-index.js'),
  //         options: {
  //           presets: [['@babel/preset-env', { targets: 'defaults' }]],
  //         },
  //       },
  //     },
  //   ],
  // },
  plugins: [new ConsoleLogOnBuildWebpackPlugin()],
};
