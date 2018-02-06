//假设现在小明又去另一个售楼处买房子，那么8.4代码需要重写，有没有什么方法能让所有对象都用于发布-订阅功能？

//答案是有的 看以下代码

//我们把发布-订阅的功能提取出来，放在一个单独的对象内：

var event = {
    clientList: {},
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); //订阅的消息添加进缓存列表
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments), //取出消息类型
            fns = this.clientList[key]; //对应的函数集合

        if (!fns || fns.length === 0) { //如果没有订阅该消息，则返回
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments); //arguments是发布消息时附送的参数
        }
    }
};

//再定义一个installEvent函数，这个函数可以给所有的对象都动态安装发布-订阅功能：
var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
}

//再来测试一下，我们给售楼处saleOffices动态添加发布-订阅功能
var saleOffices = {};
installEvent(saleOffices);

saleOffices.listen('squareMeter88', function (price) { //小明订阅88平米的房子
    console.log('价格= ' + price);
});
saleOffices.listen('squareMeter110', function (price) { //小红订阅110平米的房子
    console.log('价格= ' + price);
});


saleOffices.trigger('squareMeter88', 2000000);
saleOffices.trigger('squareMeter110', 3000000);
