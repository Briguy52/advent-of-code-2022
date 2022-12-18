const fs = require('fs');

// Keep a map of visible, not visible, TODO
// Check if every tree visible from:
// 1. Left
// 2. Top
// 3. Right
// 4. Bottom
// If already visible

let TreeHeightsArr;

function getTreeHeight(row, col) {
    const c = TreeHeightsArr[row].charAt(col);
    return parseInt(c);
}

function getTreeHash(row, col) {
    return `${row}_${col}`;
}

function unhash(hash) {
    return hash.split('_').map(e => parseInt(e));
}

const VisibleTreeMap = new Map();

function checkTreeVisible(row, col) {
    const hash = getTreeHash(row, col);
    return VisibleTreeMap.has(hash);
}

function setTreeVisible(row, col) {
    const hash = getTreeHash(row, col);
    VisibleTreeMap.set(hash, true);
}

const TreeScoreMap = new Map();

function updateTreeScore(row, col, score) {
    const hash = getTreeHash(row, col);
    
    if (!TreeScoreMap.has(hash)) {
        TreeScoreMap.set(hash, score);
        return;
    }

    const currScore = TreeScoreMap.get(hash);
    TreeScoreMap.set(hash, currScore * score)
}


// Note: *Could* check from left and right at same time
// But harder to understand
function checkLeft(row, numCols) {
    
    // ok so this is kinda like "2 sum" but more complex lol
    // in 2 sum, you store the complement so that when you come upon it later
    // you can mark a success

    // here, the complement is not an exact value
    // it's just the closest >= tree (that blocks your view
    
    // col, height
    let incompleteTrees = new Map();

    // iterate right -> left, facing left  
    for (let col = numCols - 2; col > 0; col--) {
        const currHeight = getTreeHeight(row, col);

        col;
        currHeight;

        // let's check if we can complete any trees we've seen so far
        incompleteTrees.forEach((height, incompleteCol) => {
            const blocks = currHeight >= height;
            if (blocks) {
                const score = Math.abs(incompleteCol - col)
                row;
                incompleteCol;
                score;
                updateTreeScore(row, incompleteCol, score);
                incompleteTrees.delete(incompleteCol);
            }
        })

        incompleteTrees.set(col, currHeight);
    }

    // any remaining incomplete trees can see to the edge
    incompleteTrees.forEach((height, incompleteCol) => {
        const score = incompleteCol;
        row;
        incompleteCol;
        score;
        updateTreeScore(row, incompleteCol, score);
        incompleteTrees.delete(incompleteCol);
    }) 

}

function checkRight(row, numCols) {
    let incompleteTrees = new Map();

    // 0 1 2 3 4
    for (let col =  1; col < numCols -1; col++) {
        const currHeight = getTreeHeight(row, col);

        incompleteTrees.forEach((height, incompleteCol) => {
            const blocks = currHeight >= height;
            if (blocks) {
                const score = Math.abs(incompleteCol - col);
                row;
                incompleteCol;
                score;
                updateTreeScore(row, incompleteCol, score);
                incompleteTrees.delete(incompleteCol);
            }
        })

        incompleteTrees.set(col, currHeight);
    }

        // 0 1 2 3 4  
        // any remaining incomplete trees can see to the edge
        incompleteTrees.forEach((height, incompleteCol) => {
            const score = numCols - incompleteCol - 1;
            row;
            incompleteCol;
            score;
            updateTreeScore(row, incompleteCol, score);
            incompleteTrees.delete(incompleteCol);
        }) 
}


function checkTop(col, numRows) {
    let incompleteTrees = new Map();

    for (let row = numRows - 2; row > 0; row--) {
        const currHeight = getTreeHeight(row, col);

        incompleteTrees.forEach((height, incompleteRow) => {
            const blocks = currHeight >= height;
            if (blocks) {
                const score = Math.abs(row - incompleteRow);
                updateTreeScore(incompleteRow, col, score);
                incompleteTrees.delete(incompleteRow);
            }
        })

        incompleteTrees.set(row, currHeight);
    }

    // 0 1 2 3 4  
    // any remaining incomplete trees can see to the edge
    incompleteTrees.forEach((height, incompleteRow) => {
        const score = incompleteRow;
        updateTreeScore(incompleteRow, col, score);
        incompleteTrees.delete(incompleteRow);
    }) 
}

function checkBottom(col, numRows) {
    let incompleteTrees = new Map();

    for (let row = 1; row < numRows - 1; row++) {
        const currHeight = getTreeHeight(row, col);

        incompleteTrees.forEach((height, incompleteRow) => {
            const blocks = currHeight >= height;
            if (blocks) {
                const score = Math.abs(row - incompleteRow);
                updateTreeScore(incompleteRow, col, score);
                incompleteTrees.delete(incompleteRow);
            }
        })

        incompleteTrees.set(row, currHeight);
    }

    // 0 1 2 3 4  
    // any remaining incomplete trees can see to the edge
    incompleteTrees.forEach((height, incompleteRow) => {
        const score = numRows - incompleteRow - 1;
        updateTreeScore(incompleteRow, col, score);
        incompleteTrees.delete(incompleteRow);
    }) 
}


fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');
    TreeHeightsArr= [...lines];

    const numRows = TreeHeightsArr.length;
    const numCols = TreeHeightsArr[0].length;

    for (let row = 1; row < numRows - 1; row++) {
        checkLeft(row, numCols);
        checkRight(row, numCols);
    }

    TreeScoreMap;

    for (let col = 1; col < numCols -1; col++) {
        checkTop(col, numRows);
        checkBottom(col, numRows);
    }

    TreeScoreMap;

    let max = 0;
    let maxHash;
    TreeScoreMap.forEach((score, hash) => {
        if (score > max) {
            max = score;
            maxHash = hash;
        }
    })

    numCols;
    numRows;
    const expectedSize = (numCols - 2) * (numRows - 2);
    expectedSize;
    console.log(TreeScoreMap.size)

    max;
    maxHash;
})