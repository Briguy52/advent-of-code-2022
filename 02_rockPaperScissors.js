const fs = require('fs');

function getShapeScore(shape) {
    switch (shape) {
        case 'X':
            return 1;
        case 'A':
            return 1;
        case 'Y':
            return 2;
        case 'B':
            return 2;
        case 'Z':
            return 3;
        case 'C':
            return 3;
        default:
            return 0;
    }
}

function convertToNumber(symbol) {
    if (!symbol) {
        return 0;
    }

    const unicodeNum = symbol.charCodeAt(0);
    if (unicodeNum > 70) {
        return unicodeNum - 23;
    }
    return unicodeNum;
}

function getOutcomeScore(oppSymbol, mySymbol) {
    const opponentNum = convertToNumber(oppSymbol);
    const myNum = convertToNumber(mySymbol);

    opponentNum;
    myNum

    const diff = myNum - opponentNum;

    // rock (65) paper (66) scissors (67)
    // 2 --> i lose
    // 1 --> i win 
    // 0 --> draw
    // -1 --> i lose
    // -2 --> i win  

    switch (diff) {
        case 1:
            return 6;
        case 0:
            return 3;
        case -2:
            return 6;
        default:
            return 0;
    }
}

function getLosingSymbol(oppSymbol) {
    switch (oppSymbol) {
        case 'A':
            return 'C'
        case 'B':
            return 'A'
        default:
            return 'B'
    }
}

function getWinningSymbol(oppSymbol) {
    switch (oppSymbol) {
        case 'A':
            return 'B'
        case 'B':
            return 'C'
        default:
            return 'A'
    }
}

function decideMySymbol(oppSymbol, desiredOutcome) {
    // force a tie
    if (desiredOutcome === 'Y') {
        return oppSymbol;
    } else if (desiredOutcome === 'X') {
        // need to lose
        return getLosingSymbol(oppSymbol);
    } else {
        return getWinningSymbol(oppSymbol);
    }
}

// Takes in opponent's symbol (A, B, C) and my symbol (X, Y, Z) 
// Returns the score (integer)
function scoreRow(line) {
    const symbols = line.split(' ');
    const oppSymbol = symbols[0];
    // const mySymbol = symbols[1];
    const desiredOutcome = symbols[1];
    const mySymbol = decideMySymbol(oppSymbol, desiredOutcome);

    const shapeScore = getShapeScore(mySymbol);
    const outcomeScore = getOutcomeScore(oppSymbol, mySymbol);
    return shapeScore + outcomeScore;
}

fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');

    let totalScore = 0;

    lines.forEach(line => {
        const rowScore = scoreRow(line);
        totalScore += rowScore;
    })

    console.log(totalScore);
})