var getId = document.getElementById;
getId('xx'); //Illegal invocation 因为此时this已经指向window

//通过apply来改变this指向
document.getElementById = (function(func){
    return function(){
        return func.apply(document, arguments);
    }
})(document.getElementById);

var getId = document.getElementById;
getId('xx');

//call是apply的语法糖  apply不需要指定参数对应的位置，一般只要传入一个参数数组。即可
//call则是参数要一一对应 如下

function Func(a, b, c){
    var sum = a + b + c;
    return sum;
}

Func.call(null, 1, 2, 3); //6 a->1, b->2, c->3 第一个参数null则默认指向宿主对象window 
Func.apply(null, [1 ,2 ,3]); //6 严格模式下 'use strict' null为空


//Function.prototype.bind  用来指定函数内部的this指向
//模拟bind
Function.prototype.bind = function(context){
    var self = this; //保存原函数
    return function(){
        return this.apply(context, arguments);
    }
};

var obj = {
    name: 'Amy'
};

var func = function(){
    console.log(this.name); //Amy
}.bind(obj);
func();