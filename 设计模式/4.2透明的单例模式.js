//在下面的例子中，我们将使用CreateDiv单例类，它的作用是负责在页面中创建唯一的div节点

var CreateDiv = (function(){
    var instance;

    var CreateDiv = function(html){
        if(instance){
            return instance;
        }
        this.html = html;        
        this.init();
        return instance = this;
    }

    CreateDiv.prototype.init = function(){
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }
    return CreateDiv;
})();

var a = new CreateDiv('sven1');
var b = new CreateDiv('sven2');

console.log(a === b); //true

// 如果有一天我们需要利用这个类，在页面中创建千千万万个div，即要让整个类从单例类变成一个普通的可产生多个实例的类。就必须重写CreateDiv构造函数