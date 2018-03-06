//本节我们采用一种更灵活的方式，来改进上面的职责链模式，目标是让链中的各个节点可以灵活拆分和重组。
var order500 = function(orderType, pay, stock){
    if(orderType === 1 && pay === true){
        console.log('500元定金预购，得到100优惠券');
    }else{
        return 'nextSuccessor'; //我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var order200 = function(orderType, pay, stock){
    if(orderType === 2 && pay === true){
        console.log('200元定金预购，得到50优惠券');
    }else{
        return 'nextSuccessor'; //我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var orderNormal = function(orderType, pay, stock){
    if(stock > 0){
        console.log('普通购买，无优惠券');
    }else{
        console.log('手机库存不足');
    }
};

//接下来需要把函数包装进职责链节点，我们定义一个构造函数Chain，在new Chain的时候传递的参数即为需要被包装的函数，同时它还拥有一个实例属性this.successor，表示在链中的下一个节点。

var Chain = function(fn){
    this.fn = fn;
    this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor;
};

Chain.prototype.passRequest = function(){
    var ret = this.fn.apply(this, arguments);

    if(ret === 'nextSuccessor'){
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }

    return ret;
};

//现在我们把3个订单函数分别包装成职责链的节点：

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

//然后指定节点在职责链中的顺序：

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

//最后把请求传递给第一个节点：

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, false, 0);