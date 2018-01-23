/**
 * 比如在window.onresize和mousemove一些事件，一改变窗口大小就触发多次，但是我们只需要在一定时间执行2到3次。
 * 
 */

var throttle = function (fn, interval) {
    var _self = fn,
        timer,
        firstTime = true;
    return function () {

        if (firstTime) {
            // _self.apply(null);
            fn();
            return firstTime = false;
        }
        if (timer) {
            return false;
        }

        timer = setTimeout(function () {
            clearInterval(timer);
            timer = null;
            // _self.apply(null);
            fn();
        }, interval || 500)
    }

}


window.onresize = throttle(function () {
    console.log(1);
}, 500)