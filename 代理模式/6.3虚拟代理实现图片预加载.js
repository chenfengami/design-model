//在web开发中，图片预加载是一种常用的技术，如果直接给某个img标签节点添加src属性，由于图片过大或者网络不加，往往会有段时间是一片空白。
//常见做法是先用一张loading图片占位，然后用异步的方式加载图片，等图片加载完毕之后再把它填充到img节点里。


//先实现一个普通的本体对象，这个对象负责往页面中创建一个img标签，并且提供一个对外的setSrc接口，外部调用这个接口，便可以给该img标签设置src属性

var myImage = (function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src){
            imgNode.src = src;
        }
    }
})();

myImage.setSrc('xxxx.png');

//可以看到 在网络不是很顺畅的时候可以看见图片未加载好之前，有明显的空白时间。

//现在开始引入代理对象proxyImage，通过这个代理对象，在图片被真正加载好之前，页面中将出现一张占位的图片。

var proxyImage = (function(){
    var img = new Image();
    img.onload = function(){
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function(src){
            myImage.setSrc('loading.gif'); //占位符图片
            img.src = src;
        }
    }
})()

proxyImage.setSrc('xxxx.png');