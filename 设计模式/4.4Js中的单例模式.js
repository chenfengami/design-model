//单例模式的核心是确保只有一个实例，并提供全局访问。


//全局模式不是单例模式,但是在JavaScript开发中，我们经常会把全局变量当成单例来使用。

//例如,确实是独一无二的，但是在Js中这样子容易造成变量的全局污染。

var a = {};

//解决方法

/**
 * 1.使用命名空间
 * 适当地使用会减少，但是不能杜绝全局变量。
 */

var namespace1 = {
    a: function () {
        console.log(1);
    },
    b: function () {
        console.log(2);
    }
}

//动态创建命名空间
var myApp = {};

myApp.namespace = function (name) {
    var parts = name.split('.');
    var current = myApp;
    for (var i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
};

myApp.namespace('evebt');
myApp.namespace('dom.style');
console.log(myApp);

/**
 * 2.使用闭包封装私有变量
 * 这种方法把一些变量封装在闭包的函数的内部，只暴露一些接口跟外界通信：
 */

var user = (function () {
    var _name = 'sven',
        _age = 29;
    return {
        getUserInfo: function(){
            return _name + '-' + _age;
        }
    }
})();


