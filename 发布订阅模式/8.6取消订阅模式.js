//比如小明突然不想买房子了，为了避免接受售楼处推过来的信息。就该取消之前订阅的事件。
//现在我们给event对象增加remove方法：
var event = {
    clientList: {},
    listen: function (key, fn) { //订阅消息
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); //订阅的消息添加进缓存列表
    },
    trigger: function () { //推送消息
        var key = Array.prototype.shift.call(arguments), //取出消息类型
            fns = this.clientList[key]; //对应的函数集合

        if (!fns || fns.length === 0) { //如果没有订阅该消息，则返回
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments); //arguments是发布消息时附送的参数
        }
    },
    remove: function(key, fn){ //取消订阅
        var fns = this.clientList[fn];

        if(!fns){ //如果用户没有订阅该消息，则直接返回
            return false;
        }
        if(!fn){ //如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
            fns && (fns.length = 0)
        }else{
            for(var l = fns.length - 1; l >=0; l--){ //反向遍历订阅的回调函数列表
                var _fn = fns[l];
                if(_fn === fn){
                    fns.splice(l, 1); //删除订阅者的回调函数
                }
            }
        }
    }
};
var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
}
var saleOffices = {};
installEvent(saleOffices);

saleOffices.listen('squareMeter88', function (price) { //小明订阅88平米的房子
    console.log('价格= ' + price);
});
saleOffices.listen('squareMeter110', function (price) { //小红订阅110平米的房子
    console.log('价格= ' + price);
});
