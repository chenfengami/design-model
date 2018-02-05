 //8.4【自定义事件】以上我们看到订阅者接收到了发布者发布的每个消息，虽然小明想买88平米的房子，但是发布者把110平米的也发布给了小明。

 //所以我们有必要增加一个标识key，让订阅者只订阅自己感兴趣的信息。对此我们进行以下修改。

 var saleOffices = {}; //定义售楼处

 saleOffices.clientList = {}; //缓存列表，存放订阅者的回调函数

 saleOffices.listen = function(key, fn){ //增加订阅者
    if(!this.clientList[key]){
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn); //订阅的消息添加进消息缓存列表
 }
 
 saleOffices.trigger = function(){ //发布消息
    var key = Array.prototype.shift.call(arguments), //取出消息类型
        fns = this.clientList[key]; //取出消息对应的回调函数集合
        
    if(!fns || fns.length === 0){ //如果没有订阅该消息，则返回
        return false;
    }
    
    for(var i = 0, fn; fn = fns[i++];){
        fn.apply(this, arguments); //arguments是发布消息时附送的参数
    }
 };

 saleOffices.listen('squareMeter88', function(price){ //小明订阅88平米的房子
    console.log('价格= ' + price);
 });
 saleOffices.listen('squareMeter110', function(price){ //小红订阅110平米的房子
    console.log('价格= ' + price);
 });


saleOffices.trigger('squareMeter88', 2000000);
saleOffices.trigger('squareMeter110', 3000000);
