/*
    高级函数特点
    1.使用函数作为参数
    2.使用函数作为返回值
*/

// 在页面创建100个div节点，并且将这些节点都隐藏

// 第一种编码方式
var appendDiv = function(){
    for(var i=0; i<100; i++){
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.appendChild(div);
        div.style.display = 'none';
    }
};

appendDiv();
//难以复用，并不是每一个人希望创建了节点之后就立刻被隐藏

// 于是我们进行处理， 将div.style.display单独抽离出来

var appendDiv = function(callback){
    for(var i=0; i<100; i++){
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.appendChild(div);
        if(callback instanceof Function){
            callback(div);
        }
    }
};

appendDiv(function(node){
    node.style.display = 'none';
})