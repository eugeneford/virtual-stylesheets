(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VSM"] = factory();
	else
		root["VSM"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	"use strict";

	var _VirtualGrammar = __webpack_require__(1);

	var _VirtualGrammar2 = _interopRequireDefault(_VirtualGrammar);

	var _VirtualRuleFactory = __webpack_require__(2);

	var _VirtualRuleFactory2 = _interopRequireDefault(_VirtualRuleFactory);

	var _VirtualStyleSheet = __webpack_require__(8);

	var _VirtualStyleSheet2 = _interopRequireDefault(_VirtualStyleSheet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  VirtualGrammar: _VirtualGrammar2.default,
	  VirtualRuleFactory: _VirtualRuleFactory2.default,
	  VirtualStyleSheet: _VirtualStyleSheet2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
	 * and associated documentation files (the "Software"), to deal in the Software without restriction,
	 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
	 * subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all copies or substantial
	 * portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 */

	var HASH = '#'.charCodeAt(0);
	var ASTERISK = '*'.charCodeAt(0);
	var DOT_SIGN = '.'.charCodeAt(0);
	var COLON = ':'.charCodeAt(0);
	var OPEN_SQUARE = '['.charCodeAt(0);

	var CF_WORD = function CF_WORD(code) {
	  return code >= 128 || code === 45 || code == 245 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
	};

	var VirtualGrammar = function () {
	  function VirtualGrammar() {
	    _classCallCheck(this, VirtualGrammar);

	    this._test = {};
	    this.UNKNOWN_RULE = 0;
	  }

	  /**
	   * Get all rule types defined in grammar
	   * @returns {object}
	   */


	  _createClass(VirtualGrammar, [{
	    key: 'getTypes',
	    value: function getTypes() {
	      var types = {};
	      for (var i in this) {
	        if (this._test[this[i]]) types[i] = this[i];
	      }
	      return types;
	    }

	    /**
	     * Get VirtualRule type based on specified rule
	     * @param rule
	     * @returns {number}
	     */

	  }, {
	    key: 'getRuleType',
	    value: function getRuleType(rule) {
	      for (var i in this) {
	        if (this._test[this[i]] && this._test[this[i]](rule)) return this[i];
	      }
	      return this.UNKNOWN_RULE;
	    }

	    /**
	     * Defines a new Rule lexeme in grammar
	     * @param ruleType
	     */

	  }, {
	    key: 'define',
	    value: function define(ruleType) {
	      if (typeof ruleType.type !== "string") throw TypeError("Lexeme.type is not a string");
	      if (typeof ruleType.value !== "number") throw TypeError("Lexeme.value is not a number");
	      if (typeof ruleType.test !== "function") throw TypeError("Lexeme.test is not a function");
	      this[ruleType.type] = ruleType.value;
	      this._test[ruleType.value] = ruleType.test;
	    }
	  }]);

	  return VirtualGrammar;
	}();

	var Grammar = new VirtualGrammar();

	Grammar.define({
	  type: "STYLE_RULE",
	  value: 1,
	  test: function test(rule) {
	    var startCode = rule.charCodeAt(0);
	    return !!(startCode === ASTERISK || startCode === DOT_SIGN || CF_WORD(startCode) && !(startCode >= 48 && startCode <= 57) || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON);
	  }
	});

	Grammar.define({
	  type: "CHARSET_RULE",
	  value: 2,
	  test: function test(rule) {
	    return rule.substr(0, "@charset".length) === "@charset";
	  }
	});

	Grammar.define({
	  type: "IMPORT_RULE",
	  value: 3,
	  test: function test(rule) {
	    return rule.substr(0, "@import".length) === "@import";
	  }
	});

	Grammar.define({
	  type: "MEDIA_RULE",
	  value: 4,
	  test: function test(rule) {
	    return rule.substr(0, "@media".length) === "@media";
	  }
	});

	Grammar.define({
	  type: "FONT_FACE_RULE",
	  value: 5,
	  test: function test(rule) {
	    return rule.substr(0, "@font-face".length) === "@font-face";
	  }
	});

	Grammar.define({
	  type: "PAGE_RULE",
	  value: 6,
	  test: function test(rule) {
	    return rule.substr(0, "@page".length) === "@page";
	  }
	});

	Grammar.define({
	  type: "KEYFRAMES_RULE",
	  value: 7,
	  test: function test(rule) {
	    return rule.substr(0, "@keyframes".length) === "@keyframes" || rule.substr(0, "@-webkit-keyframes".length) === "@-webkit-keyframes" || rule.substr(0, "@-moz-keyframes".length) === "@-moz-keyframes" || rule.substr(0, "@-ms-keyframes".length) === "@-ms-keyframes" || rule.substr(0, "@-o-keyframes".length) === "@-o-keyframes";
	  }
	});

	Grammar.define({
	  type: "KEYFRAME_RULE",
	  value: 8,
	  test: function test(rule) {
	    var value = rule,
	        i = void 0,
	        codes = [value.charCodeAt(0), value.charCodeAt(1), value.charCodeAt(2), value.charCodeAt(3)];

	    for (i = 0; i < codes.length; i++) {
	      // If code starts a percentage number
	      if (i > 0 && codes[i] === 37) return true;

	      // If code is not a digit
	      if (codes[i] < 48 && codes[i] > 57) return false;
	    }

	    // Otherwise, codes refers to a number
	    return false;
	  }
	});

	Grammar.define({
	  type: "NAMESPACE_RULE",
	  value: 10,
	  test: function test(rule) {
	    return rule.substr(0, "@namespace".length) === "@namespace";
	  }
	});

	Grammar.define({
	  type: "SUPPORTS_RULE",
	  value: 12,
	  test: function test(rule) {
	    return rule.substr(0, "@supports".length) === "@supports";
	  }
	});

	Grammar.define({
	  type: "VIEWPORT_RULE",
	  value: 15,
	  test: function test(rule) {
	    return rule.substr(0, "@viewport".length) === "@viewport";
	  }
	});

	exports.default = Grammar;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and associated documentation files (the "Software"), to deal in the Software without restriction,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The above copyright notice and this permission notice shall be included in all copies or substantial
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualGrammar = __webpack_require__(1);

	var _VirtualGrammar2 = _interopRequireDefault(_VirtualGrammar);

	var _VirtualRuleList = __webpack_require__(4);

	var _VirtualRuleList2 = _interopRequireDefault(_VirtualRuleList);

	var _VirtualRule = __webpack_require__(5);

	var _VirtualRule2 = _interopRequireDefault(_VirtualRule);

	var _VirtualStyleRule = __webpack_require__(6);

	var _VirtualStyleRule2 = _interopRequireDefault(_VirtualStyleRule);

	var _VirtualTokenizer = __webpack_require__(7);

	var _VirtualTokenizer2 = _interopRequireDefault(_VirtualTokenizer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualRuleFactory = function () {
	  function VirtualRuleFactory() {
	    _classCallCheck(this, VirtualRuleFactory);

	    this._types = {};
	  }

	  /**
	   * Create a new VirtualRule based on ruleInfo
	   * @param ruleInfo
	   * @param parentRule
	   * @param hooks
	   * @returns {null}
	   */


	  _createClass(VirtualRuleFactory, [{
	    key: "create",
	    value: function create(ruleInfo) {
	      var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var filterResult = void 0;

	      // Apply a pre parsing filter if was specified
	      if (hooks.preParsingFilter) {
	        if ((filterResult = hooks.preParsingFilter(ruleInfo)) === _VirtualActions2.default.FILTER_REJECT) return null;
	        filterResult = filterResult < 0 ? filterResult : 0;
	      }

	      // Create a VirtualRule based on type in ruleInfo
	      if (this._types[ruleInfo.type]) return new this._types[ruleInfo.type](ruleInfo, parentRule, hooks, filterResult);
	      // Otherwise throw a TypeError
	      throw new TypeError("There is no ruleClass associated with " + ruleInfo.type);
	    }

	    /**
	     * Create a new VirtualRule from token
	     * @param token
	     * @param parentRule
	     * @param hooks
	     * @returns {null}
	     */

	  }, {
	    key: "createFromToken",
	    value: function createFromToken(token, parentRule, hooks) {
	      var type = void 0,
	          ruleInfo = void 0;

	      type = _VirtualGrammar2.default.getRuleType(token.value);

	      ruleInfo = {
	        type: type,
	        startOffset: token.startOffset,
	        endOffset: token.startOffset + token.length,
	        cssText: token.value
	      };

	      return this.create(ruleInfo, parentRule, hooks);
	    }

	    /**
	     * Register new VirtualRule type
	     * @param ruleType
	     * @param ruleClass
	     */

	  }, {
	    key: "register",
	    value: function register(ruleType, ruleClass) {
	      if (typeof ruleType !== "number") throw TypeError("ruleType is not a number");
	      if (typeof ruleClass !== "function") throw TypeError("ruleClass is not a function");
	      this._types[ruleType] = ruleClass;
	    }
	  }]);

	  return VirtualRuleFactory;
	}();

	var RuleFactory = new VirtualRuleFactory();

	RuleFactory.register(_VirtualGrammar2.default.UNKNOWN_RULE, _VirtualRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.STYLE_RULE, _VirtualStyleRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.MEDIA_RULE, _VirtualRule2.default);

	exports.default = RuleFactory;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  // Filter constants
	  FILTER_ACCEPT: 1,
	  FILTER_REJECT: 0,

	  // Lazy-parsing constants
	  LAZY_REJECT: 0,
	  LAZY_BODY_ACCEPT: -1,
	  LAZY_ALL_ACCEPT: -2,

	  // Parsing types
	  PARSE_HEAD: 1,
	  PARSE_BODY: 2,
	  PARSE_ALL: 0,

	  // Patching constants
	  PATCH_UPDATE: 0,
	  PATCH_APPEND: 1,
	  PATCH_PREPEND: 2,
	  PATCH_INSERT: 3,
	  PATCH_REPLACE: 4,
	  PATCH_DELETE: 5,

	  PATCH_ACCEPT: 0,
	  PATCH_REJECT: 1
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and associated documentation files (the "Software"), to deal in the Software without restriction,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The above copyright notice and this permission notice shall be included in all copies or substantial
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualRule = __webpack_require__(5);

	var _VirtualRule2 = _interopRequireDefault(_VirtualRule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Virtual list is a array-like object containing an ordered collection of VirtualRules
	 */
	var VirtualRuleList = function () {
	  function VirtualRuleList() {
	    _classCallCheck(this, VirtualRuleList);

	    this._rules = [];
	    this.length = 0;
	  }

	  /**
	   * Inserts an additional VirtualRule  rule at specified position index in current VirtualRuleList.
	   * @param rule
	   * @param index
	   *
	   * @throws TypeError - if rule is not a type of VirtualRule
	   */


	  _createClass(VirtualRuleList, [{
	    key: "insert",
	    value: function insert(rule, index) {
	      var id = void 0;
	      if (!rule) throw new Error("rule is not defined");
	      if (!rule instanceof _VirtualRule2.default) throw new Error("rule is not a type of VirtualRule");
	      if (index < 0) throw new Error("index should be a positive int");

	      if (typeof index === "undefined" || index > this._rules.length) {
	        id = this._rules.length;
	      } else {
	        id = index;
	      }

	      rule.id = id;
	      this._rules.splice(id, 0, rule);
	      this.length = this._rules.length;

	      for (var i = id + 1; i < this._rules.length; i++) {
	        this._rules[i].id = i;
	      }
	    }

	    /**
	     * Removes a VirtualRule at target position index. Returns removed rule
	     * @param id
	     * @returns {VirtualRule}
	     *
	     * @throws Error = if there is not rule with specified id
	     */

	  }, {
	    key: "remove",
	    value: function remove(id) {
	      if (typeof id === "undefined") throw new Error("id is not defined");
	      if (id < 0) throw new Error("id should be a positive int");
	      if (id >= this._rules.length) throw new Error("id (" + id + ") is out of range (" + this._rules.length + ")");

	      for (var i = id + 1; i < this._rules.length; i++) {
	        this._rules[i].id -= 1;
	      }
	      this.length = this._rules.length - 1;
	      return this._rules.splice(id, 1)[0];
	    }

	    /**
	     * Returns a VirtualRule that has target id.
	     * @param id
	     * @returns {VirtualRule}
	     */

	  }, {
	    key: "get",
	    value: function get(id) {
	      return this._rules[id];
	    }

	    /**
	     * Returns a set of VirtualRules that satisfy specified target filterFunc function and
	     * VirtualStyleSheet.FILTER_ACCEPT, VirtualStyleSheet.FILTER_REJECT flags returned by it.
	     * @param filterFunc
	     * @returns {Array.<VirtualRule>}
	     */

	  }, {
	    key: "filter",
	    value: function filter(filterFunc) {
	      return this._rules.filter(filterFunc);
	    }
	  }]);

	  return VirtualRuleList;
	}();

	exports.default = VirtualRuleList;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and associated documentation files (the "Software"), to deal in the Software without restriction,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The above copyright notice and this permission notice shall be included in all copies or substantial
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SLASH = '\\'.charCodeAt(0);
	var SEMICOLON = ';'.charCodeAt(0);
	var OPEN_CURLY = '{'.charCodeAt(0);
	var CLOSE_CURLY = '}'.charCodeAt(0);
	var SINGLE_QUOTE = '\''.charCodeAt(0);
	var DOUBLE_QUOTE = '\"'.charCodeAt(0);

	var VirtualRule = function () {
	  function VirtualRule(ruleInfo) {
	    var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var lazyParsing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	    _classCallCheck(this, VirtualRule);

	    if (!ruleInfo) throw new Error("ruleInfo is missing");
	    if (typeof ruleInfo.type === "undefined" || typeof ruleInfo.startOffset === "undefined" || typeof ruleInfo.endOffset === "undefined" || typeof ruleInfo.cssText === "undefined") {
	      throw new Error("Bad input");
	    }

	    this._hooks = hooks;

	    this.type = ruleInfo.type;
	    this.startOffset = ruleInfo.startOffset;
	    this.endOffset = ruleInfo.endOffset;
	    this.cssText = ruleInfo.cssText;
	    this.parentRule = parentRule;
	    this.lazyParsing = lazyParsing;
	    this._parseInvoke();
	  }

	  /**
	   * Force update patching for its child rules
	   * @param patchInfo
	   * @private
	   */


	  _createClass(VirtualRule, [{
	    key: '_forceChildChainUpdate',
	    value: function _forceChildChainUpdate(patchInfo) {
	      if (patchInfo.patchDelta && this.rules && this.rules.length) {
	        this.rules.get(0).patch({
	          action: _VirtualActions2.default.PATCH_UPDATE,
	          patchDelta: patchInfo.patchDelta
	        });
	      }
	    }

	    /**
	     * Force update patching for next sibling of this rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: '_forceChainUpdate',
	    value: function _forceChainUpdate(patchInfo) {
	      if (patchInfo.patchDelta && this.parentRule && this.parentRule.rules.get(this.id + 1)) {
	        this.parentRule.rules.get(this.id + 1).patch({
	          action: _VirtualActions2.default.PATCH_UPDATE,
	          patchDelta: patchInfo.patchDelta
	        });
	      }
	    }

	    /**
	     * Apply update action to current rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: '_patchUpdateApply',
	    value: function _patchUpdateApply(patchInfo) {
	      if (patchInfo.patchDelta) {
	        this.startOffset += patchInfo.patchDelta;
	        this.endOffset += patchInfo.patchDelta;
	        this._forceChildChainUpdate(patchInfo);
	      }
	    }

	    /**
	     * Apply append action to current rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: '_patchAppendApply',
	    value: function _patchAppendApply(patchInfo) {
	      var oldText = this.cssText;
	      this.cssText = oldText + patchInfo.value;
	      this.endOffset = this.endOffset + this.cssText.length - oldText.length;
	      this._parseInvoke();
	    }

	    /**
	     * Apply prepend action to current rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: '_patchPrependApply',
	    value: function _patchPrependApply(patchInfo) {
	      var oldText = this.cssText;
	      this.cssText = patchInfo.value + oldText;
	      this.endOffset = this.endOffset + this.cssText.length - oldText.length;
	      this._parseInvoke();
	    }

	    /**
	     * Apply insert action to current rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: '_patchInsertApply',
	    value: function _patchInsertApply(patchInfo) {
	      var info = Object.assign({}, patchInfo, { end: patchInfo.start });
	      this._patchReplaceApply(info);
	      this._parseInvoke();
	    }

	    /**
	     * Apply replace action to current rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: '_patchReplaceApply',
	    value: function _patchReplaceApply(patchInfo) {
	      var head = void 0,
	          trail = void 0,
	          oldText = this.cssText;
	      head = this.cssText.substring(0, patchInfo.start);
	      trail = this.cssText.substring(patchInfo.end);
	      this.cssText = head + patchInfo.value + trail;
	      this.endOffset = this.endOffset + this.cssText.length - oldText.length;
	      this._parseInvoke();
	    }

	    /**
	     * Apply delete action to current rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: '_patchDeleteApply',
	    value: function _patchDeleteApply(patchInfo) {
	      var info = Object.assign({}, patchInfo, { value: "" });
	      this._patchReplaceApply(info);
	      this._parseInvoke();
	    }

	    /**
	     * Apply patch changes to current rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: '_patchApply',
	    value: function _patchApply(patchInfo) {
	      switch (patchInfo.action) {
	        case _VirtualActions2.default.PATCH_UPDATE:
	          this._patchUpdateApply(patchInfo);
	          break;

	        case _VirtualActions2.default.PATCH_APPEND:
	          this._patchAppendApply(patchInfo);
	          break;

	        case _VirtualActions2.default.PATCH_PREPEND:
	          this._patchPrependApply(patchInfo);
	          break;

	        case _VirtualActions2.default.PATCH_INSERT:
	          this._patchInsertApply(patchInfo);
	          break;

	        case _VirtualActions2.default.PATCH_REPLACE:
	          this._patchReplaceApply(patchInfo);
	          break;

	        case _VirtualActions2.default.PATCH_DELETE:
	          this._patchDeleteApply(patchInfo);
	          break;
	      }

	      this._forceChainUpdate(patchInfo);
	    }

	    /**
	     * Invokes rule parsing basing on lazyParsing state
	     * @private
	     */

	  }, {
	    key: '_parseInvoke',
	    value: function _parseInvoke() {
	      switch (this.lazyParsing) {
	        case _VirtualActions2.default.LAZY_BODY_ACCEPT:
	          this.parse(_VirtualActions2.default.PARSE_HEAD);
	          break;
	        case _VirtualActions2.default.LAZY_REJECT:
	          this.parse(_VirtualActions2.default.PARSE_ALL);
	          break;
	      }
	    }

	    /**
	     * Patch current rule props with patchInfo
	     * @param patchInfo
	     */

	  }, {
	    key: 'patch',
	    value: function patch(patchInfo) {
	      // Invoke pre patching hook
	      if (this._hooks.prePatchApply && this._hooks.prePatchApply(this, patchInfo) === _VirtualActions2.default.PATCH_REJECT) return;

	      this._patchApply(patchInfo);

	      // Invoke post patching hook
	      if (this._hooks.postPatchApply) this._hooks.postPatchApply(this, patchInfo);
	    }

	    /**
	     * Parse head props from current rule
	     * @returns {{startOffset: number, endOffset: number}}
	     */

	  }, {
	    key: 'getHead',
	    value: function getHead() {
	      var i = void 0,
	          length = 0,
	          quotesCode = void 0,
	          nextCode = void 0,
	          prevCode = void 0;

	      // Get rule's head block length
	      for (i = 0; i < this.cssText.length; i++) {
	        nextCode = this.cssText.charCodeAt(i);

	        // Check if " or ' was spotted without escape \
	        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	          if (!!quotesCode) {
	            if (nextCode === quotesCode) quotesCode = undefined;
	          } else {
	            quotesCode = nextCode;
	          }
	        }

	        if (!quotesCode && (nextCode === OPEN_CURLY || nextCode === SEMICOLON)) break;

	        length++;
	        prevCode = nextCode;
	      }

	      // If there is no selectorText
	      if (!length) throw SyntaxError("Bad input");

	      return { startOffset: 0, endOffset: length };
	    }

	    /**
	     * Parse body props from current rule
	     * @returns {{startOffset: number, endOffset: number}}
	     */

	  }, {
	    key: 'getBody',
	    value: function getBody() {
	      var i = void 0,
	          quotesCode = void 0,
	          nextCode = void 0,
	          prevCode = void 0,
	          startOffset = void 0,
	          endOffset = void 0,
	          openCurlyCount = 0;

	      for (i = 0; i < this.cssText.length; i++) {
	        nextCode = this.cssText.charCodeAt(i);

	        // Check if " or ' was spotted without escape \
	        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	          if (!!quotesCode) {
	            if (nextCode === quotesCode) quotesCode = undefined;
	          } else {
	            quotesCode = nextCode;
	          }
	        }

	        if (!startOffset && !quotesCode && i < this.cssText.length - 1 && nextCode === OPEN_CURLY) {
	          startOffset = i + 1;
	        }

	        if (!quotesCode && nextCode === OPEN_CURLY) openCurlyCount++;
	        if (!quotesCode && nextCode === CLOSE_CURLY) openCurlyCount--;

	        if (!quotesCode && !openCurlyCount && nextCode === CLOSE_CURLY) {
	          endOffset = i;
	          break;
	        }

	        prevCode = nextCode;
	      }

	      if (!startOffset || !endOffset) throw SyntaxError("Bad input");

	      return { startOffset: startOffset, endOffset: endOffset };
	    }

	    /**
	     * Parse specific props for current rule type basing on parseType
	     * @param parseType
	     * @interface
	     */

	  }, {
	    key: 'parse',
	    value: function parse(parseType) {}
	  }]);

	  return VirtualRule;
	}();

	exports.default = VirtualRule;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualRule2 = __webpack_require__(5);

	var _VirtualRule3 = _interopRequireDefault(_VirtualRule2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * and associated documentation files (the "Software"), to deal in the Software without restriction,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The above copyright notice and this permission notice shall be included in all copies or substantial
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var VirtualStyleRule = function (_VirtualRule) {
	  _inherits(VirtualStyleRule, _VirtualRule);

	  function VirtualStyleRule(ruleInfo) {
	    var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var hooks = arguments[2];
	    var lazyParsing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	    _classCallCheck(this, VirtualStyleRule);

	    return _possibleConstructorReturn(this, (VirtualStyleRule.__proto__ || Object.getPrototypeOf(VirtualStyleRule)).call(this, ruleInfo, parentRule, hooks, lazyParsing));
	  }

	  /**
	   * Parse a formatted selectorText from current VirtualStyleRule
	   * @returns {String}
	   * @private
	   */


	  _createClass(VirtualStyleRule, [{
	    key: "_parseSelectorText",
	    value: function _parseSelectorText() {
	      var selectorText = void 0,
	          head = void 0;

	      // Get head props
	      head = _get(VirtualStyleRule.prototype.__proto__ || Object.getPrototypeOf(VirtualStyleRule.prototype), "getHead", this).call(this);

	      // Get raw selector text
	      selectorText = this.cssText.substring(head.startOffset, head.endOffset);

	      // Format selector text
	      selectorText = selectorText.trim().replace(/\n/gi, "");

	      return selectorText;
	    }

	    /**
	     * Parse additional VirtualStyleRule props
	     * @param parseType
	     */

	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) this.selectorText = this._parseSelectorText();
	    }

	    /**
	     * Applies a new selectorText to current VirtualStyleRule
	     * @param selectorText
	     */

	  }, {
	    key: "setSelector",
	    value: function setSelector(selectorText) {
	      var head = _get(VirtualStyleRule.prototype.__proto__ || Object.getPrototypeOf(VirtualStyleRule.prototype), "getHead", this).call(this);

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        start: head.startOffset,
	        end: head.endOffset,
	        value: selectorText,
	        patchDelta: selectorText.length - head.endOffset
	      });
	    }
	  }]);

	  return VirtualStyleRule;
	}(_VirtualRule3.default);

	exports.default = VirtualStyleRule;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
	 * and associated documentation files (the "Software"), to deal in the Software without restriction,
	 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
	 * subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all copies or substantial
	 * portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 */

	var TYPES = {
	  QUALIFIED_RULE_TOKEN: 1,
	  AT_RULE_TOKEN: 2,
	  COMMENT_TOKEN: 3,
	  WHITESPACE_TOKEN: 4,
	  UNKNOWN_TOKEN: 5
	};

	var WHITESPACE = ' '.charCodeAt(0);
	var NEW_LINE = '\n'.charCodeAt(0);
	var SLASH = '\\'.charCodeAt(0);
	var BACKSLASH = '/'.charCodeAt(0);
	var HASH = '#'.charCodeAt(0);
	var ASTERISK = '*'.charCodeAt(0);
	var DOT_SIGN = '.'.charCodeAt(0);
	var COLON = ':'.charCodeAt(0);
	var SEMICOLON = ';'.charCodeAt(0);
	var OPEN_SQUARE = '['.charCodeAt(0);
	var OPEN_CURLY = '{'.charCodeAt(0);
	var CLOSE_CURLY = '}'.charCodeAt(0);
	var AT_SIGN = '@'.charCodeAt(0);
	var SINGLE_QUOTE = '\''.charCodeAt(0);
	var DOUBLE_QUOTE = '\"'.charCodeAt(0);

	var CF_WORD = function CF_WORD(code) {
	  return code >= 128 || code === 45 || code == 245 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
	};

	/**
	 * Simple and fast top-level css rule based tokenizer. Use a tokenize() method to create a set of tokens.
	 * There are 5 levels (default is 2) of tokenization:
	 * 1 - include qualified rules only
	 * 2 - include qualified and at-rules only
	 * 3 - include qualified, at-rules and comments
	 * 4 - include qualified, at-rules, comments and whitespaces
	 * 5 - include any kind of data
	 *
	 * @example
	 * tokenizer = new VirtualTokenizer();
	 * tokens = tokenizer.tokenize("#example { }");
	 * tokens //=> [{type: 1, startOffset: 0, length: 12, value: "#example { }"}];
	 */

	var VirtualTokenizer = function () {
	  function VirtualTokenizer() {
	    _classCallCheck(this, VirtualTokenizer);
	  }

	  /**
	   * Read a qualified rule token starting at specified position
	   * @param cssText
	   * @param startIndex
	   * @returns {*}
	   */


	  _createClass(VirtualTokenizer, [{
	    key: 'getQualifiedRuleToken',
	    value: function getQualifiedRuleToken(cssText, startIndex) {
	      var index = startIndex,
	          length = 0,
	          fits = void 0,
	          nextCode = void 0,
	          prevCode = void 0,
	          startCode = cssText.charCodeAt(startIndex),
	          quotesCode = void 0;

	      if (startCode === ASTERISK || startCode === DOT_SIGN || CF_WORD(startCode) || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON) {
	        while (index < cssText.length) {
	          nextCode = cssText.charCodeAt(index);

	          // Check if " or ' was spotted without escape \
	          if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	            if (!!quotesCode) {
	              if (nextCode === quotesCode) quotesCode = undefined;
	            } else {
	              quotesCode = nextCode;
	            }
	          }

	          length++;
	          index++;

	          if (!quotesCode && fits && nextCode === OPEN_CURLY) fits = false;
	          if (!quotesCode && !fits && nextCode === OPEN_CURLY) fits = true;
	          if (!quotesCode && !fits && nextCode === SEMICOLON) break;
	          if (!quotesCode && nextCode === CLOSE_CURLY) break;

	          prevCode = nextCode;
	        }

	        return { type: fits ? TYPES.QUALIFIED_RULE_TOKEN : TYPES.UNKNOWN_TOKEN, startOffset: startIndex, length: length };
	      }

	      return null;
	    }

	    /**
	     * Read a at-rule token starting at specified position
	     * @param cssText
	     * @param startIndex
	     * @returns {*}
	     */

	  }, {
	    key: 'getAtRuleToken',
	    value: function getAtRuleToken(cssText, startIndex) {
	      var index = startIndex,
	          fits = void 0,
	          nextCode = void 0,
	          prevCode = void 0,
	          length = 0,
	          startCode = cssText.charCodeAt(startIndex),
	          quotesCode = void 0,
	          openCurlyCount = 0;

	      if (startCode === AT_SIGN) {
	        while (index < cssText.length) {
	          nextCode = cssText.charCodeAt(index);

	          // Check if " or ' was spotted without escape \
	          if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	            if (!!quotesCode) {
	              if (nextCode === quotesCode) quotesCode = undefined;
	            } else {
	              quotesCode = nextCode;
	            }
	          }

	          if (!quotesCode && !fits && (nextCode === OPEN_CURLY || nextCode === SEMICOLON)) fits = true;
	          if (!quotesCode && nextCode === OPEN_CURLY) openCurlyCount++;
	          if (!quotesCode && nextCode === CLOSE_CURLY) openCurlyCount--;

	          length++;
	          index++;

	          if (!quotesCode && !openCurlyCount && nextCode === SEMICOLON) break;
	          if (!quotesCode && !openCurlyCount && nextCode === CLOSE_CURLY) break;

	          prevCode = nextCode;
	        }

	        return { type: fits ? TYPES.AT_RULE_TOKEN : TYPES.UNKNOWN_TOKEN, startOffset: startIndex, length: length };
	      }

	      return null;
	    }

	    /**
	     * Read a comment token starting at specified position
	     * @param cssText
	     * @param startIndex
	     * @returns {*}
	     */

	  }, {
	    key: 'getCommentToken',
	    value: function getCommentToken(cssText, startIndex) {
	      var startCode = cssText.charCodeAt(startIndex),
	          prevCode = void 0,
	          nextCode = void 0,
	          length = 1;

	      if (startCode === BACKSLASH && (nextCode = cssText.charCodeAt(startIndex + length++) === ASTERISK)) {
	        while (nextCode) {
	          prevCode = nextCode;
	          nextCode = cssText.charCodeAt(startIndex + length);

	          if (nextCode) length++;
	          if (prevCode === ASTERISK && nextCode === BACKSLASH) break;
	        }
	        return { type: TYPES.COMMENT_TOKEN, startOffset: startIndex, length: length };
	      }
	      return null;
	    }

	    /**
	     * Read a whitespace token starting at specified position
	     * @param cssText
	     * @param startIndex
	     * @returns {*}
	     */

	  }, {
	    key: 'getWhitespaceToken',
	    value: function getWhitespaceToken(cssText, startIndex) {
	      var index = startIndex,
	          nextCode = void 0,
	          length = 0;

	      while (index < cssText.length) {
	        nextCode = cssText.charCodeAt(index);

	        if (nextCode !== WHITESPACE && nextCode !== NEW_LINE) break;

	        length++;
	        index++;
	      }

	      if (length) {
	        return { type: TYPES.WHITESPACE_TOKEN, startOffset: startIndex, length: length };
	      }

	      return null;
	    }

	    /**
	     * Read an unknown token starting at specified position
	     * @param cssText
	     * @param startIndex
	     * @returns {*}
	     */

	  }, {
	    key: 'getUnknownToken',
	    value: function getUnknownToken(cssText, startIndex) {
	      var index = startIndex,
	          nextCode = void 0,
	          secondCode = void 0,
	          thirdCode = void 0,
	          length = 0,
	          isNextTokenBounds = void 0;

	      while (index < cssText.length) {
	        switch (nextCode = cssText.charCodeAt(index)) {
	          case SLASH:
	            if (secondCode = cssText.charCodeAt(index + 1) === ASTERISK) isNextTokenBounds = true;
	            break;

	          case NEW_LINE:
	          case WHITESPACE:
	            isNextTokenBounds = true;
	            break;
	        }

	        if (isNextTokenBounds) break;

	        length++;
	        index++;
	      }

	      if (length) {
	        return { type: TYPES.UNKNOWN_TOKEN, startOffset: startIndex, length: length };
	      }

	      return null;
	    }

	    /**
	     * Read a token starting at specified position
	     * @param cssText
	     * @param startIndex
	     * @returns {object}
	     */

	  }, {
	    key: 'getToken',
	    value: function getToken(cssText, startIndex) {
	      var token = void 0,
	          startCode = cssText.charCodeAt(startIndex);

	      switch (startCode) {
	        case AT_SIGN:
	          if (token = this.getAtRuleToken(cssText, startIndex)) return token;
	          break;

	        case NEW_LINE:
	        case WHITESPACE:
	          if (token = this.getWhitespaceToken(cssText, startIndex)) return token;
	          break;

	        case SLASH:
	          if (token = this.getCommentToken(cssText, startIndex)) return token;
	          break;

	        default:
	          if (token = this.getQualifiedRuleToken(cssText, startIndex)) return token;
	          break;
	      }
	      return this.getUnknownToken(cssText, startIndex);
	    }

	    /**
	     * Create a set of grammar tokens basing on tokenization level (default is 2).
	     * There are 5 levels of tokenization:
	     * 1 - include qualified rules only
	     * 2 - include qualified and at-rules only
	     * 3 - include qualified, at-rules and comments
	     * 4 - include qualified, at-rules, comments and whitespaces
	     * 5 - include any kind of data
	     * @param cssText - source css text
	     * @param level - level of tokenization ( 1 to 5 )
	     * @returns {Array}
	     */

	  }, {
	    key: 'tokenize',
	    value: function tokenize(cssText) {
	      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

	      var tokens = [],
	          token = void 0,
	          index = 0,
	          i = void 0;

	      while (index < cssText.length) {

	        // Create a token
	        token = this.getToken(cssText, index);

	        // Shift loop pointer by token size
	        index = index + token.length;

	        // Add token to tokensList if satisfy tokenization level
	        if (token.type <= level) {
	          token = Object.assign({}, token, { value: cssText.substr(token.startOffset, token.length) });
	          tokens.push(token);
	        }
	      }

	      return tokens;
	    }
	  }]);

	  return VirtualTokenizer;
	}();

	Object.assign(VirtualTokenizer, TYPES);

	exports.default = VirtualTokenizer;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and associated documentation files (the "Software"), to deal in the Software without restriction,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * subject to the following conditions:
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The above copyright notice and this permission notice shall be included in all copies or substantial
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * portions of the Software.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualGrammar = __webpack_require__(1);

	var _VirtualGrammar2 = _interopRequireDefault(_VirtualGrammar);

	var _VirtualRuleList = __webpack_require__(4);

	var _VirtualRuleList2 = _interopRequireDefault(_VirtualRuleList);

	var _VirtualRuleFactory = __webpack_require__(2);

	var _VirtualRuleFactory2 = _interopRequireDefault(_VirtualRuleFactory);

	var _VirtualTokenizer = __webpack_require__(7);

	var _VirtualTokenizer2 = _interopRequireDefault(_VirtualTokenizer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualStyleSheet = function () {
	  function VirtualStyleSheet(hooks) {
	    _classCallCheck(this, VirtualStyleSheet);

	    this.rules = [];
	    this._hooks = hooks;
	  }

	  _createClass(VirtualStyleSheet, [{
	    key: "parseFromString",
	    value: function parseFromString(cssText) {
	      var tokenizer = new _VirtualTokenizer2.default(),
	          tokens = void 0,
	          i = void 0,
	          rule = void 0,
	          rules = void 0,
	          id = 0;
	      tokens = tokenizer.tokenize(cssText);

	      if (tokens.length) {
	        rules = new _VirtualRuleList2.default();

	        for (i = 0; i < tokens.length; i++) {
	          rule = _VirtualRuleFactory2.default.createFromToken(tokens[i], this, this._hooks);
	          if (rule) rules.insert(rule, id++);
	        }

	        this.rules = rules;
	      }
	    }
	  }]);

	  return VirtualStyleSheet;
	}();

	Object.assign(VirtualStyleSheet, _VirtualActions2.default);
	Object.assign(VirtualStyleSheet, _VirtualGrammar2.default.getTypes());

	exports.default = VirtualStyleSheet;

/***/ }
/******/ ])
});
;