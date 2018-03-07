/*
    高阶函数特点
    1.使用函数作为参数
    2.使用函数作为返回值
*/

// 函数作为参数
// 在页面创建100个div节点，并且将这些节点都隐藏

// 第一种编码方式
var appendDiv = function(){
    for(var i=0; i<100; i++){
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.appendChild(div);
        div.style.display = 'none';
    }
};

appendDiv();
//难以复用，并不是每一个人希望创建了节点之后就立刻被隐藏

// 于是我们进行处理， 将div.style.display单独抽离出来

var appendDiv = function(callback){
    for(var i=0; i<100; i++){
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.appendChild(div);
        if(callback instanceof Function){
            callback(div);
        }
    }
};

appendDiv(function(node){
    node.style.display = 'none';
})


//函数作为返回值

var isString = function(obj){
    return Object.prototype.toString.call(obj) === '[object String]';
}

var isArray = function(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';    
}

var isNumber = function(obj){
    return Object.prototype.toString.call(obj) === '[object Number]';
}

//以上代码大部分实现都是相同的，唯一不同的是返回的字符串 因此提前把字符串传入进去

var isType = function(type){
    return function(obj){
        return Object.prototype.toString.call(obj) === '[object '+ type +']';
    }
}

var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');

console.log(isArray([1, 2, 3])); //输出： true

//我们还可以用for循环批量注册这些isType函数 利用之前的闭包存储局部变量 防止for循环异步刷新导致变量存储失效

var Type = {};

for(var i = 0, type; type = ['String', 'Array', 'Number'][i++];){
    (function(type){
        Type['is' + type] = function(obj){
            return Object.prototype.toString.call(obj) === '[object '+ type +']';
        }
    })(type)
};

Type.isArray([1, 2, 3]); //输出： true


//单例类型 getSingle让函数成为参数 又在返回的时候返回一个函数
var getSingle = function(fn){
    var ret;
    return function(){
        return ret || (ret = fn.apply(this, arguments))
    };
}


var getScript = getSingle(function(){
    return document.createElement('script');
});
var script1 = getScript();
var script2 = getScript();
console.log(script1 === script2);



//高阶函数实现AOP（面向切面编程）
//将一些核心业务逻辑无关的功能抽离出来
//优点：1、保持业务逻辑模块的纯净；2、高内聚性；3、利于复用
Function.prototype.before = function(beforeFn){
    var _self = this; //保存原函数的引用
    return function(){ //返回包含了原函数和新函数的 “代理”函数
        beforeFn.apply(this, arguments); //执行新函数，修正this
        return _self.apply(this, arguments); //执行原函数
    }
}
Function.prototype.after = function(afterFn){
    var _self = this;
    return function(){
        var ret = _self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
}

var func = function(){
    console.log(2);
}

func = func.before(function(){
    console.log(1);
}).after(function(){
    console.log(3);
})

func(); //先后输出：1 2 3