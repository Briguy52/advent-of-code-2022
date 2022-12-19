const fs = require('fs');

let cycle = 0;
let xRegister = 1;

function shouldRecordSignalStrength() {
    return cycle % 40 === 20;
}

// Array of strings, 0-39 on first, row, 40-79, etc.
let DrawingArr = new Array(6).fill('');

let SignalMap = new Map();

function countCycle() {

    tryToDraw();

    cycle++;


    // if (shouldRecordSignalStrength()) {
    //     cycleCounter;
    //     xRegister;

    //     const signalStrength = cycleCounter * xRegister;
    //     SignalMap.set(cycleCounter, signalStrength);
    // }
}

function canDrawAtCursor(cursor, x) {
    return ((Math.abs(x - cursor)) <= 1)
}

function tryToDraw() {
    // what row?
    // 0-39 = row 0
    const row = Math.floor(cycle / 40);
    const col = cycle % 40;

    // trying to draw at col
    if (canDrawAtCursor(col, xRegister)) {
        // draw a #
        DrawingArr[row] += '#';
    } else {
        DrawingArr[row] += '.';
    }
}

function readCommand(line) {
    const args = line.split(' ');

    if (args.length === 1) {
        // noop
        countCycle();
        return;
    }

    const value = parseInt(args[1]);

    value;

    countCycle();

    countCycle();

    xRegister += value;
}

fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');
    
    lines.forEach(line => {
        readCommand(line);
    });

    DrawingArr;

    // SignalMap;

    // let output = 0;

    // SignalMap.forEach((signalStrength, cycle) => {
    //     output += signalStrength;
    // })

    // output;
})