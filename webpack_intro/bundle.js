/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _first_module = __webpack_require__(1);

	var stuff = _interopRequireWildcard(_first_module);

	var name = _interopRequireWildcard(_first_module);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// name is the name of the object that will receive the imported values.


	console.log(_first_module.info); // woohoo!
	console.log(stuff); // woohoo!
	console.log(name.default, name);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function sayHello() {
	    return 'Hello';
	}

	var info = {
	    firstName: 'Elie',
	    lastName: 'Schoppik',
	    job: 'Instructor',
	    sayHi: function sayHi() {
	        return 'Hi ' + this.firstName + ' ' + this.lastName + '!';
	    }
	};

	var meaningOfLife = 42;

	var foo = 'bar';

	exports.info = info;
	exports.sayHello = sayHello;
	exports.meaningOfLife = meaningOfLife; // send this off to another module

/***/ }
/******/ ]);