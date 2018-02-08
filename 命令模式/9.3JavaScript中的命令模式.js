//无论接收者被保存为对象的属性，还是被封闭在闭包产生的环境中，在将来执行命令的时候，接收者都能被顺利访问。
//用闭包实现的命令模式如下代码所示：

var setCommand = function(button, func){
    button.onclick = function(){
        func();
    }
};

var MenuBar = {
    refresh: function(){
        console.log('刷新菜单界面');
    }
};

var RefreshMenuBarCommand = function(receiver){
    return function(){
        receiver.refresh();
    }
};

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);

setCommand(button1, refreshMenuBarCommand);

//当然，如果想更明确地表达当前正在使用命令模式，或者除了执行命令之外，将来有可能还要提供撤销命令等操作。那我们最好还是把执行函数改为调用execute方法：

var MenuBar = {
    refresh: function(){
        console.log('刷新菜单界面');
    }
};


var RefreshMenuBarCommand = function(receiver){
    return {
        execute: function(){
            receiver.refresh();
        }
    }
};



var setCommand = function(button, command){
    button.onclick = function(){
        command.execute();
    }
}

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);

setCommand(button1, refreshMenuBarCommand);