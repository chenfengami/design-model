/**
 * 对象池：对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接new，而是转从对象池里获取，如果对象池没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后，再进入池子等待被下次获取。
 * 
 * 
 */

//12.7.1对象池实现

//先定义一个获取小气泡节点的工厂，作为对象池的数组成为私有属性被包含在工厂闭包里，这个工厂有两个暴露对外的方法，create表示获取一个div节点，recover表示回收一个div节点：

var toolTipFactory = (function(){
    var toolTipPool = []; //toolTip对象池

    return {
        create: function(){
            if(toolTipPool.length === 0){ //如果对象池为空
                var div = document.createElement('div'); //创建一个dom
                document.body.appendChild(div);
                return div;
            }else{
                return toolTipPool.shift(); //则从对象池中取出一个dom
            }
        },
        recover: function(tooltipDom){
            return toolTipPool.push(tooltipDom); //对象池回收DOM
        }
    };
})();

//现在把时间拨回进行第一次搜索的时刻，目前需要创建2个小气泡节点，为了方便回收，用一个数组arr来记录它们。

var ary = [];

for(var i = 0, str; str = ['A', 'B'][i++];){
    var toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
    ary.push(toolTip);
};

//接下来假设地图需要开始重新绘制，在此之前要把这两个节点回收进对象池：

for(var i = 0, toolTip; toolTip = ary[i++];){
    toolTipFactory.recover(toolTip);
};

//再创建6个小气泡

for(var i = 0, str; str = ['A', 'B', 'C', 'D', 'E', 'F'][i++];){
    var toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
};


//11.7.2通用对象池实现
//我们还可以在对象池工厂里，把创建对象的具体过程封装起来，实现一个通用的对象池：

var objPoolFactory = function(createObjFn){
    var objectPool = [];
    return {
        create: function(){
            var obj = objectPool.length === 0
                        ? createObjFn.apply(this, arguments) 
                        : objectPool.shift();

            return obj;            
        },
        recover: function(obj){
            objectPool.push(obj);
        }
    }
};

//现在利用objPoolFactory来创建一个装载一些iframe的对象池：
var iframeFactory = objPoolFactory(function(){
    var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

    iframe.onload = function(){
        iframe.onload = null; //防止iframe重复加载的BUG
        iframeFactory.recover(iframe); //iframe加载完成之后回收节点
    }

    return iframe;
});

var iframe1 = iframeFactory.create();
iframe1.src = 'http://www.baidu.com';

var iframe2 = iframeFactory.create();
iframe2.src = 'http://QQ.com';

setTimeout(function(){
    var iframe3 = iframeFactory.create();
    iframe3.src = 'http://163.com';
}, 3000);