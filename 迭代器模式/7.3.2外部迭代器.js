/**
 * 外部迭代器必须显示地请求迭代下一个元素。
 * 外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性。
 * 
 */

var Iterator = function(obj){
    var current = 0;
    
    var next = function(){
        current += 1;
    }

    var isDone = function(){
        return current >= obj.length;
    }

    var getCurrItem = function(){
        return obj[current];
    }

    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
};

//再看看如何改写compare函数
var compare = function(iterator1, iterator2){
    while(!iterator1.isDone() && !iterator2.isDone()){
        if(iterator1.getCurrItem() !== iterator2.getCurrItem()){
            throw new Error('不相等');
        }
        iterator1.next();
        iterator2.next();
        console.log('相等');
    }
}

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);

compare(iterator1, iterator2);