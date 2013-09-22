function NRaya (size, level) {
    this.size = size;
    this.level = level;
    this.tree = null;
    this.board = [];
    this.initBoard();
}    
   
NRaya.prototype.initBoard = function() {
    for (var i = 0; i < this.size; i++) {
        this.board[i] = [];
        for (var j = 0; j < this.size; j++) {
            this.board[i].push(null);
        }
    }
}

NRaya.prototype.getNextStep = function() {
    this.tree = new MinMaxTree(this.board, this.getScore, this.level);
    console.log(this.tree.bestPlay);
    return this.tree.bestPlay;
}

NRaya.prototype.getScore = function(node) {
    var globalScore = { computer : 0,
                        human : 0 } 
    /* Horizontal score */
    for (var i = 0; i < node.data.length; i++) {
        var score = { computer : 0,
                      human : 0 };
        for (var j = 0; j < node.data.length; j++) {
            if (node.data[i][j] == true  || node.data[i][j] == null) {
                ++score.computer;
            }
            if (node.data[i][j] == false || node.data[i][j] == null) {
                ++score.human;
            }
        }
        if (score.human == node.data.length) {
            ++globalScore.human;
        }
        if (score.computer == node.data.length) {
            ++globalScore.computer;
        }
    }


    /* Vertical score */
    for (var i = 0; i < node.data.length; i++) {
        var score = { computer : 0,
                      human : 0 };
        for (var j = 0; j < node.data.length; j++) {
            if (node.data[j][i] == true  || node.data[j][i] == null) {
                ++score.computer;
            }
            if (node.data[j][i] == false || node.data[j][i] == null) {
                ++score.human;
            }
        }
        if (score.human == node.data.length) {
            ++globalScore.human;
        }
        if (score.computer == node.data.length) {
            ++globalScore.computer;
        }
    }

    /* Diagonal score */
    var score = { human : { diagonalExt : 0, diagonalInt : 0 },
                  computer : { diagonalExt : 0, diagonalInt : 0 } };
    for (var i = 0; i < node.data.length; i++) {
        /* Diagonal Exterior '\' */
        if (node.data[i][i] == null) {
            ++score.human.diagonalExt;
            ++score.computer.diagonalExt;
        }
        else if (node.data[i][i] == true) {
            ++score.computer.diagonalExt;
        }
        else /* if (node.data[i][i] == false) */ {
            ++score.human.diagonalExt;
        }
        /* Diagonal Interior '/' */
        if (node.data[i][node.data.length - i - 1] == null) {
            ++score.human.diagonalInt;
            ++score.computer.diagonalInt;
        }
        else if (node.data[i][node.data.length - i - 1] == true) {
            ++score.computer.diagonalInt;
        }
        else /* if (node.data[i][node.data.length - i - 1] == false) */ {
            ++score.human.diagonalInt;
        }
    }
   
    globalScore.human += (score.human.diagonalInt == node.data.length) + (score.human.diagonalExt == node.data.length);
    globalScore.computer += (score.computer.diagonalInt == node.data.length) + (score.computer.diagonalExt == node.data.length); 

    console.log(globalScore); 
    return globalScore.computer - globalScore.human;
}
