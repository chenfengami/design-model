//变量的生存周期
var func = function(){
    var a = 1; //退出函数后局部变量a将被销毁
}
func();

//看如下代码 如下就产生一个必报 局部函数a  返回了一个匿名函数，它可以访问到func()被调用的生产环境
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
            return Object.prototype.toString.call(obj) === '[object'+ type +']';
        }
    })(type)
}
Type.isArray([]); // 输出：true
Type.isString('str'); //输出：true

//reading 38页