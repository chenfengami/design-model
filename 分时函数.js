/**
 * 当我们需要在页面渲染很多个节点的时候，如果一次性加载太多则会造成页面卡顿甚至崩溃
 * 如：在地图上面打N个marker,然后再将这些点进行连线，则需要分时处理。
 * 
 * 代码如下：
 */

var timeChunk = function (data, fn, count) {
    var self = fn;
    var obj, t;
    var start = function () {
        for (var i = 0; i < Math.min(count || 1, data.length); i++) {
            obj = ary.shift();
            self.call(null, obj);
        }
    };

    return function () {
        t = setInterval(function () {
            if (data.length === 0) {
                clearInterval(t);
                return;
            }
            start();
        }, 150)
    }
}

var ary = [];
for (var i = 1, l = 1000; i <= l; i++) {
    ary.push(i);
};
var renderFriendList = timeChunk(ary, function (n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8);


renderFriendList();