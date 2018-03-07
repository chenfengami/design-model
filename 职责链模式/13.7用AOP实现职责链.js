Function.prototype.after = function(fn){
    var self = this;
    return function(){
        var ret = self.apply(this, arguments);
        if(ret === 'nextSuccessor'){
            return fn.apply(this, arguments);
        }
        return ret;
    }
};

var order = order500yuan.after(order200yuan).after(order500yuan);



order(1, true, 500);
order(2, true, 500);
order(1, false, 500);
