//在10.7提到的例子中，组合对象保存了它下面的子节点的引用，这是组合模式的特点，
//此时树结构是从上往下的。但是有时候我们需要在子节点保持对父节点的引用。


//当我们删除一个文件时，应该是在这个文件夹下删除对应的文件。

var Folder = function(name){
    this.name = name;
    this.parent = null; //增加this.parent属性
    this.files = [];
};

Folder.prototype.add = function(file){
    file.parent = this; //设置父对象
    this.files.push(file);
};

Folder.prototype.scan = function(){
    console.log('开始扫描文件夹：' + this.name);
    for(var i = 0, file, files = this.files; file = files[i++];){
        file.scan();
    }
};

//接下来增加remove方法，表示移除该文件夹：
Folder.prototype.remove = function(){
    if(!this.parent){ //根节点或者树外的游离节点
        return;
    }
    for(var files = this.parent.files, l = files.length - 1; l >= 0; l--){
        var file = files[l];
        if(file === this){
            files.splice(l, 1);
        }
    }
};

//File类的实现基本一致：
var File = function(name){
    this.name = name;
    this.parent = null;
};

File.prototype.add = function(){
    throw new Error('不能添加在文件下面');
};

File.prototype.scan = function(){
    console.log('开始扫描文件：' + this.name);
};

File.prototype.remove = function(){
    if(!this.parent){
        return;
    }
    for(var files = this.parent.files, l = files.length - 1; l >= 0; l--){
        var file = files[l];
        if(file === this){
            files.splice(l, 1);
        }
    }
};

//下面来测试一下移除文件功能；

var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var file1 = new Folder('深入浅出Node.js');

folder1.add(new File('JavaScript设计模式与开发实践'));
folder.add(folder1);
folder.add(file1);

folder1.remove(); //移除文件夹
folder.scan();