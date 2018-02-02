//小明拖A给女神B送花 这里先不适用代理模式

var Flower = function(){};

var xiaoming = {
    sendFlower: function(target){
        var flower = new Flower();
        target.receiveFlower(flower);
    }
};

var A = {
    receiveFlower: function(flower){
        console.log('收到花' + flower);
    }
};

xiaoming.sendFlower(A);

//现在引入代理B，小明通过B来给A送花 并且交代给B 如果A是好心情再把花送给她 提高成功率

var Flower = function(){};

var xiaoming = {
    sendFlower: function(target){
        var flower = new Flower();
        target.receiveFlower(flower);
    }
};

var B = {
    receiveFlower: function(flower){
        A.listenGoodMood(function(){ //监听A的好心情
            A.receiveFlower(flower);
        })
    }
}

var A = {
    receiveFlower: function(flower){
        console.log('收到花' + flower);
    },
    listenGoodMood: function(fn){
        setTimeout(function(){ //假设十秒之后心情很好
            fn();
        }, 10000)
    }
}
xiaoming.sendFlower(B);

