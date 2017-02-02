import VirtualActions from "./VirtualActions";
import VirtualRule from "./VirtualRule";
import VirtualStyleDeclarationParser from "./VirtualStyleDeclarationParser";

const NEW_LINE   = "\n".charCodeAt(0);
const WHITESPACE = " ".charCodeAt(0);
const SEMICOLON  = ";".charCodeAt(0);

export default class VirtualStyleDeclarationRule extends VirtualRule{
  constructor(ruleInfo, parentRule = null, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Changes an existing style declaration
   * @param declaration
   * @param property
   * @param value
   * @private
   */
  _changeProperty(declaration, property, value) {
    let body, start, end, code, suffix, val, original, i;
    // Get body block bounds
    body = this.getBody();

    // Calculate patch bounds
    start = body.startOffset + declaration.startOffset;
    end = body.startOffset + declaration.endOffset;

    // Copy style declaration suffix for proper formatting
    original = this.cssText.substring(start, end);
    suffix = 0;
    for (i = original.length - 1; i >= 0; i++){
      code = original.charCodeAt(i);
      if (code !== WHITESPACE && code !== SEMICOLON && code !== NEW_LINE) break;
      suffix++;
    }

    // Recreate new style declaration in string format
    val = `${property}: ${value}${original.substr(original.length - suffix)}`;

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      value: val, start, end,
      patchDelta: val.length - declaration.endOffset - declaration.startOffset
    })
  }

  /**
   * Create new style declaration
   * @param property
   * @param value
   * @private
   */
  _appendProperty(property, value){
    let declaration, bounds, val, code, start, end, suffix, i, prefix;

    // Get body block bounds
    bounds = this.getBody();

    // Append new style declaration to existing ones
    if (this.style && this.style.length) {
      // Get the new declaration suffix
      suffix = 0;
      i = bounds.endOffset;
      while (i-- >= 0){
        code = this.cssText.charCodeAt(i);
        if (code !== WHITESPACE && code !== NEW_LINE) break;
        suffix++;
      }
      suffix = this.cssText.substring(bounds.endOffset - suffix, bounds.endOffset);

      // Get the new declaration prefix
      declaration = this.style.get(0);
      prefix = this.cssText.substring(bounds.startOffset, bounds.startOffset + declaration.startOffset);

      // Build new declaration string
      val = `${prefix}${property}: ${value};${suffix}`;
      start = bounds.endOffset - suffix.length;
      end = bounds.endOffset;

      // Check if last declaration is closed with ;
      declaration = this.style.get(this.style.length - 1);
      if (declaration.endOffset === (bounds.endOffset - bounds.startOffset)){
        val = `;${val}`;
      }
    }
    // Or create completely new style declaration
    else {
      val = `\n  ${property}: ${value};\n`;
      start = bounds.startOffset;
      end = bounds.endOffset;
    }

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start, end, value: val,
      patchDelta: val.length - end - start
    })
  }

  /**
   * Insert target style declaration at specified position
   * @param id
   * @param property
   * @param value
   * @private
   */
  _insertProperty(id, property, value){
    let declaration, start, val, bounds, suffix, prefix;

    // Get body block bounds
    bounds = this.getBody();

    // Get a style declaration at specified position
    declaration = this.style.get(id);

    // Try to append new style declaration to current set
    if (id >= this.style.length){
      this._appendProperty(property, value);
    }
    // Or insert somewhere in the middle
    else if (id >= 0) {
      start = bounds.startOffset + declaration.startOffset;
      suffix =  this.cssText.substring(bounds.startOffset, bounds.startOffset + this.style.get(0).startOffset);
      val = `${property}: ${value};${suffix}`;

      this.patch({
        action: VirtualActions.PATCH_INSERT,
        start, value: val, patchDelta: val.length
      });
    }
    // Otherwise, throw an error
    else {
      throw new Error("Cant insert a property at negative position "+id);
    }
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_BODY || parseType == VirtualActions.PARSE_ALL) {
      let bounds, body, declarations, style, i;

      // Get Rule body bounds (startOffset and endOffset)
      bounds = this.getBody();
      body = this.cssText.substring(bounds.startOffset, bounds.endOffset);

      // Get a set of declarations to work with
      declarations = VirtualStyleDeclarationParser.parse(body);

      if (declarations.length) {
        style = new VirtualList();

        for (i = 0; i < declarations.length; i++){
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
  getPropertyValue(property){
    if (typeof property !== "string") throw new TypeError("Property is not a string.");
    let i, declaration;

    if (this.style){
      for (i = 0; i < this.style.length; i++){
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
  isImportant(property){
    if (typeof property !== "string") throw new TypeError("Property is not a string.");
    let i, declaration;
    if (this.style){
      for (i = 0; i < this.style.length; i++){
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
  removeProperty(property){
    if (typeof property !== "string") throw new TypeError("Property is not a string.");
    let i, declaration, body, isChanged;

    // Try to remove target property from style declaration list
    if (this.style) {
      for (i = this.style.length - 1; i >= 0; i--){
        declaration = this.style.get(i);
        if (declaration.property === property) {
          this.style.remove(i);
          isChanged = true;
          break;
        }
      }
    }

    // Apply delete patch to this rule is style declaration list was changed
    if (isChanged){
      // Get body block bounds
      body = this.getBody();

      this.patch({
        action: VirtualActions.PATCH_DELETE,
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
  setProperty(property, value){
    if (typeof property !== "string") throw new TypeError("Property is not a string.");
    if (typeof value !== "string") throw new TypeError("Value is not a string.");

    let newDecl, i, declaration, changable;

    //Try to build a new style declaration using StyleDeclarationParser
    newDecl = VirtualStyleDeclarationParser.getDeclarationToken(`${property}: ${value};`, 0);

    // Check for bad input
    if (!newDecl.property || !newDecl.value) throw new SyntaxError("Bad input");

    if (this.style){
      for (i = this.style.length - 1; i >= 0; i--){
        declaration = this.style.get(i);

        // Check if existing rule can be replaced
        if (declaration.property === property) {
          changable = true;
          break;
        }
      }
    }

    // Replace existing style declaration
    if (changable){
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
  insertProperty(id, property, value){
    if (typeof id !== "number") throw new TypeError("ID is not a number.");
    if (typeof property !== "string") throw new TypeError("Property is not a string.");
    if (typeof value !== "string") throw new TypeError("Value is not a string.");

    // Try to insert new style declaration into existing set
    if (this.style && this.style.length){
      this._insertProperty(id, property, value);
    }
    // Otherwise, create completely new set
    else {
      this._appendProperty(property, value);
    }
  }
}