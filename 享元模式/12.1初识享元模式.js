//为50种男士内衣和50种女士内衣，正常情况下需要50种男士内衣和50种女士内衣，然后让他们每人分别穿上一件内衣来拍照
//不适用享元模式的情况下，程序如下：

var Model = function (sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
};

Model.prototype.takePhoto = function () {
    console.log('sex= ' + this.sex + ' underwear' + this.underwear);
};

//创建50个男模特并为他们穿上衣服拍照
for (var i = 1; i <= 51; i++) {
    var maleModel = new Model('male', 'underwear' + i);
    maleModel.takePhoto();
};

//创建50个男模特并为他们穿上衣服拍照
for (var j = 1; j <= 51; j++) {
    var femaleModel = new Model('female', 'underwear' + i);
    femaleModel.takePhoto();
};


//如果以后新增为10000种内衣，就需要创建100000个模特对象，这个程序可能会因为如此多的对象已经提前崩溃。


//现在我们来改写代码，既然只需要区别男女模特，那我们先把underware参数从构造器中删除，只接收sex参数。

var Model = function (sex) {
    this.sex = sex;
};

Model.prototype.takePhoto = function () {
    console.log('sex= ' + this.sex + ' underwear= ' + this.underwear);
};

var maleModel = new Model('male'),
    femaleModel = new Model('female');

for (var i = 1; i <= 51; i++) {
    maleModel.underwear = 'underwear' + i;
    maleModel.takePhoto();
};

for (var j = 1; j <= 51; j++) {
    femaleModel.underwear = 'underwear' + i;
    femaleModel.takePhoto();
};