/**定义：一个类仅有一个实例，并提供一个访问它的全局访问点。
 * 当我们单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少次登录按钮，这个浮窗都只会被创建一次。这就适合用单例模式来创建。
 * 实现方法：用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。
 */

var Singleton = function(name){
    this.name = name;
    this.instance = null;
}
Singleton.prototype.getName = function(){
    alert(this.name);
}
Singleton.getInstance = function(name){
    if(!this.instance){
        this.instance = new Singleton(name);
    }
    return this.instance;
}

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');

console.log(a === b); //true

// 或者

var Singleton = function(name){
    this.name = name;
};

Singleton.prototype.getName = function(){
    alert(this.name);
}
Singleton.getInstance = (function(){
    var instance = null;
    return function(name){
        if(!instance){
            instance = new Singleton(name);
        }
        return instance;
    }
})();
console.log(a === b); //true
