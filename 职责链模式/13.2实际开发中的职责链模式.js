/**
 * 需求如下：
 *  正式购买：已经支付过500元定金的用户会收到100元的商城优惠券，200元定金的用户可以收到50元优惠券。
 *  为正式购买（没有支付定金）：没有优惠券，而且在库券有限的情况下不能买到。
 * 
 */
//未用职责链重构代码前的代码如下：
var order = function (orderType, pay, stock) {
    if (orderType === 1) { //500元定金购买模式
        if (pay === true) { //已支付定金
            console.log('500元定金已支付，得到100优惠券');
        } else { //未支付定金，降级到普通购买模式
            if (stock > 0) { //用于普通购买的手机还有库存
                console.log('普通购买，无优惠券');
            } else {
                console.log('手机库存不足');
            }
        }
    } else if (orderType === 2) { //200元定金购买模式
        if (pay === true) {
            console.log('200元定金预购，得到50优惠券');
        } else {
            if (stock > 0) {
                console.log('普通购买，无优惠券');
            } else {
                console.log('手机库存不足');
            }
        }
    } else if (orderType === 3) {
        if (stock > 0) {
            console.log('普通购买，无优惠券');
        } else {
            console.log('手机库存不足');
        }
    }
}

order(1, true, 500);

//13.3用职责链模式重构代码

var order500 = function(orderType, pay, stock){
    if(orderType === 1 && pay === true){
        console.log('500元定金预购，得到100优惠券');
    }else{
        order200(orderType, pay, stock);
    }
};

var order200 = function(orderType, pay, stock){
    if(orderType === 2 && pay === true){
        console.log('200元定金预购，得到50优惠券');
    }else{
        orderNormal(orderType, pay, stock);
    }
};

var orderNormal = function(orderType, pay, stock){
    if(stock > 0){
        console.log('普通购买，无优惠券');
    }else{
        console.log('手机库存不足');
    }
};
//测试结果：
order500(1, true, 500);
order500(1, false, 500);
order500(2, true, 500);
order500(3, false, 500);
order500(3, false, 0);


//虽然目前已经有了不小的进步，但我们不会满足于此，虽然已经把大函数拆分成了互不影响的3个小函数但可以看到，请求在链条传递中的顺序非常僵硬，传递请求的代码被耦合在业务函数之中
var order500 = function(orderType, pay, stock){
    if(orderType === 1 && pay === true){
        console.log('500元定金预购，得到100优惠券');
    }else{
        order200(orderType, pay, stock);
        //order200和order500耦合在一块
    }
};
