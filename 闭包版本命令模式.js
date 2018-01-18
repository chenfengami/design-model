`
    <button id="execute">点击我实现命令</button>
    <button id="undo">点击我实现命令</button>
`
var Tv = {
    open: function(){
        console.log('打开电视机');
    },
    close: function(){
        console.log('关上电视机');
    }
};

var createCommand = function(receiver){
    var execute = function(){
        return receiver.open(); //执行命令，打开电视机
    }
    var undo = function(){
        return receiver.close(); //执行命令，关闭电视机
    }
    return {
        execute: execute,
        undo: undo
    }
};

var setCommand = function(command){
    document.getElementById('execute').onclick = function(){
        command.execute(); //输出：打开电视机
    }
    document.getElementById('undo').onclick = function(){
        command.undo(); //输出：关闭电视机
    }
}

setCommand(createCommand(Tv))