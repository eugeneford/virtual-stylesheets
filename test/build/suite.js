(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _VirtualTypes = require('./VirtualTypes.es6');

var _VirtualTypes2 = _interopRequireDefault(_VirtualTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  }

  _createClass(VirtualGrammar, null, [{
    key: 'isKeyframeRule',

    /**
     * Check if rule is actually a type of KEYFRAME_RULE
     * @param rule
     * @returns {boolean}
     */
    value: function isKeyframeRule(rule) {
      var value = rule.toLowerCase(),
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

    /**
     * Check if rule is actually a type of STYLE_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isStyleRule',
    value: function isStyleRule(rule) {
      var startCode = rule.charCodeAt(0);
      if (startCode === ASTERISK || startCode === DOT_SIGN || CF_WORD(startCode) || startCode === HASH || startCode === OPEN_SQUARE || startCode === COLON) {
        return true;
      }
      return false;
    }

    /**
     * Check if rule is actually a type of CHARSET_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isCharsetRule',
    value: function isCharsetRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@charset".length) === "@charset";
    }

    /**
     * Check if rule is actually a type of IMPORT_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isImportRule',
    value: function isImportRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@import".length) === "@import";
    }

    /**
     * Check if rule is actually a type of MEDIA_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isMediaRule',
    value: function isMediaRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@media".length) === "@media";
    }

    /**
     * Check if rule is actually a type of FONT_FACE_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isFontFaceRule',
    value: function isFontFaceRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@font-face".length) === "@font-face";
    }

    /**
     * Check if rule is actually a type of PAGE_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isPageRule',
    value: function isPageRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@page".length) === "@page";
    }

    /**
     * Check if rule is actually a type of KEYFRAME_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isKeyframesRule',
    value: function isKeyframesRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@keyframes".length) === "@keyframes" || value.substr(0, "@-webkit-keyframes".length) === "@-webkit-keyframes" || value.substr(0, "@-moz-keyframes".length) === "@-moz-keyframes" || value.substr(0, "@-ms-keyframes".length) === "@-ms-keyframes" || value.substr(0, "@-o-keyframes".length) === "@-o-keyframes";
    }

    /**
     * Check if rule is actually a type of NAMESPACE_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isNamespaceRule',
    value: function isNamespaceRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@namespace".length) === "@namespace";
    }

    /**
     * Check if rule is actually a type of SUPPORTS_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isSupportsRule',
    value: function isSupportsRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@supports".length) === "@supports";
    }

    /**
     * Check if rule is actually a type of VIEWPORT_RULE
     * @param rule
     * @returns {boolean}
     */

  }, {
    key: 'isViewportRule',
    value: function isViewportRule(rule) {
      var value = rule.toLowerCase();
      return value.substr(0, "@viewport".length) === "@viewport";
    }

    /**
     * Get VirtualRule type based on specified rule
     * @param rule
     * @returns {number}
     */

  }, {
    key: 'getRuleType',
    value: function getRuleType(rule) {
      if (VirtualGrammar.isStyleRule(rule)) return _VirtualTypes2.default.STYLE_RULE;
      if (VirtualGrammar.isMediaRule(rule)) return _VirtualTypes2.default.MEDIA_RULE;
      if (VirtualGrammar.isImportRule(rule)) return _VirtualTypes2.default.IMPORT_RULE;
      if (VirtualGrammar.isFontFaceRule(rule)) return _VirtualTypes2.default.FONT_FACE_RULE;
      if (VirtualGrammar.isKeyframesRule(rule)) return _VirtualTypes2.default.KEYFRAMES_RULE;
      if (VirtualGrammar.isKeyframeRule(rule)) return _VirtualTypes2.default.KEYFRAME_RULE;
      if (VirtualGrammar.isCharsetRule(rule)) return _VirtualTypes2.default.CHARSET_RULE;
      if (VirtualGrammar.isSupportsRule(rule)) return _VirtualTypes2.default.SUPPORTS_RULE;
      if (VirtualGrammar.isViewportRule(rule)) return _VirtualTypes2.default.VIEWPORT_RULE;
      if (VirtualGrammar.isPageRule(rule)) return _VirtualTypes2.default.PAGE_RULE;
      if (VirtualGrammar.isNamespaceRule(rule)) return _VirtualTypes2.default.NAMESPACE_RULE;
      return _VirtualTypes2.default.UNKNOWN_RULE;
    }
  }]);

  return VirtualGrammar;
}();

exports.default = VirtualGrammar;

},{"./VirtualTypes.es6":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

/**
 * Virtual list is a array-like object containing an ordered collection of string values
 *
 * @example
 * list = new VirtualList();
 * list.append("value");
 * list.get(0); //=> value
 * list.remove("value"); //=> value
 */
var VirtualList = function () {
  function VirtualList() {
    _classCallCheck(this, VirtualList);

    this.items = [];
  }

  /**
   * Appends target item to set of  items in current VirtualList.
   * @param item
   *
   * @throws TypeError - if item is not a type of String
   */


  _createClass(VirtualList, [{
    key: "append",
    value: function append(item) {
      if (typeof item !== "string" || this.items.indexOf(item) !== -1) {
        throw new TypeError((typeof item === "undefined" ? "undefined" : _typeof(item)) + " is not a type of String");
      }
      this.items.push(item);
    }

    /**
     * Removes target item from set of  items in current VirtualStyleRule. Returns a removed item.
     * @param item
     * @returns {string}
     *
     * @throws Error - if item is missing in this list
     */

  }, {
    key: "remove",
    value: function remove(item) {
      var index = void 0;
      if (index = this.items.indexOf(item) > -1) {
        return this.items.splice(index, 1)[0];
      }
      throw new Error("\"" + item + "\" is missing in VirtualList");
    }

    /**
     * Returns an item at target position index
     * @param index
     * @returns {string}
     */

  }, {
    key: "get",
    value: function get(index) {
      return this.items[index];
    }
  }]);

  return VirtualList;
}();

exports.default = VirtualList;

},{}],3:[function(require,module,exports){
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

var _VirtualTypes = require("./VirtualTypes.es6");

var _VirtualTypes2 = _interopRequireDefault(_VirtualTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VirtualRule = function () {
  function VirtualRule(ruleInfo) {
    var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var hooks = arguments[2];
    var lazyParsing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, VirtualRule);

    this._hooks = hooks;

    this.type = ruleInfo.type;
    this.startOffset = ruleInfo.startOffset;
    this.endOffset = ruleInfo.endOffset;
    this.cssText = ruleInfo.cssText;
    this.parentRule = parentRule;
    this.lazyParsing = lazyParsing;

    if (!this.lazyParsing) this.patch();
  }

  _createClass(VirtualRule, [{
    key: "patchHead",
    value: function patchHead(patchInfo) {}
  }, {
    key: "patchBody",
    value: function patchBody(patchInfo) {}
  }, {
    key: "patch",
    value: function patch(patchInfo) {
      this.patchHead(patchInfo);
      this.patchBody(patchInfo);
    }
  }]);

  return VirtualRule;
}();

exports.default = VirtualRule;

},{"./VirtualTypes.es6":8}],4:[function(require,module,exports){
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

var _VirtualTypes = require("./VirtualTypes.es6");

var _VirtualTypes2 = _interopRequireDefault(_VirtualTypes);

var _VirtualGrammar = require("./VirtualGrammar.es6");

var _VirtualGrammar2 = _interopRequireDefault(_VirtualGrammar);

var _VirtualRuleList = require("./VirtualRuleList.es6");

var _VirtualRuleList2 = _interopRequireDefault(_VirtualRuleList);

var _VirtualRule = require("./VirtualRule.es6");

var _VirtualRule2 = _interopRequireDefault(_VirtualRule);

var _VirtualTokenizer = require("./VirtualTokenizer.es6");

var _VirtualTokenizer2 = _interopRequireDefault(_VirtualTokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VirtualRuleFactory = function () {
  function VirtualRuleFactory() {
    var hooks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, VirtualRuleFactory);

    this._hooks = hooks;
  }

  _createClass(VirtualRuleFactory, [{
    key: "create",
    value: function create(ruleInfo) {
      var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var lazyParsing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var filterResult = void 0;

      // Apply a pre parsing filter if was specified
      if (this._hooks.preParsingFilter) {
        if ((filterResult = this._hooks.preParsingFilter(ruleInfo)) === _VirtualTypes2.default.FILTER_REJECT) return null;
      }

      // Create a VirtualRule based on type in ruleInfo
      switch (ruleInfo.type) {
        default:
          return new _VirtualRule2.default(ruleInfo, parentRule, this._hooks, filterResult === _VirtualTypes2.default.LAZY_ACCEPT || false);
      }
    }
  }, {
    key: "createFromToken",
    value: function createFromToken(token) {
      var parentRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var lazyParsing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var type = void 0,
          ruleInfo = void 0;

      type = _VirtualGrammar2.default.getRuleType(token.value);
      ruleInfo = {
        type: type,
        startOffset: token.startOffset,
        endOffset: token.startOffset + token.length,
        cssText: token.value
      };

      return this.create(ruleInfo, parentRule, lazyParsing);
    }
  }]);

  return VirtualRuleFactory;
}();

exports.default = VirtualRuleFactory;

},{"./VirtualGrammar.es6":1,"./VirtualRule.es6":3,"./VirtualRuleList.es6":5,"./VirtualTokenizer.es6":7,"./VirtualTypes.es6":8}],5:[function(require,module,exports){
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

var _VirtualTypes = require("./VirtualTypes.es6");

var _VirtualTypes2 = _interopRequireDefault(_VirtualTypes);

var _VirtualRule = require("./VirtualRule.es6");

var _VirtualRule2 = _interopRequireDefault(_VirtualRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Virtual list is a array-like object containing an ordered collection of VirtualRules
 */
var VirtualRuleList = function () {
  function VirtualRuleList() {
    _classCallCheck(this, VirtualRuleList);

    this.rules = [];
  }

  /**
   * Inserts an additional VirtualRule  rule at specified position index in current VirtualRuleList.
   * @param rule
   * @param index
   *
   * @throws TypeError - if rule is not a type of VirtualRule
   * @throws SyntaxError - if rule has not id prop
   */


  _createClass(VirtualRuleList, [{
    key: "insert",
    value: function insert(rule, index) {
      if (!rule instanceof _VirtualRule2.default) {
        throw new TypeError("rule is not a type of VirtualRule");
      }

      rule.id = index;
      this.rules.splice(index, 0, rule);

      for (var i = index + 1; i < this.rules.length; i++) {
        this.rules[i].id = i;
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
      var i = void 0;
      for (i = 0; i < this.rules.length; i++) {
        if (this.rules[i].id === id) return this.items.splice(i, 1)[0];
      }
      throw new Error("\"Rule at index " + index + "\" is missing in VirtualList");
    }

    /**
     * Returns a VirtualRule that has target id.
     * @param id
     * @returns {VirtualRule}
     */

  }, {
    key: "get",
    value: function get(id) {
      var i = void 0;
      for (i = 0; i < this.rules.length; i++) {
        if (this.rules[i].id === id) return this.rules[i];
      }
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
      return this.rules.filter(filterFunc);
    }
  }]);

  return VirtualRuleList;
}();

exports.default = VirtualRuleList;

},{"./VirtualRule.es6":3,"./VirtualTypes.es6":8}],6:[function(require,module,exports){
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

var _VirtualTypes = require("./VirtualTypes.es6");

var _VirtualTypes2 = _interopRequireDefault(_VirtualTypes);

var _VirtualRuleList = require("./VirtualRuleList.es6");

var _VirtualRuleList2 = _interopRequireDefault(_VirtualRuleList);

var _VirtualRuleFactory = require("./VirtualRuleFactory.es6");

var _VirtualRuleFactory2 = _interopRequireDefault(_VirtualRuleFactory);

var _VirtualTokenizer = require("./VirtualTokenizer.es6");

var _VirtualTokenizer2 = _interopRequireDefault(_VirtualTokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VirtualStyleSheet = function () {
  function VirtualStyleSheet(cssText, hooks) {
    _classCallCheck(this, VirtualStyleSheet);

    this.parseFromString(cssText, hooks);
  }

  _createClass(VirtualStyleSheet, [{
    key: "parseFromString",
    value: function parseFromString(cssText, hooks) {
      var tokenizer = new _VirtualTokenizer2.default(),
          tokens = void 0,
          i = void 0,
          rule = void 0,
          rules = void 0,
          type = void 0,
          factory = void 0;
      tokens = tokenizer.tokenize(cssText);

      if (tokens.length) {
        factory = new _VirtualRuleFactory2.default(hooks);
        rules = new _VirtualRuleList2.default();

        for (i = 0; i < tokens.length; i++) {
          rule = factory.createFromToken(tokens[i]);
          rules.insert(rule, i);
        }

        this.rules = rules;
      }
    }
  }]);

  return VirtualStyleSheet;
}();

// Declare public VisualStyleSheet constants


for (var i in _VirtualTypes2.default) {
  Object.defineProperty(VirtualStyleSheet, i, { value: _VirtualTypes2.default[i], writable: false });
}

exports.default = VirtualStyleSheet;

},{"./VirtualRuleFactory.es6":4,"./VirtualRuleList.es6":5,"./VirtualTokenizer.es6":7,"./VirtualTypes.es6":8}],7:[function(require,module,exports){
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

var _VirtualTypes = require('./VirtualTypes.es6');

var _VirtualTypes2 = _interopRequireDefault(_VirtualTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WHITESPACE = ' '.charCodeAt(0);
var NEW_LINE = '\n'.charCodeAt(0);
var SLASH = '/'.charCodeAt(0);
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
    key: 'getQualifiedRuleTokenLength',
    value: function getQualifiedRuleTokenLength(cssText, startIndex) {
      var index = startIndex,
          length = 0,
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

          if (!quotesCode && nextCode === CLOSE_CURLY) break;

          prevCode = nextCode;
        }

        return { type: _VirtualTypes2.default.QUALIFIED_RULE_TOKEN, startOffset: startIndex, length: length };
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
    key: 'getAtRuleTokenLength',
    value: function getAtRuleTokenLength(cssText, startIndex) {
      var index = startIndex,
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

          if (!quotesCode && nextCode === OPEN_CURLY) openCurlyCount++;
          if (!quotesCode && nextCode === CLOSE_CURLY) openCurlyCount--;

          length++;
          index++;

          if (!quotesCode && !openCurlyCount && nextCode === SEMICOLON) break;
          if (!quotesCode && !openCurlyCount && nextCode === CLOSE_CURLY) break;

          prevCode = nextCode;
        }

        return { type: _VirtualTypes2.default.AT_RULE_TOKEN, startOffset: startIndex, length: length };
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
    key: 'getCommentTokenLength',
    value: function getCommentTokenLength(cssText, startIndex) {
      var startCode = cssText.charCodeAt(startIndex),
          prevCode = void 0,
          nextCode = void 0,
          length = 1;

      if (startCode === SLASH && (nextCode = cssText.charCodeAt(startIndex + length++) === ASTERISK)) {
        while (nextCode) {
          prevCode = nextCode;
          nextCode = cssText.charCodeAt(startIndex + length++);

          if (prevCode === ASTERISK && nextCode === SLASH) break;
        }
        return { type: _VirtualTypes2.default.COMMENT_TOKEN, startOffset: startIndex, length: length };
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
    key: 'getWhitespaceTokenLength',
    value: function getWhitespaceTokenLength(cssText, startIndex) {
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
        return { type: _VirtualTypes2.default.WHITESPACE_TOKEN, startOffset: startIndex, length: length };
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
    key: 'getUnknownTokenLength',
    value: function getUnknownTokenLength(cssText, startIndex) {
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
        return { type: _VirtualTypes2.default.UNKNOWN_TOKEN, startOffset: startIndex, length: length };
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
          if (token = this.getAtRuleTokenLength(cssText, startIndex)) return token;
          break;

        case NEW_LINE:
        case WHITESPACE:
          if (token = this.getWhitespaceTokenLength(cssText, startIndex)) return token;
          break;

        case SLASH:
          if (token = this.getCommentTokenLength(cssText, startIndex)) return token;
          break;

        default:
          if (token = this.getQualifiedRuleTokenLength(cssText, startIndex)) return token;
          break;
      }
      return this.getUnknownTokenLength(cssText, startIndex);
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

exports.default = VirtualTokenizer;

},{"./VirtualTypes.es6":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = {
  // Rule type constants
  STYLE_RULE: 1,
  CHARSET_RULE: 2,
  IMPORT_RULE: 3,
  MEDIA_RULE: 4,
  FONT_FACE_RULE: 5,
  PAGE_RULE: 6,
  KEYFRAMES_RULE: 7,
  KEYFRAME_RULE: 8,
  NAMESPACE_RULE: 10,
  SUPPORTS_RULE: 12,
  VIEWPORT_RULE: 15,
  UNKNOWN_RULE: 0,

  // Lazy-parsing constants
  LAZY_ACCEPT: 2,
  LAZY_REJECT: 1,

  // Filter constants
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 0,

  // Patch types and actions
  PATCH_HEAD: 1,
  PATCH_BODY: 2,
  PATCH_ALL: 0,

  PATCH_APPEND: 1,
  PATCH_PREPEND: 2,
  PATCH_INSERT: 3,
  PATCH_REPLACE: 4,
  PATCH_DELETE: 5,

  // Token Types
  QUALIFIED_RULE_TOKEN: 1,
  AT_RULE_TOKEN: 2,
  COMMENT_TOKEN: 3,
  WHITESPACE_TOKEN: 4,
  UNKNOWN_TOKEN: 5
};

},{}],9:[function(require,module,exports){
"use strict";

var _VirtualList = require("../../../src/VirtualList.es6");

var _VirtualList2 = _interopRequireDefault(_VirtualList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Virtual List", function () {
  describe("constructor()", function () {
    it("new VirtualList() instanceof VirtualList", function () {
      var list = new _VirtualList2.default();
      expect(list instanceof _VirtualList2.default).toEqual(true);
    });
  });

  describe("append()", function () {
    it("\"example text\" => void", function () {
      var list = new _VirtualList2.default();
      list.append("example text");
      expect(list.items[0]).toEqual("example text");
    });

    it("{ value: \"example text\"} => TypeError", function () {
      var list = new _VirtualList2.default();
      expect(list.append).toThrowError(TypeError);
    });
  });

  describe("remove()", function () {
    it("\"value\" => \"value\"", function () {
      var list = new _VirtualList2.default();
      list.append("example text");
      list.append("value");
      expect(list.remove("value")).toEqual("value");
    });

    it("\"Value That is not in list\" => Error", function () {
      var list = new _VirtualList2.default();
      expect(list.remove).toThrowError(Error);
    });
  });

  describe("get()", function () {
    it("1 => \"value\"", function () {
      var list = new _VirtualList2.default();
      list.append("example text");
      list.append("value");
      expect(list.get(1)).toEqual("value");
    });

    it("5 => undefined", function () {
      var list = new _VirtualList2.default();
      list.append("example text");
      list.append("value");
      expect(list.get(5)).toEqual(undefined);
    });
  });
});

},{"../../../src/VirtualList.es6":2}],10:[function(require,module,exports){
"use strict";

var _VirtualRuleList = require("../../../src/VirtualRuleList.es6");

var _VirtualRuleList2 = _interopRequireDefault(_VirtualRuleList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Virtual Rule List", function () {
  describe("constructor()", function () {
    it("new VirtualRuleList() instanceof VirtualRuleList", function () {
      var list = new _VirtualRuleList2.default();
      expect(list instanceof _VirtualRuleList2.default).toEqual(true);
    });
  });
});

},{"../../../src/VirtualRuleList.es6":5}],11:[function(require,module,exports){
"use strict";

var _VirtualStyleSheet = require("../../../src/VirtualStyleSheet.es6");

var _VirtualStyleSheet2 = _interopRequireDefault(_VirtualStyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Virtual StyleSheet", function () {
      describe("parseFromString", function () {
            it("test", function () {
                  var cssText = void 0;

                  cssText = "@charset \"UTF-8\";\n\n/** [Table of contents] */\n\n@document url(http://www.w3.org/), url-prefix(http://www.w3.org/Style/), domain(mozilla.org), regexp(\"https:.*;\") {\n  body {\n    color: purple;\n    background: yellow;\n  }\n}\n\n@import url(\"print.css\") print;\n\n@font-face {\n  font-family: MyHelvetica;\n  src: local(\"Helvetica Neue }Bold\"), local(\"HelveticaNeue-Bold\"), url(MgOpenModernaBold.ttf);\n  font-weight: bold;\n}\n\n@page :first {\n  margin-top: 10cm /* Top margin on first page 10cm */\n}\n\n#example h1 {\n  font-size: 40px;\n  line-height: 1.3;\n}\n\n";

                  var t1 = performance.now();
                  var vss = new _VirtualStyleSheet2.default(cssText, {});
                  var t2 = performance.now();

                  console.log("TIME: " + (t2 - t1));
                  console.log(vss.rules);

                  expect(true).toEqual(true);
            });
      });
});

},{"../../../src/VirtualStyleSheet.es6":6}],12:[function(require,module,exports){
"use strict";

require("./spec/VirtualListSpec.es6");

require("./spec/VirtualRuleListSpec.es6");

require("./spec/VirtualStyleSheetSpec.es6");

},{"./spec/VirtualListSpec.es6":9,"./spec/VirtualRuleListSpec.es6":10,"./spec/VirtualStyleSheetSpec.es6":11}]},{},[12]);
