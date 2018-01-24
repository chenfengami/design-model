//为了解决4.2中说到的一些问题。我们引入代理类。

var CreateDiv = function(html){
    this.html = html;
    this.init();
};

CreateDiv.prototype.init = function(){
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

//接下来引入代理类proxySingletonCreateDiv:

var proxySingletonCreateDiv = (function(){
    var instance;
    return function(html){
        if(!instance){
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();

var a = new proxySingletonCreateDiv('sven1');
var b = new proxySingletonCreateDiv('sven2');
console.log(a === b);