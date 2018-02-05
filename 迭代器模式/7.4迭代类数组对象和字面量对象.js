//迭代器模式不仅可以迭代数组，还可以迭代一些数组的对象。比如arguments、{"0": 'a', "1": 'b'}等

//以jQuery$.each为例

$.each = function(obj, callback){
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj);

        if(isArray){
            for(; i < length; i++){
                value = callback.call(obj[i], i, obj[i]);

                if(value === false){
                    break;
                }
            }
        }else{
            for(i in obj){
                value = callback.call(obj[i], i, obj[i]);
                
                if(value === false){
                    break;
                }
            }
        }
        return obj;
};