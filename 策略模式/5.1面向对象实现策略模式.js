/*
*一个基于策略模式的程序至少由两部分组成。
*1.第一部分是策略类，策略类封装了具体的算法，并负责具体的计算过程。
*2.第二部分是环境类Context，Context接受客户的请求后，随后把请求委托给某一个策略类。
*要做到这一点，说明Context中要维持对某个策略对象的引用。
*/ 

//现在用策略模式来重构上面的代码。第一个版本是模仿传统面向对象语言中的实现。
//我们先把每种绩效的计算规则都封装在对应的策略类里面：

var performanceS = function(){

}
performanceS.prototype.calculate = function(salary){
    return 4 * salary;
}

var performanceA = function(){
    
}
performanceA.prototype.calculate = function(salary){
    return 3 * salary;
}

var performanceB = function(){

}
performanceB.prototype.calculate = function(salary){
    return 2 * salary;
}

//接下来定义奖金类Bonus
var Bonus = function(){
    this.salary = null; //原始工资
    this.strategy = null; //绩效等级对应的策略对象
}

Bonus.prototype.setSalary = function(salary){ //设置员工的原始工资
    this.salary = salary;
}

Bonus.prototype.setStrategy = function(strategy){ //设置绩效等级对应的策略对象
    this.strategy = strategy;
}

Bonus.prototype.getBonus = function(){ //取得奖金的数额
    return this.strategy.calculate(this.salary);
}

/*
*在完成最终的代码之前，我们再来回顾一下策略模式的思想：
*定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
*说的更详细一点就是：
*定义一系列的算法，把它们各自封装成策略类，算法被封装在策略类内部的方法里。
*在客户对Context发起请求的时候，Context总是把请求委托给这些策略对象中间的某一个进行计算。
*/ 

var bonus = new Bonus();
bonus.setSalary(7000);
bonus.setStrategy(new performanceS()); //设置策略对象

console.log(bonus.getBonus()); // 4 * 7000 = 28000

bonus.setStrategy(new performanceA());

console.log(bonus.getBonus()); // 3 * 7000 = 21000;
