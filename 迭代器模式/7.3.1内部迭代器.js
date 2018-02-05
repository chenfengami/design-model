//我们刚刚在7.2章节里面编写的each函数属于内部迭代器，each函数的内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用。

/**
 * 优点：外部直接调用 不需要关心内部实现 方便
 * 缺点：规则被提前规定，无法满足之后的需求。如需要，需改写甚至重写函数。
 * 
 */

//比如有一个需求，判断两个数组是否相等，如果不改写each函数本身的代码，我们能够入手的似乎只有回调函数。

var compare = function (ary1, ary2) {
    if (ary1.length !== ary2.length) {
        throw new Error('不相等');
    }
    each(ary1, function (i, n) {
        if (n !== ary2[i]) {
            throw new Error('不相等');
        }
        console.log('相等');
    })
}

compare([1, 2, 3], [1, 2, 4]);