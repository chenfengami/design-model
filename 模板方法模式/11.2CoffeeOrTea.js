/**
 * 1.模板方法模式是一种只需使用继承就可以实现的非常简单的模式。
 * 2.由两部分构成：第一部分是抽象父类，第二部分是具体的实现子类
 *  
 */


/** 
 * 【泡咖啡】
 *  把水煮沸 
 *  用沸水冲泡咖啡
 *  把咖啡倒进杯子
 *  加糖和牛奶
*/  

/** 
 * 【泡茶】
 *  把水煮沸 
 *  用沸水浸泡茶叶
 *  把茶水倒进杯子
 *  加柠檬
*/ 
 var Coffee = function(){};
 
 Coffee.prototype.boilWater = function(){
     console.log('把水煮沸');
 };

 Coffee.prototype.brewCoffeeGriends = function(){
    console.log('用沸水冲泡咖啡');
 };

 Coffee.prototype.pourInCup = function(){
    console.log('把咖啡倒进杯子');
 };

 Coffee.prototype.addSugarAndMilk = function(){
     console.log('加糖和牛奶');  
 };

 Coffee.prototype.init = function(){
    this.boilWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
 };

 var coffee = new Coffee();
 coffee.init();
 
 //泡茶的具体实现不罗列出来了。步骤基本上和泡咖啡一致。
 //分离出公共点 抽象为
 /** 
 * 【泡XX】
 *  把水煮沸 
 *  用沸水冲泡饮料
 *  把饮料倒进杯子
 *  加调料
*/ 

//创建一个抽象父类来表示泡一杯饮料的过程。
var Beverage = function(){};

Beverage.prototype.boilWater = function(){ //这是共有方法 直接在父类定义。
    console.log('把水煮沸');
};

Beverage.prototype.brew = function(){}; //空方法，应该由子类重写

Beverage.prototype.pourInCup = function(){}; //空方法，应该由子类重写

Beverage.prototype.addCondiments = function(){}; //空方法，应该由子类重写

Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};

//创建Coffee子类和Tea子类  这里Tea子类的创建方法是和Coffee一样的

var Coffee = function(){};
Coffee.prototype = new Beverage();

Coffee.prototype.brew = function(){
    console.log('用沸水冲泡咖啡');
};

Coffee.prototype.pourInCup = function(){
    console.log('把咖啡倒进杯子');
};

Coffee.prototype.addCondiments = function(){
    console.log('加糖和牛奶');
};

var coffee = new Coffee();
coffee.init();