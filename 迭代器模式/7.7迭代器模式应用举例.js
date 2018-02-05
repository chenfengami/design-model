//以下代码目的是根据不同的浏览器获取相应的上传组件对象：

var getUploadObj = function(){
    try{
        return new ActiveXObject('TXFTNActiveX.FTNUpload'); //IE上传控件
    }catch(e){
        if(supportFlash()){
            var str = '<object type="application/x-shockwave-flash"></object>';
            return $(str).appendTo($('body'));
        }else{
            var str = '<input name="file" type="file" />'; //表单上传
            return $(str).appendTo($('body'));
        }
    }
};

//上述泰马充斥了  try catch if条件分支，很难阅读并且严重违反开闭原则。


//重构上述代码
//同样 我们把每种获取upload对象的方法都封装在各自的函数里，然后使用一个迭代器，迭代获取这些upload对象，直到获取到一个可用的为止：
var getActiveUploadObj = function(){
    try{
        return new ActiveXObject('TXFTNActiveX.FTNUpload'); //IE上传控件
    }catch(e){
        return false;
    }
}

var getFlashUploadObj = function(){
    if(supportFlash()){
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $(str).appendTo($('body'));
    }
        return false;
}

var getFormUploadObj = function(){
    var str = '<input name="file" type="file" />'; //表单上传
    return $(str).appendTo($('body'));
}

//迭代器代码如下：
var iteratorUploadObj = function(){
    for(var i = 0, fn; fn = arguments[i++];){
        var uploadObj = fn();
        if(uploadObj !== false){
            return uploadObj;
        }
    }
};

var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj);

