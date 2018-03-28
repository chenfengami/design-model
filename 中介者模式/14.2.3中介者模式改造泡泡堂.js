//首先仍然定义player对象的原型方法，在player对象的这些原型方法中，不再负责具体的执行逻辑，而是转交给中介者对象。
//我们把中介者对象命名为playerDirector.

function Player(name, teamColor){
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive';
};

Player.prototype.win = function(){
    console.log(this.name + 'won');
};

Player.prototype.lose = function(){
    console.log(this.name + 'lost');
};

//玩家死亡

Player.prototype.die = function(){
    this.state = 'dead';
    playerDirector.receiveMessage('playerDead', this); //给中介者发送消息，玩家死亡
};

//移除玩家

Player.prototype.remove = function(){
    playerDirector.receiveMessage('removePlayer', this); //给中介者发消息，移除一个玩家
};

//玩家换队

Player.prototype.changeTeam = function(color){
    playerDirector.receiveMessage('changeTeam', this, color);
};

//再继续改写之前创建玩家对象的工厂函数，工厂函数不需要再给玩家对象设置队友和敌人。几乎失去了意义。
var playerFactory = function(name, teamColor){
    var newPlayer = new Player(name, teamColor);
    playerDirector.receiveMessage('addPlayer', newPlayer); //给中介者发送消息，新增玩家
    
    return newPlayer;
};


//现在我们来实现中介者playerDirector对象。
//playerDirector对外暴露的接口receiveMessage，负责接收player对象发送的消息，而player对象发送消息的时候，总是把
//自身this作为参数发送给playerDirector，以便playerDirector识别消息来自于哪个玩家

var playerDirector = (function(){
    var players = {}, //保存所有玩家
        operations = {}; //中介者可以执行的操作

    //新增一个玩家
    operations.addPlayer = function(player){
        var teamColor = player.teamColor;
        players[teamColor] = players[teamColor] || []; //如果该颜色的玩家还没有成立队伍，则新成立一个队伍

        players[teamColor].push(player); //添加玩家进队伍
    };
})()