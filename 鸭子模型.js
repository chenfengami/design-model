//多态性 鸭子模型 只注重行为而不是注重对象本身，能叫就是对的
var makSound = function(animal){
    if(animal.sound instanceof Function){
        animal.sound();        
        return;
    }
    console.log('no sound function');
}

var Duck = function(){};
Duck.prototype.sound = function(){
    console.log('嘎嘎嘎');
}

var Chicken = function(){};
Chicken.prototype.sound = function(){
    console.log('咯咯咯');
}

var Dog = function(){};
Dog.prototype.sounda = function(){
    console.log('汪汪汪');
}

makSound(new Duck());
makSound(new Chicken());
makSound(new Dog());


