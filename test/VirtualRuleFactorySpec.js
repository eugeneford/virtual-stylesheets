var VirtualRuleFactory = VSM.VirtualRuleFactory;
var VirtualRule = VSM.VirtualRule;
var VirtualStyleSheet = VSM.VirtualStyleSheet;
var VirtualStyleRule = VSM.VirtualStyleRule;

describe("VirtualRuleFactory", function(){
  describe("create()", function(){
    it("Threw an Error when RuleInfo wasnt passed", function(){
      var rule, func = function(){
        rule = VirtualRuleFactory.create();
      };
      expect(func).toThrowError(Error);
    });

    it('Successfuly created a new VirtualRule', function(){
      var rule, func = function(){
        rule = VirtualRuleFactory.create({
          type: VirtualStyleSheet.STYLE_RULE,
          startOffset: 0,
          endOffset: 8,
          cssText: ".test {}"
        });
      }();
      expect(rule instanceof VirtualRule).toEqual(true);
    });

    it('Threw an Error when a not registered rule type was passed', function(){
      var rule, func = function(){
        rule = VirtualRuleFactory.create({
          type: 50,
          startOffset: 0,
          endOffset: 8,
          cssText: ".test {}"
        });
      };
      expect(func).toThrowError(TypeError);
    });

    it('Successfully handled a preParsingFilter hook', function(){
      var rule, func = function(){
        rule = VirtualRuleFactory.create({
          type: VirtualStyleSheet.STYLE_RULE,
          startOffset: 0,
          endOffset: 8,
          cssText: ".test {}"
        }, null, {
          preParsingFilter: function(ruleInfo){
            return VirtualStyleSheet.LAZY_BODY_ACCEPT;
          }
        });
      }();
      expect(rule.lazyParsing).toEqual(VirtualStyleSheet.LAZY_BODY_ACCEPT);
    });

    it('Ignored passed rule while was processing a preParsingFilter hooks', function(){
      var rule, func = function(){
        rule = VirtualRuleFactory.create({
          type: VirtualStyleSheet.STYLE_RULE,
          startOffset: 0,
          endOffset: 8,
          cssText: ".test {}"
        }, null, {
          preParsingFilter: function(ruleInfo){
            return VirtualStyleSheet.FILTER_REJECT;
          }
        });
      }();
      expect(rule).toEqual(null);
    });
  });

  describe("createFromToken()", function(){
    it('Threw an Error when token wasnt passed', function(){
      var rule, func = function(){
        rule = VirtualRuleFactory.createFromToken();
      };
      expect(func).toThrowError(Error);
    });

    it('Successfully created a rule from token', function(){
      var rule, func = function(){
        rule = VirtualRuleFactory.createFromToken({
          type: 1,
          startOffset: 0,
          length: 8,
          value: ".test {}"
        });
      }();
      expect(rule instanceof VirtualStyleRule).toEqual(true);
    });
  });

  describe("register()", function(){
    it('Threw an Error when RuleType wasnt passed', function(){
      var func = function(){
        VirtualRuleFactory.register();
      };
      expect(func).toThrowError(Error);
    });

    it('Threw an Error when type wasnt a number', function(){
      var func = function(){
        VirtualRuleFactory.register("test");
      };
      expect(func).toThrowError(Error);
    });

    it('Threw an Error when ruleClass wasnt passed', function(){
      var func = function(){
        VirtualRuleFactory.register(1);
      };
      expect(func).toThrowError(Error);
    });

    it('Threw an Error when ruleClass wasnt a class', function(){
      var func = function(){
        VirtualRuleFactory.register(1, "test");
      };
      expect(func).toThrowError(Error);
    });

    it('Successfully registered a new VirtualRule class', function(){
      var result, func = function() {
        result = VirtualRuleFactory.register(1, VirtualStyleRule);
      }();
      expect(result).toEqual(true);
    });
  });
});