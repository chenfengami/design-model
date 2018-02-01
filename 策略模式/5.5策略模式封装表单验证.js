/**
     * @param {验证表单信息}
     * @param {使用方法}
     *  var errorMsg = self.$utils.validator()([{
     *  input: xxx, //需要验证的表单value值
     *  rules: [{
     *      strategy: xx, //所定义的验证方法
     *      errorMsg: xx //错误提示信息 
     *  }]
     * },{
     *  input: xxx, //需要验证的表单value值
     *  rules: [{
     *      strategy: xx, //所定义的验证方法
     *      errorMsg: xx //错误提示信息 
     *  }] 
     * }])
     *   if(errorMsg){
     *     self.$vux.toast.text(errorMsg);
     *     return;
     *   }
     */ 
    validator(){
        let strategies,validataFunc;
      
        //设置策略对象 规则
        strategies = {
          isNonEmpty: function(value, errorMsg){ //不为空
            if(value === ''){
              return errorMsg;
            }
          },
          minLength: function(value, length, errorMsg){ //限制最小长度
            if(value.length < length){
              return errorMsg;
            }
          },
          maxLength: function(value, length, errorMsg){ //限制最大长度
            if(value.length > length){
              return errorMsg;
            }
          },
          isEqual: function(oldValue, newValue, errorMsg){ //匹配是否相等
            if(oldValue !== newValue){
                return errorMsg;
            }
          }
        };

        //Validator类的实现
        var Validator = function(){
          this.cache = []; //保存校验规则
        };
  
        Validator.prototype.add = function(value, rules){
          var self = this;
          for(var i = 0, rule; rule = rules[i++];){
            (function(rule){
                var strategyAry = rule.strategy.split(':');
                var errorMsg = rule.errorMsg;
                self.cache.push(function(){
                    var strategy =strategyAry.shift();
                    strategyAry.unshift(value);
                    strategyAry.push(errorMsg);
                    return strategies[strategy].apply(null, strategyAry);
                })
                
            })(rule);
          }
        };

        Validator.prototype.start = function(){
          for(var i = 0, validatorFunc; validatorFunc = this.cache[i++];){
            var errorMsg = validatorFunc(); //开始校验，并取得校验后的返回信息
            if(errorMsg){ //如果有确切的返回值，说明校验没有通过
              return errorMsg;
            }
          }
        };        

        //Context 用户调用和进行表单匹配
        validataFunc = function(options){
            var validator = new Validator();
    
            /***************添加校验规则***************/         
            for(var i = 0, strategy; strategy = options[i++];){
                validator.add(strategy.input, strategy.rules);
            }
            var errorMsg = validator.start(); //获得校验结果
            return errorMsg; //阻止表单提交
          }

        return validataFunc;
    }