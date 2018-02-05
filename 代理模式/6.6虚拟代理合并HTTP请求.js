//首先我们来看没有使用代理时候的情况

<body>
    <input type="checkbox" id="1" />
    <input type="checkbox" id="2" />
    <input type="checkbox" id="3" />
    <input type="checkbox" id="4" />
    <input type="checkbox" id="5" />
    <input type="checkbox" id="6" />
    <input type="checkbox" id="7" />
    <input type="checkbox" id="8" /> 
    <input type="checkbox" id="9" />       
</body>

//如此频繁的网络请求将会带来相当大的开销。
var synchronousFile = function(id){
    console.log('开始同步文件, id为：' + id);
};

var checkbox = document.getElementsByTagName('input');

for(var i = 0, c; c = checkbox[i++];){
    c.onclick = function(){
        if(this.checked === true){
            synchronousFile(this.id);
        }
    }
}

//解决方案，我们可以通过一个代理函数proxySynchronousFile来收集一段时间之内的请求，最后一次性发送给服务器。

var proxySynchronousFile = (function(){
    var cache = [],
        timer;
    
        return function(id){
            cache.push(id);
            if(timer){
                return;
            }
            timer = setTimeout(function(){
                synchronousFile(cache.join(',')); // 2s后向本体发送需要同步的ID集合
                clearTimeout(timer);
                timer = null;
                cache.length = 0;
            }, 2000);
        }
})()
for(var i = 0, c; c = checkbox[i++];){
    c.onclick = function(){
        if(this.checked === true){
            proxySynchronousFile(this.id);
        }
    }
}