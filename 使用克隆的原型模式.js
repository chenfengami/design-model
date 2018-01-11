var Plane = function(){
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
}

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;


//兼容写法
Object.create = Object.create || function(obj){
    var F = function(){};
    F.prototype = obj;
    return new F();
}

var clonePlane = Object.create(plane);
console.log(clonePlane.__proto__); // Plane { blood: 500, attackLevel: 10, defenseLevel: 7 }