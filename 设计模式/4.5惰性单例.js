//定义：惰性单例指的是需要的时候才创建对象实例。

//通用的单例模式


//管理单例逻辑，在以下例子中 用参数fn的形式传入getSingle，我们不仅可以传入createLoginLayer, 还可以传入createScript，还能传入其它。。。等
//result永远在闭包内，不会被销毁。

var getSingle = function(fn){
    var result;
    return function(){
        return result || (result = fn.apply(this, arguments));
    };
}

var createLoginLayer = function(){
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮框';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}

var createSingleLoginLayer = getSingle(createLoginLayer);


var createSingleIframe = getSingle(function () {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
});

document.getElementById('loginBtn').onclick = function(){
    var loginLayer = createSingleIframe();
    loginLayer.style.display = 'block';
}

