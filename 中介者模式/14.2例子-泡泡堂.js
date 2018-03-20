//先定义一下玩家构造函数，它有3个简单的原型方法：Player.prototype.win、Player.prototype.lose、Player.prototype.die
//因为玩家的数目是2，所以当其中一个玩家死亡的时候游戏便结束，同时提示他胜利。

function Player(name){
    this.name = name;
    this.enemy = null;
};

console.log(Player.name);


Player.prototype.win = function(){
    console.log(this.name + '赢了');
};

Player.prototype.lose = function(){
    console.log(this.name + '输了');
};

Player.prototype.die = function(){
    this.lose();
    this.enemy.win();
};

var player1 = new Player('皮蛋');
var player2 = new Player('小乖');

player1.enemy = player2;
player2.enemy = player1;

player1.die();

//14.2.1为游戏增加队伍
/**
 * 如果用plaer1.partners = [player1, player2, ...];
 *      player1.enemies = [player1, player2, ...]; 就很低效
 */ 

//所以我们先定义一个数组来保存所有玩家，在创建玩家之后，循环来给给每个玩家设置队友和敌人：

var players = [];
function Player(name, teamColor){
    this.partners = []; //队友列表
    this.enmies = []; //敌人列表
    this.state = 'live'; //玩家状态
    this.name = name; //角色名字
    this.teamColor = teamColor; //队伍颜色
};

Player.prototype.win = function(){ //玩家团队胜利
    console.log('winner' + this.name);
};

Player.prototype.lose = function(){
    console.log('loser' + this.name); //玩家团队失败
}

