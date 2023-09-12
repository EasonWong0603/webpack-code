const { SyncHook } = require('tapable');
const Compilation = require('./Compilation.js');
const { join } = require('path');
const fs = require('fs');

class Compiler {
  constructor(options) {
    this.options = options;
    this.entry = options.entry;
    this.output = options.output;
    this.modules = [];
    this.hooks = {
      run: new SyncHook(['compilation']),
    };
  }

  run(callback) {
    console.log('[ 开始构建 ]');
    callback();
    const onCompiled = (err, compilation) => {
      this.emitAssets(compilation, (err) => {});
    };
    this.compile(onCompiled);
  }

  compile(callback) {
    const compilation = this.newCompilation();
    // 要把之前插件注册的生命周期开始调度
    this.hooks.run.call(compilation);
    compilation.seal(callback);
  }

  newCompilation() {
    const compilation = this.createCompilation();
    return compilation;
  }

  createCompilation() {
    return new Compilation(this);
  }

  emitAssets(compilation, fallback) {
    console.log('🌺[ 生成dist main.js文件 ]🌺');
    // console.log('接收的文件', compilation);
    const outputPath = join(this.output.path, this.output.filename);
    let _modules = '';
    this.modules.map((_module) => {
      _modules += `/***/ "${_module.filename}":
/*!*********************!*\\
  !*** ${_module.filename} ***!
  \\*********************/
/***/ ((module, exports, require) => {

${_module.transformCode}\n\n\n//# sourceURL=webpack://webpack-code/${_module.filename}?";

/***/ }),\n`;
    });
    // console.log('_modules: ', _modules);
    const template = `/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/  "use strict";
/******/  var __webpack_modules__ = {

${_modules}
/******/  };
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("${this.entry}");
/******/
/******/ })()
;`;
    fs.writeFileSync(outputPath, template, 'utf-8');
  }
}

module.exports = Compiler;
