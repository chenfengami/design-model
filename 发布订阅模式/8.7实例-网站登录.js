//假如一个登录模块是我们写的。如下是登录成功后所回调执行的一些方法。

login.succ(function(data){
    header.setAvatar(data.avatar); //设置header模块的头像
    nav.setAvatar(data.avatar); //设置导航模块的头像
    message.refresh(); //刷新消息列表
    cart.refresh(); //刷新购物车列表
})

//上述代码耦合性将会使程序变得僵硬，header模块不能再随意改变setAvatar的方法名。它自身也不能修改为header1等。
//这是针对具体实现编程的典型例子，针对具体实现编程是不被赞同的。

//等到有一天 又有一个需求出现需要登录之后刷新一下收货地址 于是我们又在代码最后加上这一句代码
login.succ(function(data){
    header.setAvatar(data.avatar); //设置header模块的头像
    nav.setAvatar(data.avatar); //设置导航模块的头像
    message.refresh(); //刷新消息列表
    cart.refresh(); //刷新购物车列表
    address.refresh(); //刷新收货地址列表
})


//接下来用发布-订阅来重构这些代码，对用户信息感兴趣的业务模块将自行订阅登录成功的消息事件。
//当登录成功后，登录模块只需要发布登录成功的信息，而业务方接受到消息之后，就会开始进行各自的业务处理，登录模块并不关心业务方究竟要去做什么，也不想去了解它们的内部细节。

$.ajax('http://www.xxx.com?login', function(data){ //登录成功
    login.trigger('loginSucc', data); //发布登录成功的消息
});

//各模块监听登录成功的消息：

var header = (function(){ //header模块
    login.listen('loginSucc', function(data){
        header.setAvatar(data.avatar);
    });
    return {
        setAvatar: function(data){
            console.log('设置header模块的头像');
        }
    }
})();

var nav = (function(){ //nav模块
    login.listen('loginSucc', function(data){
        nav.setAvatar(data.avatar);
    });
    return {
        setAvatar: function(avatar){
            console.log('设置nav模块的头像');
        }
    }
})();

//如上所示，我们随时可以把setAvatar的方法名改为setTouxiang。
//如果有一天登录完成之后，又增加一个刷新收货列表的行为。就不需要再关心这些

var address = (function(){
    login.listen('loginSucc', function(obj){
        address.refresh(obj);
    });
    return {
        refresh: function(avatar){
            console.log('刷新收货地址列表');
        }
    }
})();