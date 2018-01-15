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
    return function(){ // 返回一个新函数
        return self.apply(context, arguments);
    }
};

var obj = {
    name: 'Amy'
};

var func = function(){
    console.log(this.name); //Amy
}.bind(obj);
func();

//可自定义参数的bind
Function.prototype.bind = function(){
    var self = this, //保存原函数
        context = [].shift.call(arguments); //指定上下文 obj
        args = [].slice.call(arguments); //剩下的转换为数组[1, 2]
        return function(){
            return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
            //第一个参数args[1, 2]和后面传入的不定参数[3, 4] 合并为一个参数 即 [1, 2, 3, 4]
        }
}

var obj = {
    name: 'sven'
}

var func = function(a, b, c, d){
    console.log(this.name); //输出：even
    console.log([a, b, c, d]); //输出 [1, 2, 3, 4]
}.bind(obj, 1, 2);
func(3, 4);


//借用其他对象的方法

var A = function(name){
    this.name = name;
}

var B = function(){
    A.apply(this, arguments);
}

B.prototype.getName = function(){
    return this.name;
}

var b = new B('Amy');
console.log(b.getName()); //输出：Amy