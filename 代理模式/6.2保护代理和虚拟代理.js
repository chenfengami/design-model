/**
 * @param {保护代理}
 * @param {定义：} 代理B可以帮助A过滤掉一些请求，比如过滤掉送花的人年龄太大或者没有宝马的。这种请求直接在代理B处被拒绝掉。
 *                   A和B一个充当白脸，一个充当黑脸。白脸A继续保持良好的女神形象，不希望直接拒绝任何人，于是找了黑脸B来控制对A的访问。
 * 
 */ 


//虚拟代理：假设现实中的花价格不菲，可以在心情好的时候再交代B给A送花。
//虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建。

var B = {
    receiveFlower: function(flower){
        A.listenGoodMood(function(){ //监听A的好心情
            var flower = new Flower();
            A.receiveFlower(flower);
        })
    }
}

