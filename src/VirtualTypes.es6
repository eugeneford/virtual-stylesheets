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

export default {
  // Rule type constants
  STYLE_RULE:     1,
  CHARSET_RULE:   2,
  IMPORT_RULE:    3,
  MEDIA_RULE:     4,
  FONT_FACE_RULE: 5,
  PAGE_RULE:      6,
  KEYFRAMES_RULE: 7,
  KEYFRAME_RULE:  8,
  NAMESPACE_RULE: 10,
  SUPPORTS_RULE:  12,
  VIEWPORT_RULE:  15,
  UNKNOWN_RULE:   0,

  // Lazy-parsing constants
  LAZY_ACCEPT: 2,
  LAZY_REJECT: 1,

  // Filter constants
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 0,

  // Patch types and actions
  PATCH_HEAD: 1,
  PATCH_BODY: 2,
  PATCH_ALL:  0,

  PATCH_APPEND:  1,
  PATCH_PREPEND: 2,
  PATCH_INSERT:  3,
  PATCH_REPLACE: 4,
  PATCH_DELETE:  5,

  // Token Types
  QUALIFIED_RULE_TOKEN: 1,
  AT_RULE_TOKEN:        2,
  COMMENT_TOKEN:        3,
  WHITESPACE_TOKEN:     4,
  UNKNOWN_TOKEN:        5
}