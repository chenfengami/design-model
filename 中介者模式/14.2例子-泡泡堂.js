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
};

Player.prototype.die = function(){ //玩家死亡
    var all_read = true;
    this.state = 'dead'; //设置玩家状态为死亡

    for(var i = 0, partner; partner = this.partners[i++];){ //遍历队友列表
        if(partner.state !== 'dead'){ // 如果还有一个队友没有死亡，则游戏未失败
            all_read = false;
            break;
        }
    }

    if(all_read === true){ //如果队友全部死亡
        this.lose(); //通知自己游戏失败
        for(var i = 0, partner; partner = this.partners[i++];){
            partner.lose();
        }
        for(var i = 0, enemy; enemy = this.enmies[i++];){ //通知所有敌人游戏胜利
            enemy.win();
        }
    }
};

//最后定义一个工厂来创建玩家：

var playerFactory = function(name, teamColor){
    var newPlayer = new Player(name, teamColor); //创建新玩家

    for(var i = 0, player; player = players[i++];){ //通知所有的玩家，有新角色加入
        if(player.teamColor === newPlayer.teamColor){ //如果是同一队的玩家
            player.partners.push(newPlayer); //相互添加到队友列表
            newPlayer.partners.push(player);
        }else{
            player.enmies.push(); // 相互添加到敌人列表
            newPlayer.enmies.push(player);
        }
    }
    players.push(newPlayer);

    return newPlayer;
};
