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
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _VirtualGrammar = __webpack_require__(1);

	var _VirtualGrammar2 = _interopRequireDefault(_VirtualGrammar);

	var _VirtualRuleFactory = __webpack_require__(2);

	var _VirtualRuleFactory2 = _interopRequireDefault(_VirtualRuleFactory);

	var _VirtualStyleSheet = __webpack_require__(21);

	var _VirtualStyleSheet2 = _interopRequireDefault(_VirtualStyleSheet);

	var _VirtualList = __webpack_require__(4);

	var _VirtualList2 = _interopRequireDefault(_VirtualList);

	var _VirtualTokenizer = __webpack_require__(14);

	var _VirtualTokenizer2 = _interopRequireDefault(_VirtualTokenizer);

	var _VirtualStyleDeclarationParser = __webpack_require__(9);

	var _VirtualStyleDeclarationParser2 = _interopRequireDefault(_VirtualStyleDeclarationParser);

	var _VirtualRule = __webpack_require__(5);

	var _VirtualRule2 = _interopRequireDefault(_VirtualRule);

	var _VirtualGroupingRule = __webpack_require__(13);

	var _VirtualGroupingRule2 = _interopRequireDefault(_VirtualGroupingRule);

	var _VirtualStyleDeclarationRule = __webpack_require__(8);

	var _VirtualStyleDeclarationRule2 = _interopRequireDefault(_VirtualStyleDeclarationRule);

	var _VirtualCharsetRule = __webpack_require__(6);

	var _VirtualCharsetRule2 = _interopRequireDefault(_VirtualCharsetRule);

	var _VirtualStyleRule = __webpack_require__(7);

	var _VirtualStyleRule2 = _interopRequireDefault(_VirtualStyleRule);

	var _VirtualImportRule = __webpack_require__(10);

	var _VirtualImportRule2 = _interopRequireDefault(_VirtualImportRule);

	var _VirtualViewportRule = __webpack_require__(11);

	var _VirtualViewportRule2 = _interopRequireDefault(_VirtualViewportRule);

	var _VirtualFontFaceRule = __webpack_require__(12);

	var _VirtualFontFaceRule2 = _interopRequireDefault(_VirtualFontFaceRule);

	var _VirtualMediaRule = __webpack_require__(15);

	var _VirtualMediaRule2 = _interopRequireDefault(_VirtualMediaRule);

	var _VirtualKeyframeRule = __webpack_require__(16);

	var _VirtualKeyframeRule2 = _interopRequireDefault(_VirtualKeyframeRule);

	var _VirtualKeyframesRule = __webpack_require__(17);

	var _VirtualKeyframesRule2 = _interopRequireDefault(_VirtualKeyframesRule);

	var _VirtualPageRule = __webpack_require__(18);

	var _VirtualPageRule2 = _interopRequireDefault(_VirtualPageRule);

	var _VirtualNamespaceRule = __webpack_require__(19);

	var _VirtualNamespaceRule2 = _interopRequireDefault(_VirtualNamespaceRule);

	var _VirtualSupportsRule = __webpack_require__(20);

	var _VirtualSupportsRule2 = _interopRequireDefault(_VirtualSupportsRule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	* Copyright (c) 2017 Eugene Ford (stmechanus@gmail.com)
	*
	* Permission is hereby granted, free of charge, to any person obtaining a copy of this software
	* and associated documentation files (the "Software"), to deal in the Software without restriction,
	* including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
	* and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
	* subject to the following conditions:
	*
	* The above copyright notice  and this permission notice shall be included in all copies or substantial
	* portions of the Software.
	*
	* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY  OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
	* LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	* OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/

	module.exports = {
	  VirtualGrammar: _VirtualGrammar2.default,
	  VirtualRuleFactory: _VirtualRuleFactory2.default,
	  VirtualRule: _VirtualRule2.default,
	  VirtualGroupingRule: _VirtualGroupingRule2.default,
	  VirtualStyleDeclarationRule: _VirtualStyleDeclarationRule2.default,
	  VirtualCharsetRule: _VirtualCharsetRule2.default,
	  VirtualStyleRule: _VirtualStyleRule2.default,
	  VirtualViewportRule: _VirtualViewportRule2.default,
	  VirtualFontFaceRule: _VirtualFontFaceRule2.default,
	  VirtualMediaRule: _VirtualMediaRule2.default,
	  VirtualKeyframeRule: _VirtualKeyframeRule2.default,
	  VirtualKeyframesRule: _VirtualKeyframesRule2.default,
	  VirtualPageRule: _VirtualPageRule2.default,
	  VirtualNamespaceRule: _VirtualNamespaceRule2.default,
	  VirtualSupportsRule: _VirtualSupportsRule2.default,
	  VirtualList: _VirtualList2.default,
	  VirtualTokenizer: _VirtualTokenizer2.default,
	  VirtualStyleDeclarationParser: _VirtualStyleDeclarationParser2.default,
	  VirtualImportRule: _VirtualImportRule2.default,
	  VirtualStyleSheet: _VirtualStyleSheet2.default
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	      types.UNKNOWN_RULE = this.UNKNOWN_RULE;
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
	      return true;
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
	      if (codes[i] < 48 || codes[i] > 57) return false;
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualGrammar = __webpack_require__(1);

	var _VirtualGrammar2 = _interopRequireDefault(_VirtualGrammar);

	var _VirtualList = __webpack_require__(4);

	var _VirtualList2 = _interopRequireDefault(_VirtualList);

	var _VirtualRule = __webpack_require__(5);

	var _VirtualRule2 = _interopRequireDefault(_VirtualRule);

	var _VirtualCharsetRule = __webpack_require__(6);

	var _VirtualCharsetRule2 = _interopRequireDefault(_VirtualCharsetRule);

	var _VirtualStyleRule = __webpack_require__(7);

	var _VirtualStyleRule2 = _interopRequireDefault(_VirtualStyleRule);

	var _VirtualImportRule = __webpack_require__(10);

	var _VirtualImportRule2 = _interopRequireDefault(_VirtualImportRule);

	var _VirtualViewportRule = __webpack_require__(11);

	var _VirtualViewportRule2 = _interopRequireDefault(_VirtualViewportRule);

	var _VirtualFontFaceRule = __webpack_require__(12);

	var _VirtualFontFaceRule2 = _interopRequireDefault(_VirtualFontFaceRule);

	var _VirtualGroupingRule = __webpack_require__(13);

	var _VirtualGroupingRule2 = _interopRequireDefault(_VirtualGroupingRule);

	var _VirtualMediaRule = __webpack_require__(15);

	var _VirtualMediaRule2 = _interopRequireDefault(_VirtualMediaRule);

	var _VirtualKeyframeRule = __webpack_require__(16);

	var _VirtualKeyframeRule2 = _interopRequireDefault(_VirtualKeyframeRule);

	var _VirtualKeyframesRule = __webpack_require__(17);

	var _VirtualKeyframesRule2 = _interopRequireDefault(_VirtualKeyframesRule);

	var _VirtualPageRule = __webpack_require__(18);

	var _VirtualPageRule2 = _interopRequireDefault(_VirtualPageRule);

	var _VirtualNamespaceRule = __webpack_require__(19);

	var _VirtualNamespaceRule2 = _interopRequireDefault(_VirtualNamespaceRule);

	var _VirtualSupportsRule = __webpack_require__(20);

	var _VirtualSupportsRule2 = _interopRequireDefault(_VirtualSupportsRule);

	var _VirtualTokenizer = __webpack_require__(14);

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
	   * @param opts
	   * @returns {null}
	   */


	  _createClass(VirtualRuleFactory, [{
	    key: "create",
	    value: function create(ruleInfo) {
	      var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      if (ruleInfo === undefined) throw Error("ruleInfo is missing");
	      if (ruleInfo.type === _VirtualGrammar2.default.UNKNOWN_RULE && !opts.acceptUnknown) return null;

	      var filterResult = void 0,
	          rule = void 0;

	      // Apply a pre parsing filter if was specified
	      if (opts.preParsingFilter) {
	        if ((filterResult = opts.preParsingFilter(ruleInfo)) === _VirtualActions2.default.FILTER_REJECT) return null;
	        filterResult = filterResult < 0 ? filterResult : 0;
	      }

	      // Create a VirtualRule based on type in ruleInfo
	      if (!!this._types[ruleInfo.type]) {
	        rule = new this._types[ruleInfo.type](ruleInfo, parentRule, Object.assign({}, opts, { lazyParsing: filterResult }));
	        rule.type = ruleInfo.type;
	        return rule;
	      }
	      // Otherwise throw a TypeError
	      throw new TypeError("There is no ruleClass associated with " + ruleInfo.type);
	    }

	    /**
	     * Create a new VirtualRule from token
	     * @param token
	     * @param parentRule
	     * @param opts
	     * @returns {null}
	     */

	  }, {
	    key: "createFromToken",
	    value: function createFromToken(token, parentRule, opts) {
	      var type = void 0,
	          ruleInfo = void 0;

	      if (token === undefined) throw new Error("Token  is missing");

	      type = _VirtualGrammar2.default.getRuleType(token.value);

	      ruleInfo = {
	        type: type,
	        startOffset: token.startOffset,
	        endOffset: token.startOffset + token.length,
	        cssText: token.value
	      };

	      return this.create(ruleInfo, parentRule, opts);
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
	      return true;
	    }
	  }]);

	  return VirtualRuleFactory;
	}();

	var RuleFactory = new VirtualRuleFactory();

	RuleFactory.register(_VirtualGrammar2.default.UNKNOWN_RULE, _VirtualRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.STYLE_RULE, _VirtualStyleRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.CHARSET_RULE, _VirtualCharsetRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.IMPORT_RULE, _VirtualImportRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.MEDIA_RULE, _VirtualMediaRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.FONT_FACE_RULE, _VirtualFontFaceRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.PAGE_RULE, _VirtualPageRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.KEYFRAME_RULE, _VirtualKeyframeRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.KEYFRAMES_RULE, _VirtualKeyframesRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.NAMESPACE_RULE, _VirtualNamespaceRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.SUPPORTS_RULE, _VirtualSupportsRule2.default);
	RuleFactory.register(_VirtualGrammar2.default.VIEWPORT_RULE, _VirtualViewportRule2.default);

	exports.default = RuleFactory;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VirtualList = function () {
	  function VirtualList() {
	    _classCallCheck(this, VirtualList);

	    this._items = [];
	    this.length = 0;
	  }

	  /**
	   * Inserts an additional item at specified position index in current VirtualList.
	   * @param item
	   * @param index
	   */


	  _createClass(VirtualList, [{
	    key: "insert",
	    value: function insert(item, index) {
	      var id = void 0;
	      if (!item) throw new Error("item is not defined");
	      if (index < 0) throw new Error("index should be a positive int");

	      if (typeof index === "undefined" || index > this._items.length) {
	        id = this._items.length;
	      } else {
	        id = index;
	      }

	      item.id = id;
	      this._items.splice(id, 0, item);
	      this.length = this._items.length;

	      for (var i = id + 1; i < this._items.length; i++) {
	        this._items[i].id = i;
	      }
	    }

	    /**
	     * Removes the item at target position index. Returns removed item
	     * @param id
	     * @returns {object}
	     *
	     * @throws Error = if there is not item with specified id
	     */

	  }, {
	    key: "remove",
	    value: function remove(id) {
	      if (typeof id === "undefined") throw new Error("id is not defined");
	      if (id < 0) throw new Error("id should be a positive int");
	      if (id >= this._items.length) throw new Error("id (" + id + ") is out of range (" + this._items.length + ")");

	      for (var i = id + 1; i < this._items.length; i++) {
	        this._items[i].id -= 1;
	      }
	      this.length = this._items.length - 1;
	      return this._items.splice(id, 1)[0];
	    }

	    /**
	     * Returns the item that has target id.
	     * @param id
	     * @returns {object}
	     */

	  }, {
	    key: "get",
	    value: function get(id) {
	      return this._items[id];
	    }

	    /**
	     * Returns a set of items that satisfy specified target filterFunc function and
	     * VirtualStyleSheet.FILTER_ACCEPT, VirtualStyleSheet.FILTER_REJECT flags returned by it.
	     * @param filterFunc
	     * @returns {Array}
	     */

	  }, {
	    key: "filter",
	    value: function filter(filterFunc) {
	      return this._items.filter(filterFunc);
	    }
	  }]);

	  return VirtualList;
	}();

	exports.default = VirtualList;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
	var ASTERISK = '*'.charCodeAt(0);
	var BACKSLASH = '/'.charCodeAt(0);

	var VirtualRule = function () {
	  function VirtualRule(ruleInfo) {
	    var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, VirtualRule);

	    if (!ruleInfo) throw new Error("ruleInfo is missing");
	    if (typeof ruleInfo.startOffset === "undefined" || typeof ruleInfo.endOffset === "undefined" || typeof ruleInfo.cssText === "undefined") {
	      throw new Error("Bad input");
	    }

	    this._opts = opts;

	    this.startOffset = ruleInfo.startOffset;
	    this.endOffset = ruleInfo.endOffset;
	    this.cssText = ruleInfo.cssText;
	    this.parentRule = parentRule;
	    this.lazyParsing = opts.lazyParsing || 0;
	    this._parseInvoke();
	  }

	  /**
	   * Apply update action to current rule
	   * @param patchInfo
	   * @private
	   */


	  _createClass(VirtualRule, [{
	    key: '_patchUpdateApply',
	    value: function _patchUpdateApply(patchInfo) {
	      if (patchInfo.patchDelta) {
	        this.startOffset += patchInfo.patchDelta;
	        this.endOffset += patchInfo.patchDelta;
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
	      /*istanbul ignore else*/
	      if (patchInfo.reparse) this._parseInvoke();
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
	      /*istanbul ignore else*/
	      if (patchInfo.reparse) this._parseInvoke();
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
	      /*istanbul ignore else*/
	      if (patchInfo.reparse) this._parseInvoke();
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
	      /*istanbul ignore else*/
	      if (patchInfo.reparse) this._parseInvoke();
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
	      /*istanbul ignore else*/
	      if (patchInfo.reparse) this._parseInvoke();
	    }

	    /**
	     * Apply patch changes
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
	     * @param ref
	     */

	  }, {
	    key: 'patch',
	    value: function patch(patchInfo) {
	      // Invoke pre patching hook
	      if (this._opts.prePatchApply && this._opts.prePatchApply(this, patchInfo) === _VirtualActions2.default.PATCH_REJECT) return;

	      // Accept rule reparse as default postPatch behavior
	      if (patchInfo.reparse === undefined) {
	        patchInfo = Object.assign({}, patchInfo, { reparse: true });
	      }

	      this._patchApply(patchInfo);

	      // Invoke post patching hook
	      if (this._opts.postPatchApply) this._opts.postPatchApply(this, patchInfo);
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
	     * @returns {object}
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
	          openCurlyCount = 0,
	          commentOpened = void 0;

	      for (i = 0; i < this.cssText.length; i++) {
	        nextCode = this.cssText.charCodeAt(i);

	        // If there are not opened comment
	        if (!commentOpened) {
	          if (prevCode === BACKSLASH && nextCode === ASTERISK) commentOpened = true;

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

	          if (!quotesCode && openCurlyCount === 0 && nextCode === SEMICOLON) return null;
	          if (!quotesCode && nextCode === OPEN_CURLY) openCurlyCount++;
	          if (!quotesCode && nextCode === CLOSE_CURLY) openCurlyCount--;

	          if (!quotesCode && !openCurlyCount && nextCode === CLOSE_CURLY) {
	            endOffset = i;
	            break;
	          }
	        }
	        // Otherwise, check if comment is closed
	        else {
	            if (prevCode === ASTERISK && nextCode === BACKSLASH) commentOpened = false;
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SINGLE_QUOTE = "\'".charCodeAt(0);
	var DOUBLE_QUOTE = "\"".charCodeAt(0);
	var SLASH = "\\".charCodeAt(0);

	var VirtualCharsetRule = function (_VirtualRule) {
	  _inherits(VirtualCharsetRule, _VirtualRule);

	  function VirtualCharsetRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualCharsetRule);

	    return _possibleConstructorReturn(this, (VirtualCharsetRule.__proto__ || Object.getPrototypeOf(VirtualCharsetRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  /**
	   * Parse encoding prop from current cssText
	   * @private
	   */


	  _createClass(VirtualCharsetRule, [{
	    key: "_parseEncoding",
	    value: function _parseEncoding() {
	      var i = void 0,
	          nextCode = void 0,
	          prevCode = void 0,
	          quotesCode = void 0,
	          startOffset = void 0,
	          endOffset = void 0;

	      // Skip @charset definition, starting at 8
	      for (i = 8; i < this.cssText.length; i++) {
	        nextCode = this.cssText.charCodeAt(i);

	        // Check if " or ' was spotted without escape \
	        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	          if (!!quotesCode) {
	            if (nextCode === quotesCode) {
	              endOffset = i;
	              break;
	            }
	          } else {
	            quotesCode = nextCode;
	            startOffset = i + 1;
	          }
	        }

	        prevCode = nextCode;
	      }

	      // Return null if encoding bounds wasnt found
	      if (startOffset === undefined || endOffset === undefined) return null;

	      return this.cssText.substring(startOffset, endOffset);
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualCharsetRule.prototype.__proto__ || Object.getPrototypeOf(VirtualCharsetRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        this.encoding = this._parseEncoding();
	      } else {
	        this.encoding = null;
	      }
	    }

	    /**
	     * Applies new encoding to current rule
	     * @param encoding
	     */

	  }, {
	    key: "setEncoding",
	    value: function setEncoding(encoding) {
	      if (typeof encoding !== "string") throw new TypeError("Encoding is not a string");

	      var newCharset = "@charset \"" + encoding + "\";";

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        start: 0,
	        end: this.cssText.length,
	        value: newCharset,
	        patchDelta: newCharset.length - this.cssText.length
	      });
	    }
	  }]);

	  return VirtualCharsetRule;
	}(_VirtualRule3.default);

	exports.default = VirtualCharsetRule;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualStyleDeclarationRule = __webpack_require__(8);

	var _VirtualStyleDeclarationRule2 = _interopRequireDefault(_VirtualStyleDeclarationRule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualStyleRule = function (_VirtualStyleDeclarat) {
	  _inherits(VirtualStyleRule, _VirtualStyleDeclarat);

	  function VirtualStyleRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualStyleRule);

	    return _possibleConstructorReturn(this, (VirtualStyleRule.__proto__ || Object.getPrototypeOf(VirtualStyleRule)).call(this, ruleInfo, parentRule, opts));
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
	      _get(VirtualStyleRule.prototype.__proto__ || Object.getPrototypeOf(VirtualStyleRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        this.selectorText = this._parseSelectorText();
	      } else {
	        this.selectorText = null;
	      }
	    }

	    /**
	     * Applies a new selectorText to current VirtualStyleRule
	     * @param selectorText
	     */

	  }, {
	    key: "setSelector",
	    value: function setSelector(selectorText) {
	      if (typeof selectorText !== "string") throw new TypeError("Your selectorText is not a string");
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
	}(_VirtualStyleDeclarationRule2.default);

	exports.default = VirtualStyleRule;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _VirtualStyleDeclarationParser = __webpack_require__(9);

	var _VirtualStyleDeclarationParser2 = _interopRequireDefault(_VirtualStyleDeclarationParser);

	var _VirtualList = __webpack_require__(4);

	var _VirtualList2 = _interopRequireDefault(_VirtualList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NEW_LINE = "\n".charCodeAt(0);
	var WHITESPACE = " ".charCodeAt(0);
	var SEMICOLON = ";".charCodeAt(0);

	var VirtualStyleDeclarationRule = function (_VirtualRule) {
	  _inherits(VirtualStyleDeclarationRule, _VirtualRule);

	  function VirtualStyleDeclarationRule(ruleInfo) {
	    var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var opts = arguments[2];

	    _classCallCheck(this, VirtualStyleDeclarationRule);

	    return _possibleConstructorReturn(this, (VirtualStyleDeclarationRule.__proto__ || Object.getPrototypeOf(VirtualStyleDeclarationRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  /**
	   * Changes an existing style declaration
	   * @param declaration
	   * @param property
	   * @param value
	   * @private
	   */


	  _createClass(VirtualStyleDeclarationRule, [{
	    key: "_changeProperty",
	    value: function _changeProperty(declaration, property, value) {
	      var body = void 0,
	          start = void 0,
	          end = void 0,
	          code = void 0,
	          suffix = void 0,
	          val = void 0,
	          original = void 0,
	          i = void 0;
	      // Get body block bounds
	      body = this.getBody();

	      // Calculate patch bounds
	      start = body.startOffset + declaration.startOffset;
	      end = body.startOffset + declaration.endOffset;

	      // Copy style declaration suffix for proper formatting
	      original = this.cssText.substring(start, end);
	      suffix = 0;
	      for (i = original.length - 1; i >= 0; i++) {
	        code = original.charCodeAt(i);
	        if (code !== WHITESPACE && code !== SEMICOLON && code !== NEW_LINE) break;
	        suffix++;
	      }

	      // Recreate new style declaration in string format
	      val = property + ": " + value + original.substr(original.length - suffix);

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        value: val, start: start, end: end,
	        patchDelta: val.length - (declaration.endOffset - declaration.startOffset)
	      });
	    }

	    /**
	     * Create new style declaration
	     * @param property
	     * @param value
	     * @private
	     */

	  }, {
	    key: "_appendProperty",
	    value: function _appendProperty(property, value) {
	      var declaration = void 0,
	          bounds = void 0,
	          val = void 0,
	          code = void 0,
	          start = void 0,
	          end = void 0,
	          suffix = void 0,
	          i = void 0,
	          prefix = void 0;

	      // Get body block bounds
	      bounds = this.getBody();

	      // Append new style declaration to existing ones
	      if (this.style && this.style.length) {
	        // Get the new declaration suffix
	        suffix = 0;
	        i = bounds.endOffset;
	        while (i-- >= 0) {
	          code = this.cssText.charCodeAt(i);
	          if (code !== WHITESPACE && code !== NEW_LINE) break;
	          suffix++;
	        }
	        suffix = this.cssText.substring(bounds.endOffset - suffix, bounds.endOffset);

	        // Get the new declaration prefix
	        declaration = this.style.get(0);
	        prefix = this.cssText.substring(bounds.startOffset, bounds.startOffset + declaration.startOffset);

	        // Build new declaration string
	        val = "" + prefix + property + ": " + value + ";" + suffix;
	        start = bounds.endOffset - suffix.length;
	        end = bounds.endOffset;

	        // Check if last declaration is closed with ;
	        declaration = this.style.get(this.style.length - 1);
	        if (declaration.endOffset === bounds.endOffset - bounds.startOffset) {
	          val = ";" + val;
	        }
	      }
	      // Or create completely new style declaration
	      else {
	          val = "\n  " + property + ": " + value + ";\n";
	          start = bounds.startOffset;
	          end = bounds.endOffset;
	        }

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        start: start, end: end, value: val,
	        patchDelta: val.length - (end - start)
	      });
	    }

	    /**
	     * Insert target style declaration at specified position
	     * @param id
	     * @param property
	     * @param value
	     * @private
	     */

	  }, {
	    key: "_insertProperty",
	    value: function _insertProperty(id, property, value) {
	      var declaration = void 0,
	          start = void 0,
	          val = void 0,
	          bounds = void 0,
	          suffix = void 0,
	          prefix = void 0;

	      // Get body block bounds
	      bounds = this.getBody();

	      // Get a style declaration at specified position
	      declaration = this.style.get(id);

	      // Try to append new style declaration to current set
	      if (id >= this.style.length) {
	        this._appendProperty(property, value);
	      }
	      // Or insert somewhere in the middle
	      else if (id >= 0) {
	          start = bounds.startOffset + declaration.startOffset;
	          suffix = this.cssText.substring(bounds.startOffset, bounds.startOffset + this.style.get(0).startOffset);
	          val = property + ": " + value + ";" + suffix;

	          this.patch({
	            action: _VirtualActions2.default.PATCH_INSERT,
	            start: start, value: val, patchDelta: val.length
	          });
	        }
	        // Otherwise, throw an error
	        else {
	            throw new Error("Cant insert a property at negative position " + id);
	          }
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualStyleDeclarationRule.prototype.__proto__ || Object.getPrototypeOf(VirtualStyleDeclarationRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_BODY || parseType == _VirtualActions2.default.PARSE_ALL) {
	        var bounds = void 0,
	            body = void 0,
	            declarations = void 0,
	            style = void 0,
	            i = void 0;

	        // Get Rule body bounds (startOffset and endOffset)
	        bounds = this.getBody();
	        body = this.cssText.substring(bounds.startOffset, bounds.endOffset);

	        // Get a set of declarations to work with
	        declarations = _VirtualStyleDeclarationParser2.default.parse(body);

	        if (declarations.length) {
	          style = new _VirtualList2.default();

	          for (i = 0; i < declarations.length; i++) {
	            style.insert(declarations[i]);
	          }

	          this.style = style;
	          return;
	        }
	      }
	      this.style = null;
	    }

	    /**
	     * Returns the property value.
	     * @param property
	     * @returns {string|null}
	     */

	  }, {
	    key: "getPropertyValue",
	    value: function getPropertyValue(property) {
	      if (typeof property !== "string") throw new TypeError("Property is not a string.");
	      var i = void 0,
	          declaration = void 0;

	      if (this.style) {
	        for (i = 0; i < this.style.length; i++) {
	          declaration = this.style.get(i);

	          if (declaration.property === property) return declaration.value;
	        }
	      }

	      return null;
	    }

	    /**
	     * Returns true if property has !important priority.
	     * @param property
	     */

	  }, {
	    key: "isImportant",
	    value: function isImportant(property) {
	      if (typeof property !== "string") throw new TypeError("Property is not a string.");
	      var i = void 0,
	          declaration = void 0;
	      if (this.style) {
	        for (i = 0; i < this.style.length; i++) {
	          declaration = this.style.get(i);

	          if (declaration.property === property) return declaration.isImportant;
	        }
	      }

	      return false;
	    }

	    /**
	     * Deletes a target property from current VirtualStyleDeclaration.
	     * @param property
	     * @returns {string|null}
	     */

	  }, {
	    key: "removeProperty",
	    value: function removeProperty(property) {
	      if (typeof property !== "string") throw new TypeError("Property is not a string.");
	      var i = void 0,
	          declaration = void 0,
	          body = void 0,
	          isChanged = void 0;

	      // Try to remove target property from style declaration list
	      if (this.style) {
	        for (i = this.style.length - 1; i >= 0; i--) {
	          declaration = this.style.get(i);
	          if (declaration.property === property) {
	            this.style.remove(i);
	            isChanged = true;
	            break;
	          }
	        }
	      }

	      // Apply delete patch to this rule is style declaration list was changed
	      if (isChanged) {
	        // Get body block bounds
	        body = this.getBody();

	        this.patch({
	          action: _VirtualActions2.default.PATCH_DELETE,
	          start: body.startOffset + declaration.startOffset,
	          end: body.startOffset + declaration.endOffset,
	          patchDelta: -(declaration.endOffset - declaration.startOffset)
	        });

	        return declaration.value;
	      }
	      return null;
	    }

	    /**
	     * Applies a property changes in current VirtualStyleDeclaration.
	     * @param property
	     * @param value
	     */

	  }, {
	    key: "setProperty",
	    value: function setProperty(property, value) {
	      if (typeof property !== "string") throw new TypeError("Property is not a string.");
	      if (typeof value !== "string") throw new TypeError("Value is not a string.");

	      var newDecl = void 0,
	          i = void 0,
	          declaration = void 0,
	          changable = void 0;

	      //Try to build a new style declaration using StyleDeclarationParser
	      newDecl = _VirtualStyleDeclarationParser2.default.getDeclarationToken(property + ": " + value + ";", 0);

	      // Check for bad input
	      if (!newDecl.property || !newDecl.value) throw new SyntaxError("Bad input");

	      if (this.style) {
	        for (i = this.style.length - 1; i >= 0; i--) {
	          declaration = this.style.get(i);

	          // Check if existing rule can be replaced
	          if (declaration.property === property) {
	            changable = true;
	            break;
	          }
	        }
	      }

	      // Replace existing style declaration
	      if (changable) {
	        this._changeProperty(declaration, property, value);
	      }
	      // Or create new style declaration
	      else {
	          this._appendProperty(property, value);
	        }
	    }

	    /**
	     * Inserts a property at specified position of style declaration set
	     * @param id
	     * @param property
	     * @param value
	     */

	  }, {
	    key: "insertProperty",
	    value: function insertProperty(id, property, value) {
	      if (typeof id !== "number") throw new TypeError("ID is not a number.");
	      if (typeof property !== "string") throw new TypeError("Property is not a string.");
	      if (typeof value !== "string") throw new TypeError("Value is not a string.");

	      // Try to insert new style declaration into existing set
	      if (this.style && this.style.length) {
	        this._insertProperty(id, property, value);
	      }
	      // Otherwise, create completely new set
	      else {
	          this._appendProperty(property, value);
	        }
	    }
	  }]);

	  return VirtualStyleDeclarationRule;
	}(_VirtualRule3.default);

	exports.default = VirtualStyleDeclarationRule;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WHITESPACE = " ".charCodeAt(0);
	var NEW_LINE = "\n".charCodeAt(0);
	var SLASH = "/".charCodeAt(0);
	var SINGLE_QUOTE = "\'".charCodeAt(0);
	var DOUBLE_QUOTE = "\"".charCodeAt(0);
	var MINUS = "-".charCodeAt(0);
	var COLON = ":".charCodeAt(0);
	var ASTERISK = "*".charCodeAt(0);
	var SEMICOLON = ";".charCodeAt(0);
	var CURLY_OPEN = "{".charCodeAt(0);
	var CURLY_CLOSE = "}".charCodeAt(0);
	var EXCLAMATION = "!".charCodeAt(0);

	var CF_LETTER = function CF_LETTER(code) {
	  return code >= 65 && code <= 90 || code >= 97 && code <= 122;
	};

	var VirtualStyleDeclarationParser = function () {
	  function VirtualStyleDeclarationParser() {
	    _classCallCheck(this, VirtualStyleDeclarationParser);

	    throw new Error("Attempt to create a copy of static class");
	  }

	  _createClass(VirtualStyleDeclarationParser, null, [{
	    key: "getWhitespaceLength",
	    value: function getWhitespaceLength(cssText, startIndex) {
	      var index = startIndex,
	          nextCode = void 0,
	          endOffset = void 0;

	      while (index < cssText.length) {
	        nextCode = cssText.charCodeAt(index);

	        if (nextCode !== WHITESPACE && nextCode !== NEW_LINE) break;

	        index++;
	        endOffset = index;
	      }

	      return { endOffset: endOffset };
	    }
	  }, {
	    key: "getCommentLength",
	    value: function getCommentLength(cssText, startIndex) {
	      var index = startIndex,
	          prevCode = void 0,
	          nextCode = void 0,
	          endOffset = void 0;

	      while (index < cssText.length) {
	        nextCode = cssText.charCodeAt(index);

	        index++;
	        endOffset = index;

	        // Check if comment end was spotted
	        if (prevCode === ASTERISK && nextCode === SLASH) break;

	        prevCode = nextCode;
	      }

	      return { endOffset: endOffset };
	    }
	  }, {
	    key: "getDeclarationToken",
	    value: function getDeclarationToken(cssText, startIndex) {
	      var index = startIndex,
	          nextCode = void 0,
	          startOffset = void 0,
	          endOffset = void 0,
	          property = void 0,
	          value = void 0,
	          isImportant = false,
	          prevCode = void 0,
	          quotesCode = void 0,
	          valueOffset = void 0;

	      while (index < cssText.length) {
	        nextCode = cssText.charCodeAt(index);

	        // Check for SyntaxError
	        if (!quotesCode && (nextCode === CURLY_OPEN || nextCode === CURLY_CLOSE)) {
	          throw new SyntaxError("Unexpected character " + cssText[index] + " at " + index + ". Use rule body block only for parsing.");
	        }

	        // Check if " or ' was spotted without escape \
	        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	          if (!!quotesCode) {
	            if (nextCode === quotesCode) quotesCode = undefined;
	          } else {
	            quotesCode = nextCode;
	          }
	        }

	        /* Check if declaration was started */
	        if (startOffset === undefined && (nextCode === MINUS || CF_LETTER(nextCode))) {
	          startOffset = index;
	        }

	        /* Check if property name bounds spotted */
	        if (startOffset !== undefined && !quotesCode && nextCode === COLON) {
	          property = cssText.substring(startOffset, index).trim();
	        }

	        /* Check if property value bounds spotted*/
	        if (property && !valueOffset && nextCode !== WHITESPACE && nextCode !== NEW_LINE && nextCode !== COLON) {
	          valueOffset = index;
	        }

	        index++;
	        endOffset = index;

	        // Check for "!important" flag if "!" was spotted
	        if (!quotesCode && nextCode === EXCLAMATION) {
	          /*istanbul ignore else*/
	          if (cssText.substr(index, 9) === "important") isImportant = true;
	        }

	        // Check if end of rule was spotted
	        if (!quotesCode && nextCode === SEMICOLON || index === cssText.length) {
	          /*istanbul ignore else*/
	          if (!!valueOffset) {
	            // If next code is semicolon - exclude it from value
	            if (nextCode === SEMICOLON) {
	              value = cssText.substring(valueOffset, index - 1).trim();
	            } else {
	              value = cssText.substring(valueOffset, index).trim();
	            }
	          }
	          break;
	        }

	        prevCode = nextCode;
	      }

	      return { startOffset: startOffset, endOffset: endOffset, property: property, value: value, isImportant: isImportant };
	    }
	  }, {
	    key: "parseAt",
	    value: function parseAt(cssText, startIndex) {
	      var startCode = void 0;

	      switch (startCode = cssText.charCodeAt(startIndex)) {
	        case WHITESPACE:
	        case NEW_LINE:
	          return VirtualStyleDeclarationParser.getWhitespaceLength(cssText, startIndex);

	        case SLASH:
	          return VirtualStyleDeclarationParser.getCommentLength(cssText, startIndex);

	        default:
	          return VirtualStyleDeclarationParser.getDeclarationToken(cssText, startIndex);
	      }
	    }
	  }, {
	    key: "parse",
	    value: function parse(cssText) {
	      var declarations = [],
	          declaration = void 0,
	          index = 0;

	      while (index < cssText.length) {

	        // Create a token
	        declaration = VirtualStyleDeclarationParser.parseAt(cssText, index);

	        // Shift loop pointer by token size
	        index = declaration.endOffset;

	        // Add token to tokensList
	        if (declaration.property && declaration.value) {
	          declarations.push(declaration);
	        }
	      }

	      return declarations;
	    }
	  }]);

	  return VirtualStyleDeclarationParser;
	}();

	exports.default = VirtualStyleDeclarationParser;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var U_LETTER = "u".charCodeAt(0);
	var R_LETTER = "r".charCodeAt(0);
	var L_LETTER = "l".charCodeAt(0);
	var WHITESPACE = " ".charCodeAt(0);
	var SINGLE_QUOTE = "\'".charCodeAt(0);
	var DOUBLE_QUOTE = "\"".charCodeAt(0);
	var LEFT_BRACE = "(".charCodeAt(0);
	var RIGHT_BRACE = ")".charCodeAt(0);
	var SLASH = "\\".charCodeAt(0);
	var SEMICOLON = ";".charCodeAt(0);

	var VirtualImportRule = function (_VirtualRule) {
	  _inherits(VirtualImportRule, _VirtualRule);

	  function VirtualImportRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualImportRule);

	    return _possibleConstructorReturn(this, (VirtualImportRule.__proto__ || Object.getPrototypeOf(VirtualImportRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  /**
	   * Get href prop bounds of current rule
	   * @returns {*}
	   * @private
	   */


	  _createClass(VirtualImportRule, [{
	    key: "_getLocationBounds",
	    value: function _getLocationBounds() {
	      var i = void 0,
	          nextCode = void 0,
	          prevCode = void 0,
	          secondCode = void 0,
	          thirdCode = void 0,
	          quotesCode = void 0,
	          startOffset = void 0,
	          endOffset = void 0,
	          urlSpotted = void 0;

	      // Skip @import definition, start at 7
	      for (i = 7; i < this.cssText.length; i++) {
	        nextCode = this.cssText.charCodeAt(i);

	        // Check for url term
	        if (!urlSpotted) {
	          if (!quotesCode && nextCode === R_LETTER && prevCode === U_LETTER) {
	            secondCode = this.cssText.charCodeAt(i + 1);
	            thirdCode = this.cssText.charCodeAt(i + 2);
	            if (secondCode === L_LETTER && thirdCode === LEFT_BRACE) {
	              i += 2;
	              startOffset = i + 1;
	              urlSpotted = true;
	              continue;
	            }
	          }
	        }

	        // Check if " or ' was spotted without escape \
	        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	          if (!!quotesCode) {
	            if (nextCode === quotesCode) {
	              endOffset = i;
	              break;
	            }
	          } else {
	            quotesCode = nextCode;
	            startOffset = i + 1;
	          }
	        }

	        if (urlSpotted) {
	          if (nextCode === RIGHT_BRACE) {
	            endOffset = i;
	          }
	        }

	        prevCode = nextCode;
	      }

	      if (startOffset === undefined || endOffset === undefined) return null;

	      return { startOffset: startOffset, endOffset: endOffset };
	    }
	  }, {
	    key: "_getMediaBounds",
	    value: function _getMediaBounds(hrefBounds) {
	      /*istanbul ignore if*/
	      if (!hrefBounds || !hrefBounds.endOffset) return null;

	      var i = void 0,
	          startOffset = void 0,
	          endOffset = void 0,
	          nextCode = void 0,
	          prevCode = void 0;

	      for (i = hrefBounds.endOffset; i < this.cssText.length; i++) {
	        nextCode = this.cssText.charCodeAt(i);

	        if (startOffset === undefined && prevCode === WHITESPACE && nextCode !== WHITESPACE) {
	          startOffset = i;
	        }

	        if (nextCode === SEMICOLON) {
	          endOffset = i;
	          break;
	        }

	        prevCode = nextCode;
	      }

	      if (startOffset === undefined || endOffset === undefined) return null;

	      return { startOffset: startOffset, endOffset: endOffset };
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualImportRule.prototype.__proto__ || Object.getPrototypeOf(VirtualImportRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        var hrefBounds = this._getLocationBounds();
	        if (hrefBounds) {
	          var mediaBounds = this._getMediaBounds(hrefBounds);
	          this.href = this.cssText.substring(hrefBounds.startOffset, hrefBounds.endOffset);
	          this.media = mediaBounds ? this.cssText.substring(mediaBounds.startOffset, mediaBounds.endOffset) : null;
	          return;
	        }
	      }
	      this.href = null;
	      this.media = null;
	    }

	    /**
	     * Applies new href to current rule
	     * @param href
	     */

	  }, {
	    key: "setLocation",
	    value: function setLocation(href) {
	      if (typeof href !== "string") throw new TypeError("href is not a string");
	      var hrefBounds = this._getLocationBounds(),
	          start = void 0,
	          end = void 0,
	          value = void 0,
	          oldValue = void 0;

	      // Replace current location
	      if (hrefBounds) {
	        value = href;
	        start = hrefBounds.startOffset;
	        end = hrefBounds.endOffset;
	        oldValue = this.cssText.substring(start, end);
	      }
	      // Or create completely new rule
	      else {
	          value = "@import \"" + href + "\";";
	          start = 0;
	          end = this.cssText.length;
	          oldValue = this.cssText;
	        }

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        patchDelta: value.length - oldValue.length,
	        start: start, end: end, value: value
	      });
	    }

	    /**
	     * Applies new media string to current rule
	     * @param media
	     */

	  }, {
	    key: "setMedia",
	    value: function setMedia(media) {
	      if (typeof media !== "string") throw new TypeError("media is not a string");
	      var hrefBounds = void 0,
	          mediaBounds = void 0,
	          i = void 0,
	          nextCode = void 0,
	          start = void 0,
	          end = void 0,
	          oldValue = void 0,
	          action = void 0;

	      // If there is no location specified - rule makes no sense
	      if (hrefBounds = this._getLocationBounds()) {
	        // Replace current media string
	        if (mediaBounds = this._getMediaBounds(hrefBounds)) {
	          start = mediaBounds.startOffset;
	          end = mediaBounds.endOffset;
	          oldValue = this.cssText.substring(start, end);
	          action = _VirtualActions2.default.PATCH_REPLACE;
	        }
	        // Or create a new one
	        else {
	            for (i = hrefBounds.endOffset; i < this.cssText.length; i++) {
	              nextCode = this.cssText.charCodeAt(i);

	              if (nextCode !== WHITESPACE && nextCode !== SINGLE_QUOTE && nextCode !== DOUBLE_QUOTE && nextCode !== RIGHT_BRACE) {
	                start = i;
	                action = _VirtualActions2.default.PATCH_INSERT;
	                oldValue = "";
	                break;
	              }
	            }
	          }

	        this.patch({
	          value: " " + media,
	          patchDelta: 1 + media.length - oldValue.length,
	          start: start, end: end, action: action
	        });
	      }
	    }
	  }]);

	  return VirtualImportRule;
	}(_VirtualRule3.default);

	exports.default = VirtualImportRule;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _VirtualStyleDeclarationRule = __webpack_require__(8);

	var _VirtualStyleDeclarationRule2 = _interopRequireDefault(_VirtualStyleDeclarationRule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualViewportRule = function (_VirtualStyleDeclarat) {
	  _inherits(VirtualViewportRule, _VirtualStyleDeclarat);

	  function VirtualViewportRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualViewportRule);

	    return _possibleConstructorReturn(this, (VirtualViewportRule.__proto__ || Object.getPrototypeOf(VirtualViewportRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  return VirtualViewportRule;
	}(_VirtualStyleDeclarationRule2.default);

	exports.default = VirtualViewportRule;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _VirtualStyleDeclarationRule = __webpack_require__(8);

	var _VirtualStyleDeclarationRule2 = _interopRequireDefault(_VirtualStyleDeclarationRule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualFontFaceRule = function (_VirtualStyleDeclarat) {
	  _inherits(VirtualFontFaceRule, _VirtualStyleDeclarat);

	  function VirtualFontFaceRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualFontFaceRule);

	    return _possibleConstructorReturn(this, (VirtualFontFaceRule.__proto__ || Object.getPrototypeOf(VirtualFontFaceRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  return VirtualFontFaceRule;
	}(_VirtualStyleDeclarationRule2.default);

	exports.default = VirtualFontFaceRule;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualRule2 = __webpack_require__(5);

	var _VirtualRule3 = _interopRequireDefault(_VirtualRule2);

	var _VirtualList = __webpack_require__(4);

	var _VirtualList2 = _interopRequireDefault(_VirtualList);

	var _VirtualTokenizer = __webpack_require__(14);

	var _VirtualTokenizer2 = _interopRequireDefault(_VirtualTokenizer);

	var _VirtualRuleFactory = __webpack_require__(2);

	var _VirtualRuleFactory2 = _interopRequireDefault(_VirtualRuleFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualGroupingRule = function (_VirtualRule) {
	  _inherits(VirtualGroupingRule, _VirtualRule);

	  function VirtualGroupingRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualGroupingRule);

	    return _possibleConstructorReturn(this, (VirtualGroupingRule.__proto__ || Object.getPrototypeOf(VirtualGroupingRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  /**
	   * Force update patching for its child rules
	   * @param patchInfo
	   * @private
	   */


	  _createClass(VirtualGroupingRule, [{
	    key: "_patchChildRules",
	    value: function _patchChildRules(patchInfo, startFrom) {
	      /*istanbul ignore else*/
	      if (patchInfo.patchDelta && this.rules && this.rules.length) {
	        var start = startFrom;
	        for (var i = start; i < this.rules.length; i++) {
	          this.rules.get(i).patch(patchInfo);
	        }
	      }
	    }

	    /**
	     * Apply patch to parent rule
	     * @param patchInfo
	     * @private
	     */

	  }, {
	    key: "_patchParent",
	    value: function _patchParent(patchInfo) {
	      if (patchInfo && patchInfo.action !== _VirtualActions2.default.PATCH_UPDATE) {
	        var parentRule = void 0;
	        /*istanbul ignore else*/
	        if (parentRule = this.parentRule) {
	          var parentPatch = void 0,
	              siblingPatch = void 0,
	              body = void 0,
	              i = void 0;

	          // Get Parent Rule body bounds (startOffset and endOffset)
	          body = parentRule.getBody();

	          // Create parent patch excluding default reparse behavior
	          parentPatch = Object.assign({}, patchInfo, {
	            start: body.startOffset + this.startOffset + patchInfo.start,
	            end: body.startOffset + this.startOffset + patchInfo.end,
	            reparse: false
	          });

	          this.parentRule.patch(parentPatch);

	          // Simply update the position of next rule's sibling if it has changed its length
	          if (patchInfo.patchDelta) {
	            siblingPatch = {
	              action: _VirtualActions2.default.PATCH_UPDATE,
	              patchDelta: patchInfo.patchDelta
	            };

	            this.parentRule._patchChildRules(siblingPatch, this.id + 1);
	          }
	        }
	      }
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      // If we parsing rule body all entire rule
	      if (parseType === _VirtualActions2.default.PARSE_BODY || parseType === _VirtualActions2.default.PARSE_ALL) {
	        var bounds = void 0,
	            body = void 0,
	            tokens = void 0,
	            rules = void 0,
	            rule = void 0,
	            i = void 0,
	            id = 0;

	        // Get Rule body bounds (startOffset and endOffset)
	        bounds = this.getBody();
	        body = this.cssText.substring(bounds.startOffset, bounds.endOffset);

	        // Get a set of tokens to work with
	        tokens = _VirtualTokenizer2.default.tokenize(body);

	        if (tokens.length) {
	          rules = new _VirtualList2.default();

	          for (i = 0; i < tokens.length; i++) {
	            rule = _VirtualRuleFactory2.default.createFromToken(tokens[i], this, this._opts);

	            if (rule) {
	              // Inject grouping rule to _patchApply function
	              rule._patchApply = function (rule, _patchApply) {
	                function call(patchInfo) {
	                  _patchApply.bind(rule)(patchInfo);
	                  rule.parentRule._patchParent.bind(rule)(patchInfo);
	                }

	                return call;
	              }(rule, rule._patchApply);

	              // Add injected rule to list
	              rules.insert(rule, id++);
	            }
	          }

	          this.rules = rules;
	          return;
	        }
	      }
	      this.rules = null;
	    }

	    /**
	     * Creates a new VirtualRule from string and inserts it at specified position
	     * @param ruleText
	     * @param index
	     */

	  }, {
	    key: "insertRule",
	    value: function insertRule(ruleText, index) {
	      if (typeof ruleText !== "string") throw new TypeError("RuleText is not a string");
	      if (typeof index !== "number") throw new TypeError("Index is not a number");
	      if (index < 0) throw new Error("Index should be a positive number");

	      var tokens = void 0,
	          rule = void 0,
	          anchorRule = void 0,
	          start = void 0,
	          end = void 0,
	          patchDelta = void 0,
	          bounds = void 0,
	          value = void 0,
	          action = void 0,
	          mutateFunc = void 0,
	          lastRule = void 0,
	          prefix = void 0;

	      // Try to get a token from ruleText
	      tokens = _VirtualTokenizer2.default.tokenize(ruleText);

	      // Throw an error if there are no tokens
	      if (!tokens.length) throw SyntaxError("RuleText is not a CSS rule");

	      rule = _VirtualRuleFactory2.default.createFromToken(tokens[0], this, this._opts);

	      /*istanbul ignore else*/
	      if (rule) {
	        // Inject grouping rule to _patchApply function
	        rule._patchApply = function (rule, _patchApply) {
	          function call(patchInfo) {
	            _patchApply.bind(rule)(patchInfo);
	            rule.parentRule._patchParent.bind(rule)(patchInfo);
	          }

	          return call;
	        }(rule, rule._patchApply);

	        // Create new rules set if not exists
	        if (!this.rules) this.rules = new _VirtualList2.default();

	        // Try to get anchor rule
	        anchorRule = this.rules.get(index);

	        // Get body block bounds
	        bounds = this.getBody();

	        // Try to shift anchor rule
	        if (anchorRule) {
	          action = _VirtualActions2.default.PATCH_INSERT;
	          start = bounds.startOffset + anchorRule.startOffset;
	          value = rule.cssText + "\n";
	          patchDelta = value.length;
	          rule.startOffset = anchorRule.startOffset;
	          rule.endOffset = anchorRule.startOffset + rule.cssText.length;
	        }
	        // Otherwise insert to body trail
	        else if (this.rules.length) {
	            lastRule = this.rules.get(this.rules.length - 1);
	            action = _VirtualActions2.default.PATCH_INSERT;
	            start = bounds.startOffset + lastRule.endOffset;
	            value = "\n" + rule.cssText;
	            patchDelta = value.length;
	            rule.startOffset = 1 + lastRule.endOffset;
	            rule.endOffset = 1 + lastRule.endOffset + rule.cssText.length;
	          }
	          // Otherwise replace empty body with target rule
	          else {
	              action = _VirtualActions2.default.PATCH_REPLACE;
	              start = bounds.startOffset;
	              end = bounds.endOffset;

	              value = "\n" + rule.cssText + "\n";

	              patchDelta = value.length - bounds.endOffset - bounds.startOffset;
	              rule.startOffset = 1;
	              rule.endOffset = 1 + rule.cssText.length;
	            }

	        // Create this.rules insert mutation
	        mutateFunc = function (parentRule, rule, index) {
	          function call() {
	            parentRule.rules.insert(rule, index);
	          }

	          return call;
	        }(this, rule, index);

	        // Patch this rule with by inserting created one
	        this.patch({
	          action: action, start: start, end: end, value: value, patchDelta: patchDelta, reparse: false
	        }, anchorRule, mutateFunc);

	        // Update child rules
	        this._patchChildRules({
	          action: _VirtualActions2.default.PATCH_UPDATE, patchDelta: patchDelta
	        }, index + 1);
	      }
	    }

	    /**
	     * Replace an existing VirtualRule at specified index with target ruleText
	     * @param ruleText
	     * @param index
	     */

	  }, {
	    key: "replaceRule",
	    value: function replaceRule(ruleText, index) {
	      if (typeof ruleText !== "string") throw new TypeError("RuleText is not a string");
	      if (typeof index !== "number") throw new TypeError("Index is not a number");
	      if (index < 0) throw new Error("Index should be a positive number");
	      if (this.rules && this.rules.length && index >= this.rules.length) throw new Error("Index is larger the child rules count");

	      var tokens = void 0,
	          rule = void 0,
	          anchorRule = void 0,
	          start = void 0,
	          end = void 0,
	          patchDelta = void 0,
	          bounds = void 0,
	          value = void 0,
	          action = void 0,
	          mutateFunc = void 0;

	      // Try to get a token from ruleText
	      tokens = _VirtualTokenizer2.default.tokenize(ruleText);

	      // Throw an error if there are no tokens
	      if (!tokens.length) throw SyntaxError("RuleText is not a CSS rule");

	      rule = _VirtualRuleFactory2.default.createFromToken(tokens[0], this, this._opts);

	      /*istanbul ignore else*/
	      if (rule) {
	        // Inject grouping rule to _patchApply function
	        rule._patchApply = function (rule, _patchApply) {
	          function call(patchInfo) {
	            _patchApply.bind(rule)(patchInfo);
	            rule.parentRule._patchParent.bind(rule)(patchInfo);
	          }

	          return call;
	        }(rule, rule._patchApply);

	        // Try to get anchor rule
	        anchorRule = this.rules.get(index);

	        // Get body block bounds
	        bounds = this.getBody();

	        // Calculate patch data
	        action = _VirtualActions2.default.PATCH_REPLACE;
	        start = bounds.startOffset + anchorRule.startOffset;
	        end = bounds.startOffset + anchorRule.endOffset;
	        value = rule.cssText;
	        patchDelta = value.length - anchorRule.cssText.length;
	        rule.startOffset = anchorRule.startOffset;
	        rule.endOffset = anchorRule.startOffset + rule.cssText.length;

	        // Create this.rules replace mutation
	        mutateFunc = function (parentRule, rule, index) {
	          function call() {
	            parentRule.rules.remove(index);
	            parentRule.rules.insert(rule, index);
	          }

	          return call;
	        }(this, rule, index);

	        // Patch this rule with by inserting created one
	        this.patch({
	          action: action, start: start, end: end, value: value, patchDelta: patchDelta, reparse: false
	        }, anchorRule, mutateFunc);

	        // Update child rules
	        this._patchChildRules({
	          action: _VirtualActions2.default.PATCH_UPDATE, patchDelta: patchDelta
	        }, index + 1);
	      }
	    }

	    /**
	     * Deletes an existing rule at specified position.
	     * @param index
	     */

	  }, {
	    key: "deleteRule",
	    value: function deleteRule(index) {
	      if (typeof index !== "number") throw new TypeError("Index is not a number");
	      if (index < 0) throw new Error("Index should be a positive number");
	      if (this.rules && this.rules.length && index >= this.rules.length) throw new Error("Index is larger the child rules count");

	      var rule = void 0,
	          prevRule = void 0,
	          nextRule = void 0,
	          bounds = void 0,
	          start = void 0,
	          end = void 0,
	          patchDelta = void 0,
	          mutateFunc = void 0;

	      // Get target rule
	      rule = this.rules.get(index);

	      // Try to get siblings of target rule
	      prevRule = this.rules.get(index - 1);
	      nextRule = this.rules.get(index + 1);

	      // Create this.rules delete mutation
	      mutateFunc = function (parentRule, index) {
	        function call() {
	          parentRule.rules.remove(index);
	        }

	        return call;
	      }(this, index);

	      // Get body block bounds
	      bounds = this.getBody();

	      // Create patch props
	      start = bounds.startOffset + (prevRule ? prevRule.endOffset : rule.startOffset);
	      end = bounds.startOffset + (!prevRule && nextRule ? nextRule.startOffset : rule.endOffset);
	      patchDelta = -(end - start);

	      // Patch this rule
	      this.patch({
	        action: _VirtualActions2.default.PATCH_DELETE,
	        start: start, end: end, patchDelta: patchDelta
	      }, rule, mutateFunc);

	      // Update child rule
	      this._patchChildRules({
	        action: _VirtualActions2.default.PATCH_UPDATE, patchDelta: patchDelta
	      });
	    }

	    /**
	     * Patch current rule props with patchInfo
	     * @param patchInfo
	     * @param ref
	     * @param mutateFunc
	     */

	  }, {
	    key: "patch",
	    value: function patch(patchInfo, ref, mutateFunc) {
	      // Invoke pre patching hook
	      if (this._opts.prePatchApply && this._opts.prePatchApply(this, patchInfo, ref) === _VirtualActions2.default.PATCH_REJECT) return;

	      // Invoke this.rules mutation
	      if (mutateFunc) mutateFunc();

	      // Accept rule reparse as default postPatch behavior
	      if (patchInfo.reparse === undefined) {
	        patchInfo = Object.assign({}, patchInfo, { reparse: true });
	      }

	      this._patchApply(patchInfo);

	      // Invoke post patching hook
	      if (this._opts.postPatchApply) this._opts.postPatchApply(this, patchInfo, ref);
	    }
	  }]);

	  return VirtualGroupingRule;
	}(_VirtualRule3.default);

	exports.default = VirtualGroupingRule;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TYPES = {
	  QUALIFIED_RULE_TOKEN: 1,
	  AT_RULE_TOKEN: 2,
	  COMMENT_TOKEN: 3,
	  WHITESPACE_TOKEN: 4,
	  UNKNOWN_TOKEN: 5
	};

	var WHITESPACE = ' '.charCodeAt(0);
	var NEW_LINE = '\n'.charCodeAt(0);
	var CARRIAGE_RETURN = 13;
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
	var RIGHT_ANGLE = '>'.charCodeAt(0);
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

	    throw new Error("Attempt to create a copy of static class");
	  }

	  /**
	   * Read a qualified rule token starting at specified position
	   * @param cssText
	   * @param startIndex
	   * @returns {*}
	   */


	  _createClass(VirtualTokenizer, null, [{
	    key: 'getQualifiedRuleToken',
	    value: function getQualifiedRuleToken(cssText, startIndex) {
	      var index = startIndex,
	          length = 0,
	          fits = void 0,
	          nextCode = void 0,
	          hasAt = void 0,
	          prevCode = void 0,
	          startCode = cssText.charCodeAt(startIndex),
	          quotesCode = void 0,
	          commentOpened = void 0;

	      if (startCode === ASTERISK || startCode === DOT_SIGN || CF_WORD(startCode) || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON || startCode === RIGHT_ANGLE) {
	        while (index < cssText.length) {
	          nextCode = cssText.charCodeAt(index);

	          if (prevCode && prevCode === BACKSLASH && nextCode === ASTERISK) {
	            commentOpened = true;
	          }

	          // Check if " or ' was spotted without escape \
	          if (!commentOpened && prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	            if (!!quotesCode) {
	              if (nextCode === quotesCode) quotesCode = undefined;
	            } else {
	              quotesCode = nextCode;
	            }
	          }

	          length++;
	          index++;

	          if (!commentOpened && !quotesCode && nextCode === AT_SIGN) hasAt = true;
	          if (!commentOpened && !quotesCode && fits && nextCode === OPEN_CURLY) {
	            fits = false;break;
	          }
	          if (!commentOpened && !quotesCode && !fits && nextCode === OPEN_CURLY) fits = true;
	          if (!commentOpened && !quotesCode && !fits && nextCode === SEMICOLON) break;
	          if (!commentOpened && !quotesCode && nextCode === CLOSE_CURLY) break;

	          if (commentOpened && prevCode && prevCode === ASTERISK && nextCode === BACKSLASH) {
	            commentOpened = false;
	          }

	          prevCode = nextCode;
	        }

	        return { type: fits && !hasAt ? TYPES.QUALIFIED_RULE_TOKEN : TYPES.UNKNOWN_TOKEN, startOffset: startIndex, length: length };
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

	        if (nextCode !== WHITESPACE && nextCode !== NEW_LINE && nextCode !== CARRIAGE_RETURN) break;

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
	          isNextTokenBounds = void 0,
	          hypothesis = void 0;

	      while (index < cssText.length) {
	        switch (nextCode = cssText.charCodeAt(index)) {
	          case BACKSLASH:
	            if (secondCode = cssText.charCodeAt(index + 1) === ASTERISK) isNextTokenBounds = true;
	            break;

	          case AT_SIGN:
	            if ((hypothesis = VirtualTokenizer.getAtRuleToken(cssText, index)) && hypothesis.type === TYPES.AT_RULE_TOKEN) isNextTokenBounds = true;
	            break;

	          case CARRIAGE_RETURN:
	          case NEW_LINE:
	          case WHITESPACE:
	            isNextTokenBounds = true;
	            break;

	          default:
	            if (nextCode === ASTERISK || nextCode === DOT_SIGN || CF_WORD(nextCode) || nextCode === HASH || nextCode === OPEN_SQUARE || nextCode === COLON) {
	              if ((hypothesis = VirtualTokenizer.getQualifiedRuleToken(cssText, index)) && hypothesis.type === TYPES.QUALIFIED_RULE_TOKEN) isNextTokenBounds = true;
	            }
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
	          return VirtualTokenizer.getAtRuleToken(cssText, startIndex);

	        case CARRIAGE_RETURN:
	        case NEW_LINE:
	        case WHITESPACE:
	          return VirtualTokenizer.getWhitespaceToken(cssText, startIndex);

	        case BACKSLASH:
	          if (token = VirtualTokenizer.getCommentToken(cssText, startIndex)) return token;
	          break;

	        default:
	          return VirtualTokenizer.getQualifiedRuleToken(cssText, startIndex);
	      }
	      return VirtualTokenizer.getUnknownToken(cssText, startIndex);
	    }

	    /**
	     * Create a set of grammar tokens basing on tokenization level (default is 2).
	     * There are 5 levels of tokenization:
	     * 1 - include qualified rules only
	     * 2 - include qualified and at-rules only
	     * 3 - include qualified, at-rules and comments
	     * 4 - include qualified, at-rules, comments and whitespaces
	     * 5 - include any kind of data
	     * @param cssText - source css  text
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
	        token = VirtualTokenizer.getToken(cssText, index);

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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualGroupingRule2 = __webpack_require__(13);

	var _VirtualGroupingRule3 = _interopRequireDefault(_VirtualGroupingRule2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualMediaRule = function (_VirtualGroupingRule) {
	  _inherits(VirtualMediaRule, _VirtualGroupingRule);

	  function VirtualMediaRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualMediaRule);

	    return _possibleConstructorReturn(this, (VirtualMediaRule.__proto__ || Object.getPrototypeOf(VirtualMediaRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  /**
	   * Parse media string from current cssText
	   * @returns {string|*}
	   * @private
	   */


	  _createClass(VirtualMediaRule, [{
	    key: "_parseMedia",
	    value: function _parseMedia() {
	      var bounds = void 0,
	          media = void 0;

	      // Get rule head block's bounds
	      bounds = this.getHead();

	      // Get the head block of this rule
	      media = this.cssText.substring(bounds.startOffset, bounds.endOffset).trim();

	      // Remove @media prefix
	      media = media.substring(6).trim();

	      return media;
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualMediaRule.prototype.__proto__ || Object.getPrototypeOf(VirtualMediaRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        this.media = this._parseMedia();
	      } else {
	        this.media = null;
	      }
	    }

	    /**
	     * Apply new media string to current rule
	     * @param media
	     */

	  }, {
	    key: "setMedia",
	    value: function setMedia(media) {
	      if (typeof media !== "string") throw new TypeError("Your media prop is not a string");
	      var head = this.getHead();

	      var newMedia = "@media " + media;

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        start: head.startOffset,
	        end: head.endOffset,
	        value: newMedia,
	        patchDelta: newMedia.length - head.endOffset
	      });
	    }
	  }]);

	  return VirtualMediaRule;
	}(_VirtualGroupingRule3.default);

	exports.default = VirtualMediaRule;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualStyleDeclarationRule = __webpack_require__(8);

	var _VirtualStyleDeclarationRule2 = _interopRequireDefault(_VirtualStyleDeclarationRule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualKeyframeRule = function (_VirtualStyleDeclarat) {
	  _inherits(VirtualKeyframeRule, _VirtualStyleDeclarat);

	  function VirtualKeyframeRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualKeyframeRule);

	    return _possibleConstructorReturn(this, (VirtualKeyframeRule.__proto__ || Object.getPrototypeOf(VirtualKeyframeRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  /**
	   * Parse a formatted key from current VirtualKeyframeRule
	   * @returns {String}
	   * @private
	   */


	  _createClass(VirtualKeyframeRule, [{
	    key: "_parseKey",
	    value: function _parseKey() {
	      var keyText = void 0,
	          head = void 0;

	      // Get head props
	      head = _get(VirtualKeyframeRule.prototype.__proto__ || Object.getPrototypeOf(VirtualKeyframeRule.prototype), "getHead", this).call(this);

	      // Get raw selector text
	      keyText = this.cssText.substring(head.startOffset, head.endOffset);

	      // Format selector text
	      keyText = keyText.trim().replace(/\n/gi, "");

	      return keyText;
	    }

	    /**
	     * Parse additional VirtualKeyframeRule props
	     * @param parseType
	     */

	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualKeyframeRule.prototype.__proto__ || Object.getPrototypeOf(VirtualKeyframeRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        this.keyText = this._parseKey();
	      } else {
	        this.keyText = null;
	      }
	    }

	    /**
	     * Applies a new keyText to current VirtualKeyframeRule
	     * @param keyText
	     */

	  }, {
	    key: "setKey",
	    value: function setKey(keyText) {
	      if (typeof keyText !== "string") throw new TypeError("Your keyText is not a string");
	      if (!/\d{1,3}%/.test(keyText)) throw new SyntaxError("Unexpected keyText " + keyText);

	      var head = _get(VirtualKeyframeRule.prototype.__proto__ || Object.getPrototypeOf(VirtualKeyframeRule.prototype), "getHead", this).call(this);

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        start: head.startOffset,
	        end: head.endOffset,
	        value: keyText,
	        patchDelta: keyText.length - head.endOffset
	      });
	    }
	  }]);

	  return VirtualKeyframeRule;
	}(_VirtualStyleDeclarationRule2.default);

	exports.default = VirtualKeyframeRule;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualGroupingRule2 = __webpack_require__(13);

	var _VirtualGroupingRule3 = _interopRequireDefault(_VirtualGroupingRule2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualKeyframesRule = function (_VirtualGroupingRule) {
	  _inherits(VirtualKeyframesRule, _VirtualGroupingRule);

	  function VirtualKeyframesRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualKeyframesRule);

	    return _possibleConstructorReturn(this, (VirtualKeyframesRule.__proto__ || Object.getPrototypeOf(VirtualKeyframesRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  _createClass(VirtualKeyframesRule, [{
	    key: "_getAtDefinition",
	    value: function _getAtDefinition() {
	      switch (this.cssText.substr(1, 8)) {
	        case "-webkit-":
	          return "@-webkit-keyframes";
	        case "-moz-key":
	          return "@-moz-keyframes";
	        case "-o-keyfr":
	          return "@-o-keyframes";
	        case "-ms-keyf":
	          return "@-ms-keyframes";
	        default:
	          return "@keyframes";
	      }
	    }

	    /**
	     * Parse name string from current cssText
	     * @returns {string|*}
	     * @private
	     */

	  }, {
	    key: "_parseName",
	    value: function _parseName() {
	      var bounds = void 0,
	          name = void 0;

	      // Get rule head block's bounds
	      bounds = this.getHead();

	      // Get the head block of this rule
	      name = this.cssText.substring(bounds.startOffset, bounds.endOffset).trim();

	      // Remove @supports prefix
	      name = name.substring(this._getAtDefinition().length).trim();

	      return name;
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualKeyframesRule.prototype.__proto__ || Object.getPrototypeOf(VirtualKeyframesRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        this.name = this._parseName();
	      } else {
	        this.name = null;
	      }
	    }

	    /**
	     * Apply new name string to current rule
	     * @param name
	     */

	  }, {
	    key: "setName",
	    value: function setName(name) {
	      if (typeof name !== "string") throw new TypeError("ConditionText is not a string");
	      var head = this.getHead();

	      var newName = this._getAtDefinition() + " " + name;

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        start: head.startOffset,
	        end: head.endOffset,
	        value: newName,
	        patchDelta: newName.length - head.endOffset
	      });
	    }
	  }]);

	  return VirtualKeyframesRule;
	}(_VirtualGroupingRule3.default);

	exports.default = VirtualKeyframesRule;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualStyleDeclarationRule = __webpack_require__(8);

	var _VirtualStyleDeclarationRule2 = _interopRequireDefault(_VirtualStyleDeclarationRule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualPageRule = function (_VirtualStyleDeclarat) {
	  _inherits(VirtualPageRule, _VirtualStyleDeclarat);

	  function VirtualPageRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualPageRule);

	    return _possibleConstructorReturn(this, (VirtualPageRule.__proto__ || Object.getPrototypeOf(VirtualPageRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  /**
	   * Parse a formatted selectorText from current VirtualPageRule
	   * @returns {String}
	   * @private
	   */


	  _createClass(VirtualPageRule, [{
	    key: "_parseSelectorText",
	    value: function _parseSelectorText() {
	      var bounds = void 0,
	          selectorText = void 0;

	      // Get rule head block's bounds
	      bounds = this.getHead();

	      // Get the head block of this rule
	      selectorText = this.cssText.substring(bounds.startOffset, bounds.endOffset).trim();

	      // Remove @page prefix
	      selectorText = selectorText.substring(5).trim();

	      return selectorText;
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualPageRule.prototype.__proto__ || Object.getPrototypeOf(VirtualPageRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        this.selectorText = this._parseSelectorText();
	      } else {
	        this.selectorText = null;
	      }
	    }

	    /**
	     * Applies a new selectorText to current VirtualPageRule
	     * @param selectorText
	     */

	  }, {
	    key: "setSelector",
	    value: function setSelector(selectorText) {
	      if (typeof selectorText !== "string") throw new TypeError("SelectorText is not a string");
	      var head = this.getHead();

	      var newCondition = "@page " + selectorText;

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        start: head.startOffset,
	        end: head.endOffset,
	        value: newCondition,
	        patchDelta: newCondition.length - head.endOffset
	      });
	    }
	  }]);

	  return VirtualPageRule;
	}(_VirtualStyleDeclarationRule2.default);

	exports.default = VirtualPageRule;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WHITESPACE = ' '.charCodeAt(0);
	var NEW_LINE = '\n'.charCodeAt(0);
	var U_LETTER = "u".charCodeAt(0);
	var R_LETTER = "r".charCodeAt(0);
	var L_LETTER = "l".charCodeAt(0);
	var SINGLE_QUOTE = "\'".charCodeAt(0);
	var DOUBLE_QUOTE = "\"".charCodeAt(0);
	var LEFT_BRACE = "(".charCodeAt(0);
	var RIGHT_BRACE = ")".charCodeAt(0);
	var SLASH = "\\".charCodeAt(0);
	var MINUS = "-".charCodeAt(0);

	var CF_LETTER = function CF_LETTER(code) {
	  return code >= 65 && code <= 90 || code >= 97 && code <= 122;
	};

	var VirtualNamespaceRule = function (_VirtualRule) {
	  _inherits(VirtualNamespaceRule, _VirtualRule);

	  function VirtualNamespaceRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualNamespaceRule);

	    return _possibleConstructorReturn(this, (VirtualNamespaceRule.__proto__ || Object.getPrototypeOf(VirtualNamespaceRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  _createClass(VirtualNamespaceRule, [{
	    key: "_getURIBounds",
	    value: function _getURIBounds() {
	      var i = void 0,
	          nextCode = void 0,
	          secondCode = void 0,
	          thirdCode = void 0,
	          startOffset = void 0,
	          endOffset = void 0,
	          urlSpotted = void 0,
	          prevCode = void 0,
	          quotesCode = void 0;

	      // Start parsing at 10 position skipping @namespace definition
	      for (i = 10; i < this.cssText.length; i++) {
	        nextCode = this.cssText.charCodeAt(i);

	        // Check for url term
	        if (!urlSpotted) {
	          if (!quotesCode && nextCode === R_LETTER && prevCode === U_LETTER) {
	            secondCode = this.cssText.charCodeAt(i + 1);
	            thirdCode = this.cssText.charCodeAt(i + 2);
	            if (secondCode === L_LETTER && thirdCode === LEFT_BRACE) {
	              i += 2;
	              startOffset = i + 1;
	              urlSpotted = true;
	              continue;
	            }
	          }
	        }

	        // Check if " or ' was spotted without escape \
	        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	          if (!!quotesCode) {
	            if (nextCode === quotesCode) {
	              endOffset = i;
	              break;
	            }
	          } else {
	            quotesCode = nextCode;
	            startOffset = i + 1;
	          }
	        }

	        if (urlSpotted) {
	          if (nextCode === RIGHT_BRACE) {
	            endOffset = i;
	          }
	        }

	        prevCode = nextCode;
	      }

	      if (startOffset === undefined || endOffset === undefined) return null;

	      return { startOffset: startOffset, endOffset: endOffset };
	    }
	  }, {
	    key: "_getPrefixBounds",
	    value: function _getPrefixBounds() {
	      var i = void 0,
	          nextCode = void 0,
	          secondCode = void 0,
	          thirdCode = void 0,
	          prevCode = void 0,
	          urlSpotted = void 0,
	          quotesCode = void 0,
	          startOffset = void 0,
	          endOffset = void 0;

	      // Start parsing at 10 position skipping @namespace definition
	      for (i = 10; i < this.cssText.length; i++) {
	        nextCode = this.cssText.charCodeAt(i);

	        // Check for url term
	        if (!urlSpotted) {
	          if (!quotesCode && nextCode === R_LETTER && prevCode === U_LETTER) {
	            secondCode = this.cssText.charCodeAt(i + 1);
	            thirdCode = this.cssText.charCodeAt(i + 2);
	            if (secondCode === L_LETTER && thirdCode === LEFT_BRACE) {
	              urlSpotted = true;
	              continue;
	            }
	          }
	        }

	        // Check if " or ' was spotted without escape \
	        if (prevCode && prevCode !== SLASH && (nextCode === SINGLE_QUOTE || nextCode == DOUBLE_QUOTE)) {
	          if (!!quotesCode) {
	            if (nextCode === quotesCode) quotesCode = undefined;
	          } else {
	            quotesCode = nextCode;
	          }
	        }

	        // Check if url is closed
	        if (!quotesCode && urlSpotted && nextCode === RIGHT_BRACE) urlSpotted = false;

	        // Check for prefix started
	        if (startOffset === undefined && !urlSpotted && !quotesCode && (nextCode === MINUS || CF_LETTER(nextCode))) {
	          startOffset = i;
	        }

	        // Check if prefix ended
	        if (startOffset !== undefined && (nextCode === WHITESPACE || nextCode === NEW_LINE)) {
	          endOffset = i;
	        }

	        prevCode = nextCode;
	      }

	      if (startOffset === undefined || endOffset === undefined) return null;

	      return { startOffset: startOffset, endOffset: endOffset };
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualNamespaceRule.prototype.__proto__ || Object.getPrototypeOf(VirtualNamespaceRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        var uriBounds = void 0,
	            prefixBounds = void 0;

	        uriBounds = this._getURIBounds();
	        prefixBounds = this._getPrefixBounds();

	        if (uriBounds) {
	          this.uri = this.cssText.substring(uriBounds.startOffset, uriBounds.endOffset);

	          if (prefixBounds) {
	            this.prefix = this.cssText.substring(prefixBounds.startOffset, prefixBounds.endOffset);
	          } else {
	            this.prefix = null;
	          }
	        } else {
	          this.uri = null;
	          this.prefix = null;
	        }
	      } else {
	        this.uri = null;
	        this.prefix = null;
	      }
	    }
	  }, {
	    key: "setURI",
	    value: function setURI(uri) {
	      if (typeof uri !== "string") throw new TypeError("URI is not a string");

	      var hrefBounds = this._getURIBounds(),
	          start = void 0,
	          end = void 0,
	          value = void 0,
	          oldValue = void 0;

	      // Replace current location
	      if (hrefBounds) {
	        value = uri;
	        start = hrefBounds.startOffset;
	        end = hrefBounds.endOffset;
	        oldValue = this.cssText.substring(start, end);
	      }
	      // Or create completely new rule
	      else {
	          value = "@namespace url(\"" + uri + "\");";
	          start = 0;
	          end = this.cssText.length;
	          oldValue = this.cssText;
	        }

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        patchDelta: value.length - oldValue.length,
	        start: start, end: end, value: value
	      });
	    }
	  }, {
	    key: "setPrefix",
	    value: function setPrefix(prefix) {
	      if (typeof prefix !== "string") throw new TypeError("URI is not a string");
	      var uriBounds = void 0,
	          prefixBounds = void 0,
	          i = void 0,
	          nextCode = void 0,
	          start = void 0,
	          end = void 0,
	          oldValue = void 0,
	          action = void 0,
	          newValue = void 0;

	      // If there is no uri specified - rule makes no sense
	      if (uriBounds = this._getURIBounds()) {
	        // Replace current media string
	        if (prefixBounds = this._getPrefixBounds()) {
	          start = prefixBounds.startOffset;
	          end = prefixBounds.endOffset;
	          oldValue = this.cssText.substring(start, end);
	          newValue = prefix;
	          action = _VirtualActions2.default.PATCH_REPLACE;
	        }
	        // Or create a new one
	        else {
	            start = 10; //Start at the end of @namespace definition
	            action = _VirtualActions2.default.PATCH_INSERT;
	            oldValue = "";
	            newValue = " " + prefix;
	          }

	        this.patch({
	          value: newValue,
	          patchDelta: newValue.length - oldValue.length,
	          start: start, end: end, action: action
	        });
	      }
	    }
	  }]);

	  return VirtualNamespaceRule;
	}(_VirtualRule3.default);

	exports.default = VirtualNamespaceRule;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualGroupingRule2 = __webpack_require__(13);

	var _VirtualGroupingRule3 = _interopRequireDefault(_VirtualGroupingRule2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualSupportsRule = function (_VirtualGroupingRule) {
	  _inherits(VirtualSupportsRule, _VirtualGroupingRule);

	  function VirtualSupportsRule(ruleInfo, parentRule, opts) {
	    _classCallCheck(this, VirtualSupportsRule);

	    return _possibleConstructorReturn(this, (VirtualSupportsRule.__proto__ || Object.getPrototypeOf(VirtualSupportsRule)).call(this, ruleInfo, parentRule, opts));
	  }

	  /**
	   * Parse conditionText string from current cssText
	   * @returns {string|*}
	   * @private
	   */


	  _createClass(VirtualSupportsRule, [{
	    key: "_parseConditionText",
	    value: function _parseConditionText() {
	      var bounds = void 0,
	          conditionText = void 0;

	      // Get rule head block's bounds
	      bounds = this.getHead();

	      // Get the head block of this rule
	      conditionText = this.cssText.substring(bounds.startOffset, bounds.endOffset).trim();

	      // Remove @supports prefix
	      conditionText = conditionText.substring(9).trim();

	      return conditionText;
	    }
	  }, {
	    key: "parse",
	    value: function parse(parseType) {
	      _get(VirtualSupportsRule.prototype.__proto__ || Object.getPrototypeOf(VirtualSupportsRule.prototype), "parse", this).call(this, parseType);
	      if (parseType === _VirtualActions2.default.PARSE_HEAD || parseType == _VirtualActions2.default.PARSE_ALL) {
	        this.conditionText = this._parseConditionText();
	      } else {
	        this.conditionText = null;
	      }
	    }

	    /**
	     * Apply new conditionText string to current rule
	     * @param conditionText
	     */

	  }, {
	    key: "setCondition",
	    value: function setCondition(conditionText) {
	      if (typeof conditionText !== "string") throw new TypeError("ConditionText is not a string");
	      var head = this.getHead();

	      var newCondition = "@supports " + conditionText;

	      this.patch({
	        action: _VirtualActions2.default.PATCH_REPLACE,
	        start: head.startOffset,
	        end: head.endOffset,
	        value: newCondition,
	        patchDelta: newCondition.length - head.endOffset
	      });
	    }
	  }]);

	  return VirtualSupportsRule;
	}(_VirtualGroupingRule3.default);

	exports.default = VirtualSupportsRule;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _VirtualActions = __webpack_require__(3);

	var _VirtualActions2 = _interopRequireDefault(_VirtualActions);

	var _VirtualGrammar = __webpack_require__(1);

	var _VirtualGrammar2 = _interopRequireDefault(_VirtualGrammar);

	var _VirtualList = __webpack_require__(4);

	var _VirtualList2 = _interopRequireDefault(_VirtualList);

	var _VirtualGroupingRule2 = __webpack_require__(13);

	var _VirtualGroupingRule3 = _interopRequireDefault(_VirtualGroupingRule2);

	var _VirtualRuleFactory = __webpack_require__(2);

	var _VirtualRuleFactory2 = _interopRequireDefault(_VirtualRuleFactory);

	var _VirtualTokenizer = __webpack_require__(14);

	var _VirtualTokenizer2 = _interopRequireDefault(_VirtualTokenizer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VirtualStyleSheet = function (_VirtualGroupingRule) {
	  _inherits(VirtualStyleSheet, _VirtualGroupingRule);

	  function VirtualStyleSheet(cssText, opts) {
	    _classCallCheck(this, VirtualStyleSheet);

	    if (typeof cssText !== "string") throw TypeError("CSSText is not a string");

	    var ruleInfo = {
	      startOffset: 0,
	      endOffset: cssText.length,
	      cssText: cssText
	    };

	    return _possibleConstructorReturn(this, (VirtualStyleSheet.__proto__ || Object.getPrototypeOf(VirtualStyleSheet)).call(this, ruleInfo, null, opts));
	  }

	  _createClass(VirtualStyleSheet, [{
	    key: "getBody",
	    value: function getBody() {
	      return { startOffset: this.startOffset, endOffset: this.endOffset };
	    }
	  }, {
	    key: "getHead",
	    value: function getHead() {
	      return this.getBody();
	    }
	  }, {
	    key: "parseFromString",
	    value: function parseFromString(cssText) {
	      if (typeof cssText !== "string") throw TypeError("CSSText is not a string");
	      this.cssText = cssText;
	      this.endOffset = cssText.length;
	      this.parse(_VirtualActions2.default.PARSE_ALL);
	    }
	  }]);

	  return VirtualStyleSheet;
	}(_VirtualGroupingRule3.default);

	Object.assign(VirtualStyleSheet, _VirtualActions2.default);
	Object.assign(VirtualStyleSheet, _VirtualGrammar2.default.getTypes());

	exports.default = VirtualStyleSheet;

/***/ })
/******/ ])
});
;