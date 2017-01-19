export default {
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
  PARSE_ALL:  0,

  // Patching constants
  PATCH_UPDATE:  0,
  PATCH_APPEND:  1,
  PATCH_PREPEND: 2,
  PATCH_INSERT:  3,
  PATCH_REPLACE: 4,
  PATCH_DELETE:  5,

  PATCH_ACCEPT: 0,
  PATCH_REJECT: 1
}