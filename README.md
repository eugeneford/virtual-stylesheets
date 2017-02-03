# virtual-stylesheets
A complex string based CSS managment library

[![NPM](https://nodei.co/npm/virtual-stylesheets.png?downloads=true)](https://nodei.co/npm/virtual-stylesheets/)

## Introduction
This project implements a custom string based CSS Parser. There was a necessary to create a flexible, complex and high-performance string based css library for a project I was working on, which would have a opportunity to manage and manipulate the css rules by creating the changes in source css string in a standardized way.

One of the main goals, was to exactly know at what position of the source css string the changes will gonna be made. 

So, using this library you will be able to:
* Parse source CSS string into a close to CSS object model;
* Insert, remove and change CSS rules of this model with live updating of entire object tree in changed nodes only;
* Exactly know what part of your css source was changed and where it was happened;
* Manipulate with model parsing and changing using an integrated hooks system;
* Extend or replace existing functionality use OOP extending principles.

## Usage

All of the VSM classes are available at VSM scope eg. VSM.VirtualStyleSheet, VSM.VirtualRule etc.

### Creating the new VSM 
```js
var css = "body {padding: 0} @media print { body { padding: 60px }}";
var vsm = new VSM.VirtualStyleSheet(css);
```

### Getting rules
```js
var css = "body {padding: 0} @media print { body { padding: 60px }}";
var vsm = new VSM.VirtualStyleSheet(css);

var rule = vsm.rules.get(1);
// @media print { body { padding: 60px }}

var childRule = rule.get(0);
// body { padding: 60px }
```

### Inserting rules
```js
var css = "body {padding: 0} @media print { body { padding: 60px }}";
var vsm = new VSM.VirtualStyleSheet(css);

vsm.insertRule("*:first-child { margin-top: 30px }", 0);

var rule = vsm.rules.get(0);
// *:first-child { margin-top: 30px }
```

### Deleting rules
```js
var css = "body {padding: 0} @media print { body { padding: 60px }}";
var vsm = new VSM.VirtualStyleSheet(css);

vsm.deleteRule(0);

var rule = vsm.rules.get(0);
// @media print { body { padding: 60px }}
```

### Changing properties
You are able to change and manage a lot of additional props which are specific of each rule type. All of them are described in VSM specification and the end of this document. 

For example, to change a selector of a style rule, use setSelector() method.

```js
var css = "body {padding: 0} @media print { body { padding: 60px }}";
var vsm = new VSM.VirtualStyleSheet(css);

var rule = vsm.rules.get(0);

rule.setSelector("html");
// rule.selectorText === html
// rule.cssText === html{ padding: 0}
// vsm.cssText === html{padding: 0} @media print { body { padding: 60px }}
```

### Validation
In order to improve module performance, VirtualStyleSheets don’t perform any validation for provided source css string. So, you need to use an additional CSS Validation library before using its functionality. A good example of css validator is [css-validator](https://www.npmjs.com/package/css-validator) package at npm.

## Extension points and hooks
### Rule pre- and post- parsing filter hooks
VirtualStyleSheets provides an additional extension point for your custom pre-parsing filter implementations.

It can be very useful when you need to get a set of special rules only from target source string.

For example, let’s create a VirtualImportRule filter.
```js
vss = new VirtualStyleSheet(cssText, { 
  preParsingFilter: function (ruleInfo) {
    if (ruleInfo.type === VirtualStyleSheet.IMPORT_RULE) {
      return VirtualStyleSheet.FILTER_ACCEPT
    }
  }
});
```
Another option is to create a lazy-parsing VirtualRules. 

It can be very useful when you need to get only a special part of information from target cssText ( all Style Rules, or any type of rules that satisfy the requirements of special Media Rule). In this case, a complete parsing of target cssText will be really expensive.
```js
vss = new VirtualStyleSheet(cssText, { 
  preParsingFilter: function (ruleInfo) {
    if (ruleInfo.type !== VirtualStyleSheet.STYLE_RULE) {
      return VirtualStyleSheet.LAZY_ACCEPT
    }
  }
});
```
In the example used above, all Virtual Rules which are not a type of STYLE_RULE will submit a lazy-parsing.

### Pre and Post patching hooks
VirtualStyleSheets provides extension points before and after actual parsing of head and body (actually head and body patching actions) of CSSRules, allowing you to make additional decisions based on continuous patching information. 
```js
vss = new VirtualStyleSheet(cssText, {
  prePatchApply: function (rule, patch) { ... },
  postPatchApply: function (rule, patch) { ... }
});
```
### Unknown rules accepting
Unknown rules are ignored by default in VirtualStyleSheets, but you always can enable their accepting using acceptUnknown flag:
```js
vss = new VirtualStyleSheet(cssText, {
  acceptUnknown: true
});
```

## How patching works
Patching is a standardized way to change data in VirtualStyleSheets. Any data-changing action (append, insert, delete etc.) you perform with VirtualRules will trigger a patching action.

You’re able to manipulate patching processes using VirtualStyleSheet hooks to achieve additional logic of your applications.


## How parsing works
Depending on a type of parsing action you pass to parse() function, VirtualStyleSheets will perform a complete reparse of your specific rule. For example, if you has a completely parsed VirtualStyleRule (with available selectorText and style props), and you want to reparse your rule passing a PARSE_HEAD parse type - VirtualStyleSheets will update your selectorText to actual cssText data, but set your style to null.

 
## Extending VirtualStyleSheets ( ES6 )
The first thing you need to do is to create you custom rule class extending a basic VirtualRule class and implement a parse(parseType) method.  
```es6
import VirtualRule from "./VirtualRule";

class MyOwnVirtualRule extends VirtualRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  parse(parseType) {
    super.parse(parseType);
    // Your custom logic of additional rule props parsing
  }

  myPublicMethod(...args) {
    // Your public method realisation
  }
}
```
Also, you are able to extend any of already existing rules eg. VirtualGroupingRule, VirtualStyleDeclarationRule etc.

Next, define a new VirtualGrammar RuleType.
```es6
import Grammar from "./VirtualGrammar";

Grammar.define({
  type: "MY_OWN_RULE",
  value: 99,
  test: function(rule){
    // Test rule to actually be a MY_OWN_RULE
  }
});
```

Finally, connect your RuleType and custom VirtualRule within VirtualRuleFactory.
```es6
import RuleFactory from "./VirtualRuleFactory";
import Grammar from "./VirtualGrammar";
import MyOwnVirtualRule from "./MyOwnVirtualRule ";

RuleFactory.register(VirtualGrammar.MY_OWN_RULE, MyOwnVirtualRule );
```
Note, multiple registering of different rule classes to same rule type will replace each other with the last registered one 

## Virtual Style Model Spec
Virtual Style Model is based on a set of special classes and interfaces. 

### Virtual Grammar
#### VirtualGrammar class definition
VirtualGrammar is a kind of basic parser, whose purpose is to resolve the type of css rules defined as a text string.
```es6
static class VirtualGrammar{
  private readonly attribute _test;

  Object getTypes();
  Integer getRuleType(rule);
  void define(ruleType);
}
```

##### Attributes
Name | Description
-------- | -------
_test | Holds all test functions assigned to grammar RuleTypes.

##### Methods
Name | Description
-------- | -------
getTypes() | Returns all RuleTypes defined in VirtualGrammar.
getRuleType(rule) | Returns a type of specified target rule. If an appropriate RuleType wasn’t found - returns UNKNOWN_RULE.
define(ruleType) | Defines a new rule type in VirtualGrammar


#### RuleType object definition
RuleType is standardized plain javascript object to describe new types of css rules in VirtualGrammar.
```es6
interface RuleType{
  attribute String type;
  attribute Integer value;
  attribute Function test;
}
```

##### Attributes
Name | Description
-------- | -------
type | Represents a rule type
value | Represents a numeric value assigned to rule type.
test | Holds a test function for css rule matching.

By default, there several rule types based on CSS Object Model spec defined in VirtualGrammar.

Type | Value | Rule-specific interface | CSSOM Ref
-------- | ------- | ------- | -------
STYLE_RULE | 1 | VirtualStyleRule | CSSStyleRule
CHARSET_RULE | 2 | VirtualCharsetRule | CSSCharsetRule
IMPORT_RULE | 3 | VirtualImportRule | CSSImportRule
MEDIA_RULE | 4 | VirtualMediaRule | CSSMediaRule
FONT_FACE_RULE | 5 | VirtualFontFaceRule | CSSFontFaceRule
PAGE_RULE | 6 | VirtualPageRule | CSSPageRule
KEYFRAMES_RULE | 7 | VirtualKeyframesRule | CSSKeyframesRule
KEYFRAME_RULE | 8 | VirtualKeyframeRule | CSSKeyframeRule
NAMESPACE_RULE | 10 | VirtualNamespaceRule | CSSNamespaceRule
SUPPORTS_RULE | 12 | VirtualSupportsRule | CSSSupportsRule
VIEWPORT_RULE | 15 | VirtualViewportRule | CSSViewportRule
UNKNOWN_RULE | 0 | VirtualUnknownRule | CSSUnknownRule

All of described constants are also available as VirtualStyleSheet.RULE_TYPE properties.

### Virtual Actions
All of described constants and types are available as VirtualStyleSheet.YOUR_CONST static parameter.
#### Lazy-parsing actions
Lazy-parsing constants describes the action codes for accepting or rejecting lazy-parsing flags.

Type | Value | Description
---- | ----- | -----------
LAZY_BODY_ACCEPT | -1 | Use to apply a lazy-parsing to "{}" of VirtualRule
LAZY_ALL_ACCEPT | -2 | Use to apply a lazy-parsing to entire VirtualRule
  
#### Filter actions
Filter constants describes the action codes for accepting or rejecting a VirtualRule in filter functions.

Type | Value | Description
---- | ----- | -----------
FILTER_ACCEPT | 0 | Use to accept a VirtualRule in filter function
FILTER_REJECT | 1 | Use to reject a VirtualRule in filter function

#### Parsing actions
There are several action types you can use to parse or reparse specific parts of VirtualRules.

Type | Value | Description
---- | ----- | -----------
PARSE_HEAD | 1 | Parse all additional rule props associated with a head block of the VirtualRule (basically all before outer "{}" block of rule)
PARSE_BODY | 2 | Parse all additional rule props associated with a body block of the VirtualRule (basically all inside outer "{}" block of rule)
PARSE_ALL | 0 | Parse all additional rule props

#### Patch types and actions
Patch is a specific type of action in VirtualStyleSheets which updates its parent VirtualRule with specified data and synchronizes all or specific parts of parent VirtualRule attributes.
Patches in VirtualStyleSheets supports a set of different actions to apply.

Action | Value | Description
------ | ----- | -----------
PATCH_UPDATE | 0 | Updates parent VirtualRule.
PATCH_APPEND | 1 | Means that patch will append some data to parent VirtualRule.
PATCH_PREPEND | 2 | Means that patch will prepend some data to parent VirtualRule.
PATCH_INSERT | 3 | Means that patch will insert some data into parent VirtualRule.
PATCH_REPLACE | 4 | Means that patch will replace some data in parent VirtualRule
PATCH_DELETE | 5 | Means that patch will delete some data from parent VirtualRule

Also, you can accept or reject a patch in prePatchApply hook using one of next constants

Action | Value | Description
------ | ----- | -----------
PATCH_ACCEPT | 0 | Use to accept a patch
PATCH_REJECT | 1 | Use to reject a patch

### Virtual Tokenizer
VirtualRule parsing is based on generic tokenization algorithm.

```es6
class VirtualTokenizer{
  
  object getQualifiedRuleToken(cssText, startIndex);
  object getAtRuleToken(cssText, startIndex);
  object getCommentToken(cssText, startIndex);
  object getWhitespaceToken(cssText, startIndex);
  object getUnknownToken(cssText, startIndex);
  object getToken(cssText, startIndex);
  object tokenize(cssText, level);
}
```

There a several default token types to work with.

Type | Value | Description
---- | ----- | -----------
QUALIFIED_RULE_TOKEN | 1 | Matches to all rules starting with a "*", ".", "#", "[", ":" or a word char.
AT_RULE_TOKEN | 2 | Matches to all rules starting with a "@" char.
COMMENT_TOKEN | 3 | Matches to a comment
WHITESPACE_TOKEN | 4 | Matches to a whitespace, including \n
UNKNOWN_TOKEN | 5 | Matches all other entries

##### Methods

Name | Description
-------- | -------
getQualifiedRuleToken(cssText, startIndex) | Trying to consume a QUALIFIED_RULE_TOKEN starting from a startIndex position. Returns a consumed token or null, if tokenization was fail.
getAtRuleToken(cssText, startIndex) | Trying to consume an AT_RULE_TOKEN starting from a startIndex position. Returns a consumed token or null, if tokenization was fail.
getCommentToken(cssText, startIndex) | Trying to consume an COMMENT_TOKEN starting from a startIndex position. Returns a consumed token or null, if tokenization was fail.
getWhitespaceToken(cssText, startIndex) | Trying to consume an WHITESPACE_TOKEN starting from a startIndex position. Returns a consumed token or null, if tokenization was fail.
getUnknownToken(cssText, startIndex) | Loop through characters consuming until WHITESPACE_TOKEN or COMMENT_TOKEN is spotted. Returns UNKNOWN_TOKEN with consumed characters within.
getToken(cssText, startIndex) | Consumes one of available token types. Returns consumed token or UNKNOWN_TOKEN if nothing fits
tokenize(cssText, level) | Create a set of tokens from specified target cssText string. Level represents a number of token types to match with (2 by default: QUALIFIED_RULE_TOKEN, AT_RULE_TOKEN).

### Virtual Style Declaration Parser
VirtualStyleDeclarationRule parsing is based on generic parsing algorithm.
```es6
class VirtualStyleDeclarationParser{
  Array parse(cssText);
  Object parserAt(cssText, startIndex)
}
```

##### Methods

Name | Description
-------- | -------
parseAt(cssText, startIndex) | Parses a single style declaration from css string starting specified position. Note, cssText should be a body block of target VirtualRule
parse(cssText) | Parses a set of style declarations from css string. Note, cssText should be a body block of target VirtualRule.

### VirtualRuleList
```es6
interface VirtualRuleList{ 
  private readonly attribute Array[VirtualRule] rules;
  readonly attribute Integer length;

  void insert(rule, index);
  VirtualRule remove(index);
  VirtualRule get(id);
  Array[VirtualRule]filter(filterFunc);
}
```

##### Attributes

Name | Description
-------- | -------
length | Represents count of rules in current VirtualRuleList.

##### Methods

Name | Description
-------- | -------
insert(rule, index) | Inserts an additional VirtualRule  rule at specified position index in current VirtualRuleList.
remove(id) | Removes a VirtualRule with target id. Returns removed rule.
get(id) | Returns a VirtualRule that has target id id.
filter(filterFunc) | Returns a set of VirtualRules that satisfy specified target filterFunc function and VirtualStyleSheet.FILTER_ACCEPT and VirtualStyleSheet.FILTER_REJECT flags returned by it.

### Rule Info
RuleInfo is a standardized plain javascript object to describe a generic VirtualRule information.
```es6
interface RuleInfo{
  attribute Integer type;
  attribute Integer startOffset;
  attribute Integer endOffset;
  attribute Integer cssText;
}
```

##### Attributes

Name | Description
-------- | -------
type | Represents a rule type
startOffset | Represents the start position of this rule in source css string
endOffset | Represents the end position of this rule in source css string
cssText | Represents the raw textual representation of the rule, e.g. "h1 { font-size: 12px;}", including all whitespaces, tabs, newlines etc.

### Virtual Patches
Patch is a standardized plain javascript object to describe VirtualStyleSheet actions.
```es6
interface Patch{
  attribute Integer action;
  attribute Integer start;
  attribute Integer end;
  attribute String value;
  attribute Integer patchDelta;
  attribute Boolean reparse;
}
```

##### Attributes

Name | Description
-------- | -------
action | Represents the patch action
start | Equals to position in target VirtualRule value to start patching at
end | Equals to position in target VirtualRule value to end patching at
value | Represents the patch value
patchDelta | Represents a string value change data. If > 0 - forces a chain update of other VirtualRules following by target one.
reparse | If true, triggers complete rule reparsing basing of lazyParsing flag. Is true by default.


### VirtualRuleFactory
```es6
class VirtualRuleFactory{ 
  VirtualRule create(ruleInfo, parentRule, opts);
  VirtualRule createFromToken(token, parentRule, opts);
  boolean register(ruleType, ruleClass);
}
```

##### Methods

Name | Description
-------- | -------
create(ruleInfo, parentRule, opts) | Creates a new specific type of VirtualRule based on passed rule information.
create(token, parentRule, opts) | Creates a new specific type of VirtualRule based on passed token information
register(ruleType, ruleClass) | Connects specific ruleType of VirtualGrammar with specified rule class.


### VirtualRule
```es6
class VirtualRule{
  readonly attribute Integer type;
  readonly attribute Integer startOffset;
  readonly attribute Integer endOffset;
  readonly attribute String cssText;
  readonly attribute Boolean lazyParsing;
  readonly attribute VirtualRule parentRule;

  void patch(patchInfo);
  void parse(parseType);
  object getHead();
  object getBody();
}
```

##### Attributes

Name | Description
-------- | -------
type | One of the CSSOM Type constants indicating the type of rule.
startOffset | Equals to rule’s starting position in source css string
endOffset | Equals to rule’s ending position in source css string
cssText | Represents the raw textual representation of the rule, e.g. "h1 { font-size: 12px;}", including all whitespaces, tabs, newlines etc.
lazyParsing | Represents a type of lazy parsing.
parentRule | Refers to current VirtualRule’s parent rule.

##### Methods

Name | Description
-------- | -------
patch(patchInfo) | Updates all internal attributes basing on current cssText attribute with patch data.
parse(parseType) | Create an additional set of props basing on its rule type.
getHead() | Returns the start and end offset values of rule’s head block (basically all before outer "{}" block)
getBody() | Returns the start and end offset values of rule’s body block (basically all inside outer "{}" block)

### VirtualStyleDeclarationRule
```es6
class VirtualStyleDeclarationRule : VirtualRule  {
  String getPropertyValue(property);
  Boolean isImportant(property);
  String removeProperty(property);
  void setProperty(property, value);
  void insertProperty(id, property, value);
}
```

##### Methods

Name | Description
-------- | -------
getPropertyValue(property) | Returns a target property value.
isImportant(property) | Returns true, if property was marked as "!important";
removeProperty(property) | Deletes a target property from current VirtualStyleDeclaration. If there are a few definitions of same property, removes the last one;
setProperty(property, value) | Applies a property changes in current VirtualStyleDeclaration.
insertProperty(id, property, value) | Inserts target property at specified position of style declaration set.

### VirtualGroupingRule
```es6
class VirtualGroupingRule : VirtualRule  {
  readonly attribute VirtualRuleList rules;
}
```

##### Attributes

Name | Description
-------- | -------
rules | Represents a set of all parsed CSS Rules described in this VirtualGroupingRule.

##### Methods

Name | Description
-------- | -------
insertRule(ruleText, index) | Creates a new VirtualRule from string and inserts it at specified position
deleteRule(index) | Deletes an existing rule at specified position.

### VirtualStyleSheet
```es6
class VirtualStyleSheet : VirtualGroupingRule { 
  void parseFromString(cssText);
}
```

##### Methods

Name | Description
-------- | -------
parseFromString(cssText) | Creates a Virtual CSS Object Model from target cssText string. Opts - is an object that describes a set callback functions for available extension points or other additional flags.


### VirtualStyleRule
```es6
class VirtualStyleRule : VirtualStyleDeclarationRule {
  readonly attribute String selectorText; 

  void setSelector(selectorText);
}
```

##### Attributes

Name | Description
-------- | -------
selectorText | Represents current selector string of this rule

##### Methods

Name | Description
-------- | -------
setSelector(selectorText) | Applies a new selector string to this rule


### VirtualCharsetRule
```es6
class VirtualCharsetRule : VirtualRule {
  readonly attribute String encoding;

  void setEncoding(encoding); 
}
```

##### Attributes

Name | Description
-------- | -------
encoding | Represents the encoding information use in this VirtualCharsetRule

##### Methods

Name | Description
-------- | -------
setEncoding(encoding) | Applies target encoding to this VirtualCharsetRule


### VirtualImportRule
```es6
class VirtualImportRule : VirtualRule {
  readonly attribute String href;
  readonly attribute String media

  void setLocation(href);
  void setMedia(media); 
}
```

##### Attributes

Name | Description
-------- | -------
href | The location of the style sheet to be imported. The attribute will not contain the "url(...)" specifier around the URI.
media | Represents current media string of this rule. Use window.matchMedia to work with.

##### Methods

Name | Description
-------- | -------
setLocation(href) | Applies target href to this VirtualImportRule’s location.
setMedia(media) | Applies new media string to current VirtualImportRule


### VirtualMediaRule
```es6
class VirtualMediaRule : VirtualGroupingRule {
  readonly attribute String media;
}
```

##### Attributes

Name | Description
-------- | -------
media | Represents the media string of current VirtualMediaRule. Use window.matchMedia to perform media matching.

##### Methods

Name | Description
-------- | -------
setMedia(media) | Applies new media string to current VirtualMediaRule.


### VirtualFontFaceRule
```es6
class VirtualFontFaceRule : VirtualStyleDeclarationRule {}
```

### VirtualPageRule
```es6
class VirtualPageRule : VirtualStyleRule {} 
```

### VirtualKeyframesRule
```es6
class VirtualKeyframesRule : VirtualGroupingRule{
  readonly attribute String name;
}
```

##### Attributes

Name | Description
-------- | -------
name | Represents the name of the keyframes animation, used by the animation-name css property.

##### Methods

Name | Description
-------- | -------
setName(name) | Applies a name to target VirtualKeyframesRule


### VirtualKeyframeRule
```es6
class VirtualKeyframeRule : VirtualStyleDeclarationRule {
  readonly attribute String keyText;
}
```

##### Attributes

Name | Description
-------- | -------
keyText | Represents the key of the keyframe, like '10%', '75%'. The from keyword maps to '0%' and the to keyword maps to '100%'.

##### Methods

Name | Description
-------- | -------
setKey(keyText) | Changes the key of target VirtualKeyframeRule


### VirtualNamespaceRule
```es6
class VirtualNamespaceRule : VirtualRule {
  readonly attribute String URI;
  readonly attribute String prefix;
}
```

##### Attributes

Name | Description
-------- | -------
namespaceURI | Returns a string containing the text of the URI of the given namespace.
prefix | Returns a string with the name of the prefix associated to this namespace. If there is no such prefix, returns  null.

##### Methods

Name | Description
-------- | -------
setURI(uri) | Applies target uri to this VirtualNamespaceRule
setPrefix(prefix) | Applies target prefix to this VirtualNamespaceRule


### VirtualSupportsRule
```es6
class VirtualSupportsRule : VirtualGroupingRule{
  readonly attribute String conditionText;
}
```

##### Attributes

Name | Description
-------- | -------
conditionText | represents the condition of the rule. Use CSS.supports() to perform matching.

##### Methods

Name | Description
-------- | -------
setCondition(conditionText) | Applies a condition to target VirtualKeyframesRule


### VirtualViewportRule
```es6
class VirtualViewportRule : VirtualStyleDeclarationRule {}
```

## Development
There are a lot of things which could be improved. So, i’ll have a great pleasure to collaborate with the rest of the community

### Building
* ``npm install``

### Compiling and Testing
* ``npm run webpack`` will launch dist building
* ``npm run watch`` will launch a watcher for dist building
* ``karma start`` will launch testing server

### License

It's all about MIT stuff. (C) 2017 Eugene Ford

