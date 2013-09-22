Array.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this));
}

/* Struct Node */
function Node (data, isMax) {
    this.data = data;
    this.childs = [];
    this.isMax = isMax;
}

function MinMaxTree (initialState, functionEval, levelTarget) {
    /* Members */
    this.initialState = initialState;
    this.functionEval = functionEval;
    this.root = new Node(initialState, true);
    this.bestPlay = null;
    this.insertLevels(this.root, 0, levelTarget, this.root.isMax);
}

/* insertLevels :
 * Inserta niveles recursivamente hasta llegar al nivel objetivo
 * node  : (Node) Referencia al nodo actual
 * level : (Int) Nivel actual
 * levelTarget: (Int) Nivel Objetivo
 * isMax : (Boolean) true:  Maximizador; false : Minimizador
 */
MinMaxTree.prototype.insertLevels = function (node, level, levelTarget, isMax) {
    var isFull = true;
    for (var i = 0; i < node.data.length; i++) {
        if (node.data[i].indexOf(null) !== -1) {
            isFull = false;
            break;
        }
    }
    if (level >= levelTarget || isFull) {
        return this.functionEval(node);
    }
    
    var best = isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
 
    for (var i = 0; i < node.data.length; i++) {
        for(var j = 0; j < node.data.length; j++) {
            if (node.data[i][j] == null) {
                var newNode = new Node(node.data.clone(), !isMax);
                /* Marks the possible play on the board */
                newNode.data[i][j] = isMax;
                /* Insert new node in the childs of node */
                //node.childs.push(newNode);
                /* Recursive Insert new Nodes to levelTarget */
                var score = this.insertLevels(newNode, level + 1, levelTarget, !isMax);
                /* Get the best */ 
                if (isMax && score >= best) {
                    if (score > best) {
                        best = score;
                        this.bestPlay = {x : i, y : j};
                    }
                    else if (best == score && Math.round(Math.random() * 1) ) {
                        best = score;
                        this.bestPlay = {x : i, y : j};
                    }
                    continue;
                }
                if (!isMax && score <= best) {
                    if (score < best) {
                        best = score;
                        this.bestPlay = {x : i, y : j};
                    }
                    else if (best == score && Math.round(Math.random() * 1) ) {
                        best = score;
                        this.bestPlay = {x : i, y : j};
                    }
                    continue;
                }
            } 
        }
    }
    return best;
}

//exports.MinMaxTree = MinMaxTree;
