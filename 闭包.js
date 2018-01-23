//变量的生存周期
var func = function(){
    var a = 1; //退出函数后局部变量a将被销毁
}
func();

//看如下代码 如下就产生一个闭包 局部函数a  返回了一个匿名函数，它可以访问到func()被调用的生产环境
var func = function(){
    var a = 1;
    return function(){
        a++;
    }
}
var f = func();
f();//2
f();//3
f();//4
f();//5

//利用闭包的一些例子
var Type = {};

for(var i = 0, type; type = ['String', 'Array', 'Number'][i++];){
    (function(type){
        Type['is' + type] = function(obj){
            return Object.prototype.toString.call(obj) === '[object '+ type +']';
        }
    })(type)
}
Type.isArray([]); // 输出：true
Type.isString('str'); //输出：true

//封装变量
//把一些不需要暴露在全局的变量封装成“私有变量”。
//以下是计算乘积函数 相同变量将缓存起来提高函数的性能
var mult = (function(){
    var cache = {};
    return function(){
        var args = Array.prototype.join.call(arguments, ',');
        if(cache[args]){
            return cache[args];
        }
        var a = 1;
        for(var i=0,l = arguments.length; i<l;i++){
            a = a * arguments[i];
        }
        return cache[args] = a;
    }    
})();
console.log(mult(1, 2, 3));//输出：6


//提炼函数是代码重构中的一种常用技巧。 
//如果小函数不需要在程序的其它地方使用，最好是用闭包把他们方封闭起来。代码如下：

var mult = (function(){
    var cache = {};
    var calculate = function(){ //封闭calculate函数
        var a = 1;
        for(var i = 0, l = arguments.length; i < l; i++){
            a = a * arguments[i];
        }
        return a;
    };
    return function(){
        var args = Array.prototype.join.call(arguments, ',');
        if(args in cache){
            return cache[ args ];
        }
        return cache[ args ] = calculate.apply( null, arguments )
    }
})();