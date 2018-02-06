/*
  在程序中，发布-订阅模式可以用一个全局Event对象来实现，订阅者不需要了解消息来自哪个发布者，
发布者也不知道消息会推送给哪些订阅者，Event作为一个类似“中介者”的角色，把订阅者和发布者联系在一起。
*/

var Event = (function(){
    var clientList = {},
        listen,
        trigger,
        remove;

    listen = function(key, fn){
        if(!clientList[key]){
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };

    trigger = function(){
        var key = Array.prototype.shift.call(arguments),
            fn = clientList[key];
            if(!fns || fns.length === 0){
                return false;
            }
            for(var i = 0, fn; fn = fns[i++];){
                fn.apply(this, arguments);
            }
    };

    remove = function(key, fn){
        var fns = clientList[key];
        if(!fns){
            return false;
        }
        if(!fn){
            fns && (fns.length = 0);
        }else{
            for(var l = fns.length - 1; l >= 0; l--){
                var _fn = fns[l];
                if(_fn === fn){
                    fns.splice(l, 1);
                }
            }
        }
    };

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

Event.listen('squareMeter88', function(price){ //小明订阅消息
    console.log('价格= ' + price);
});

Event.trigger('squareMeter88', 2000000); //售楼处发布消息