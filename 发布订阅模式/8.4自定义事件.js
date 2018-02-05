/**
 * 
 * @param 首先要指定谁充当发布者（比如售楼处）
 * @param 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者（售楼处的花名册）;
 * @param 最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数（遍历花名册，挨个发短信）。
 * 
 */

 var saleOffices = {}; //定义售楼处

 saleOffices.clientList = []; //缓存列表，存放订阅者的回调函数
 
 saleOffices.listen = function(fn){ //增加订阅者
    this.clientList.push(fn); //订阅的消息添加进缓存列表
 };

 saleOffices.trigger = function(){ //发布消息
    for(var i = 0, fn; fn = this.clientList[i++];){
        fn.apply(this, arguments); //arguments是发布消息时带上的参数
    }
 };

 //接下来进行一些简单的测试：
 
 saleOffices.listen(function(price, squareMeter){ //小明订阅消息
    console.log('价格= ' + price);
    console.log('squareMeter= ' + squareMeter);
    //以上我们看到订阅者接收到了发布者发布的每个消息，虽然小明想买88平米的房子，但是发布者把110平米的也发布给了小明。
   
    //所以我们有必要增加一个标识key，让订阅者只订阅自己感兴趣的信息。对此我们进行以下修改。
 });

 saleOffices.listen(function(price, squareMeter){ //小红订阅消息
    console.log('价格= ' + price);
    console.log('squareMeter= ' + squareMeter);
 });

 saleOffices.trigger(20000, 3);
 saleOffices.trigger(3000000, 110);
 


 