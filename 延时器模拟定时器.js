var setInter = function(fn, time){
    var temp = setInter;
    setTimeout(function(){
        temp.call(null);
    }, time)
}


setInter(function(){
    console.log(1);
}, 500);