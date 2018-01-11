//在向外暴露对象__proto__属性的浏览器下，以下代码理解new运算的过程

function Person(name){
    this.name = name;
}

Person.prototype.getName = function(){
    return this.name;
}

var objectFactory = function(){
    var obj = new Object(),
        Constructor = [].shift.call(arguments); //Person
    
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    
    return typeof ret === 'object' ? ret : obj;
}

var a = objectFactory(Person, 'sven');

console.log(a.name); //sven
console.log(a.getName()); //sven
console.log(Object.getPrototypeOf(a) === Person.prototype); //true