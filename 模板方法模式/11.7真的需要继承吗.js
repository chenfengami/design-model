//在好莱坞原则的指导下，下面这段代码可以达到和继承一样的效果。
//好莱坞原则：“别调用我，我调用你”，子类不能调用父类，父类通知子类。

var Beverage = function(param){

    var boilWater = function(){
        console.log('把水煮沸');
    };

    var brew = param.brew || function(){
        throw new Error('必须传递brew方法');
    };

    var pourInCup = param.pourInCup || function(){
        throw new Error('必须传递pourInCup方法');        
    };

    var addCondiments = param.addCondiments || function(){
        throw new Error('必须传递addCondiments方法');
    };

    var F = function(){};
    F.prototype.init = function(){
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };

    return F;
};

var Coffee = Beverage({
    brew: function(){
        console.log('用沸水冲泡咖啡');
    },
    pourInCup: function(){
        console.log('把咖啡倒进杯子');
    },
    addCondiments: function(){
        console.log('加糖和牛奶');
    }
});

var Tea = Beverage({
    brew: function(){
        console.log('用沸水冲泡茶叶');
    },
    pourInCup: function(){
        console.log('把茶倒进杯子');
    },
    addCondiments: function(){
        console.log('加柠檬');
    }
});

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();