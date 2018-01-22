//通过uncurring的方式，Array.prototype.push.call变成了一个通用的push函数。
Function.prototype.uncurring = function(){
    var self = this;
    return function(){
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};

var push = Array.prototype.push.uncurring();

(function(){
    push(arguments, 4);
})(1, 2, 3);

//我们还可以一次性地把Array.prototype上的方法‘复制’到array对象上
//同样这些方法可操作的对象也不仅仅只是array对象：
for(var i = 0, fn, ary = ['push', 'shift', 'forEach']; fn = ary[i++];){
    Array[fn] = Array.prototype[fn].uncurring();
};

var obj = {
    'length': 3,
    '0': 1,
    '1': 2,
    '2': 3
};

Array.push(obj, 4); //向对象中添加一个元素
console.log(obj.length); //4

var first = Array.shift(obj); //截取第一个元素
console.log(first); //输出：1
console.log(obj); //输出：{0: 2, 1: 3, 2: 4, length: 3}

Array.forEach(obj, function(e, i){
    console.log(i); //分别输出 0 1 2
})
