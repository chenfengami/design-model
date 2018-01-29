//实际上在JavaScript语言中，函数也是对象。所以更简单和直接的做法是把strategy直接定义为函数：

var strategies = {
    "S": function(salary){
        return salary * 4;
    },
    "A": function(salary){
        return salary * 3;
    },
    "B": function(salary){
        return salary * 2;
    }
};

var calculateBonus = function(level, salary){
    return strategies[level](salary);
}

console.log(calculateBonus('S', 7000)); // 28000
console.log(calculateBonus('A', 7000)); // 21000