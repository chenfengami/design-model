/**
 * 第一步：把这些校验逻辑都封装成策略对象。
 * 
 */ 

var strategies = {
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
    isMobile: function(value, errorMsg){ //手机号码格式
        if(!/(^1[3][5][8][0-9]{9}$)/.test(value)){
            return errorMsg;
        }
    }
}

//接下来准备实现Validator类。在这里作为Context，负责接收用户的请求并委托给strategy对象。

var validataFunc = function(){
    var validator = new Validator(); //创建一个validator对象

    // 添加一些校验规则
    validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
    validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位');
    validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

    var errorMsg = validator.start(); //获得校验结果
    return errorMsg; //返回校验结果
}

var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function(){
    var errorMsg = validataFunc(); //如果errorMsg有确切的返回值，说明未通过检验
    if(errorMsg){
        alert(errorMsg);
        return false; //阻止表单提交
    }
}

//最后是Validator类的实现

var Validator = function(){
    this.cache = []; //保存校验规则
}

Validator.prototype.add = function(dom, rule, errorMsg){
    var ary = rule.split(':'); //把strategy和参数分开来
    this.cache.push(function(){
        var strategy = ary.shift(); //用户挑选的strategy
        ary.unshift(dom.value); //把input的value添加进参数列表
        ary.push(errorMsg); //把errorMsg添加进参数列表
        return strategies[strategy].apply(dom, ary);        
    });
};

Validator.prototype.start = function(){
    for(var i = 0, validataFunc; validataFunc = this.cache[i++];){
        var msg = validataFunc(); //开始校验，并取得校验后的返回信息
        if(msg){
            return;
        }
    }
}

//在修改某个校验规则的时候，只需要编写或者改写少量的代码。比如把输入框的的校验规则改成不能少于10个字符。

validator.add(registerForm.userName, 'minLength:10', '用户名长度不能小于10位');


//给某一个文本输入框添加多种校验规则