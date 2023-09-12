const mypack = require('./mypack');
const options = require('../mypack.config.js');
const compiler = mypack(options);

compiler.run((err) => {
  if (err) {
    console.log('编译出错', err);
  }
});
