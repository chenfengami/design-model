/**
 * curring又称部分求值。
 * 一个curring的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，
 * 刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的参数都会一次性用来求值。
 */


 //如下  编写一个计算每月开销的函数，在每天结束之前，我们都要记录今天花费了多少钱。

 var monthlyCost = 0;
 
 var cost = function(money){
    monthlyCost += money;
 }
 cost(100); //第1天开销
 cost(200); //第2天开销
 cost(300); //第3天开销
 //...cost(700) 第30天开销

 console.log(monthlyCost);; //输出：600
 
 //以上函数每次都要计算 我们并不关心每一天到底花了多少钱 而是每个月花了多少钱 ，因此应该在每个月的最后一天进行计算 前29天应该只是保存之前的值

var cost = (function(){
    var args = [];
    return function(){
        if(arguments.length === 0){
            var money = 0;
            for(var i = 0, l = args.length; i < l; i++){
                money += args[i];
            }
            return money;
        }else{
            [].push.apply(args, arguments);
        }
    }
})();

cost(100); //第1天开销
cost(200); //第2天开销
cost(300); //第3天开销
console.log(cost()); //输出：600

//接下来我们由上面推下来写一个curring函数

var curring = function(fn){
    var args = [];
    return function(){
        if(arguments.length === 0){
            return fn.apply(this, args);
        }else{
            [].push.apply(args, arguments);
        }
    }
}
var cost = (function(){
    var money = 0;
    return function(){
        for(var i = 0, l = arguments.length; i < l ;i++){
            money += arguments[i];
        }
        return money;
    }
})();

var cost = curring(cost);

cost(100); //未真正求值
cost(200); //未真正求值
cost(300); //未真正求值
console.log(cost()); //600