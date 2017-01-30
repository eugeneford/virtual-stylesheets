import VirtualActions from "./VirtualActions.es6";
import VirtualGroupingRule from "./VirtualGroupingRule.es6";

export default class VirtualMediaRule extends VirtualGroupingRule {
  constructor(ruleInfo, parentRule, opts){
    super(ruleInfo, parentRule, opts);
  }

  /**
   * Parse media string from current cssText
   * @returns {string|*}
   * @private
   */
  _parseMedia(){
    let bounds, media;

    // Get rule head block's bounds
    bounds = this.getHead();

    // Get the head block of this rule
    media = this.cssText.substring(bounds.startOffset, bounds.endOffset).trim();

    // Remove @media prefix
    media = media.substring(6).trim();

    return media;
  }

  parse(parseType){
    super.parse(parseType);
    if (parseType === VirtualActions.PARSE_HEAD || parseType == VirtualActions.PARSE_ALL){
      this.media = this._parseMedia();
    } else {
      this.media = null;
    }
  }

  /**
   * Apply new media string to current rule
   * @param media
   */
  setMedia(media){
    if (typeof media !== "string") throw new TypeError("Your media prop is not a string");
    let head = this.getHead();

    let newMedia = "@media " + media;

    this.patch({
      action: VirtualActions.PATCH_REPLACE,
      start: head.startOffset,
      end: head.endOffset,
      value: newMedia,
      patchDelta: newMedia.length - head.endOffset
    })
  }
}

