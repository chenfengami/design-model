/**
 * 了解一些常见的缓动算法，这些算法最初来自Flash，但可以非常方便地移植到其他语言中。
 * 这些算法都接受4个参数，参数的意义分别是【动画已消耗的时间】、【小球原始位置】、【小球目标位置】、【动画持续的总时间】，返回的值【动画元素应该处在的当前位置】
 */ 


var tween = {
    linear: function(t, b, c, d){
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function(t, b, c, d){
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d){
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function(t, b, c, d){
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function(t ,b, c, d){
        return c * ((t = t / d -1) * t * t + 1) + b;
    }
};

//接下来定义Animate类，Animate的构造函数接受一个参数：即将运动起来的dom节点。Animate类的代码如下：
var Animate = function(dom){
    this.dom = dom; //运动绑定的节点
    this.startTime = 0; //动画开始时间
    this.startPos = 0; //dom初始位置
    this.endPos = 0; //dom终点位置
    this.propertyName = null; //dom需要被改变的css属性名
    this.easing = null; //缓动算法
    this.duration = null; //动画持续时间
}

//接下来Animate.prototype.start方法负责启动这个动画，在动画被启动的一瞬间，要记录一些信息，供缓动算法在以后计算小球当前位置的时候使用。
/**
 * 
 * @param {*要改变的CSS属性名，比如'left'、'top'分别表示左右移动和上下移动} propertyName 
 * @param {*小球运动的目标位置} endPos 
 * @param {*动画持续时间} duration 
 * @param {*缓动算法} easing 
 */ 
Animate.prototype.start = function(propertyName, endPos, duration, easing){
    this.startTime = +new Date; //动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName]; //dom节点的初始位置
    this.propertyName = propertyName; //dom节点需要被改变的css属性名
    this.endPos = endPos; //dom节点目标位置
    this.duration = duration; //动画持续事件
    this.easing = tween[easing]; //缓动算法
    
    var self = this;
    var timeId = setInterval(function(){ //启动定时间，开始执行动画
        if(self.step() === false){
            clearInterval(timeId);
        }
    }, 19);
}

//接下来Animate.prototype.step代表小球运动的每一帧要做的事情。
//在这个方法负责计算小球的当前位置和调用更新CSS属性值的方法Animate.prototype.update

Animate.prototype.step = function(){
    var t = +new Date; //取得当前时间
    if(t >= this.startTime + this.duration){
        this.update(this.endPos); //更新小球的CSS属性值
        return false;
    }
    
    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration); //小球当前位置
    this.update(pos); //更新小区的CSS属性    
}

//最后负责更新小球的CSS属性值的Animate.prototype.update方法
Animate.prototype.update = function(){
    this.dom.style[this.propertyName] = pos + 'px';
}
