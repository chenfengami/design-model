/**
 * 通过模板方法模式，我们在父类中封装了子类的算法框架。
 * 但是如果有一些有个性的子类呢？比如我们有的子类不需要加糖和加咖啡
 * 这时候我们就需要钩子方法（hook）可以解决这个问题。
 * 方法钩子的返回结果决定了模板方法后面部分的执行步骤。这样一来程序就有变化的可能。
 */

 var Beverage = function(){};

 Beverage.prototype.boilWater = function(){console.log('把水煮沸')};
 Beverage.prototype.brew = function(){throw new Error('子类必须重写该方法')};
 Beverage.prototype.pourInCup = function(){throw new Error('子类必须重写该方法')};
 Beverage.prototype.addCondiments = function(){console.log('子类必须重写该方法')};
 //钩子函数，用于实现子类的个性化。
 Beverage.prototype.customerWantsCondiments = function(){
    return true; //默认需要调料
 };

 Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    if(this.customerWantsCondiments()){ //如果挂钩为true，则需要调料
        this.addCondiments();
    }
 };

 //实现子类
 var CoffeeWithHook = function(){};

 CoffeeWithHook.prototype = new Beverage();

 CoffeeWithHook.prototype.brew = function(){
    console.log('用沸水冲泡咖啡');
 };

 CoffeeWithHook.prototype.pourInCup = function(){
    console.log('把咖啡倒进杯子');
 };

 CoffeeWithHook.prototype.addCondiments = function(){
    console.log('加糖和牛奶');
 };

 CoffeeWithHook.prototype.customerWantsCondiments = function(){
    return window.confirm('请问需要调料吗？');
 };

 var coffeeWithHook = new CoffeeWithHook();
 coffeeWithHook.init();