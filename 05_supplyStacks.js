const fs = require('fs');

function findIndexOfSpacer(linesArr) {
    for (let i = 0; i < linesArr.length; i++) {
        const line = linesArr[i];
        if (line.trim() === '') {
            return i;
        }
    }

    return -1;
}

function getStackNames(rowWithNames) {
    return rowWithNames.trim().split(/\s+/);
}

function createIndexToStackNameMap(rowWithNames) {
    const names = getStackNames(rowWithNames);
    names;

    const indexToStackNameMap = new Map();

    for (elem of names) {
        indexToStackNameMap.set(rowWithNames.indexOf(elem), elem);
    }

    return indexToStackNameMap;
}

function isCrate(possibleCrate) {
    return possibleCrate.toLowerCase() !== possibleCrate.toUpperCase();
}

function addRowToStacks(currRow, myStacks, indexToStackNameMap) {
    indexToStackNameMap.forEach((stackName, index) => {
        stackName;
        index;

        const possibleCrate = currRow[index];

        if (isCrate(possibleCrate)) {
            myStacks.get(stackName).push(possibleCrate);
        }
        
    });

    return;
}

function createStacks(linesArr, indexOfSpacer) {
    const indexOfStackNames = indexOfSpacer - 1;

    const rowWithNames = linesArr[indexOfStackNames];

    const indexToStackNameMap = createIndexToStackNameMap(rowWithNames);

    const stackNames = getStackNames(rowWithNames);

    // Init empty stacks
    const myStacks = new Map();
    for (elem of stackNames) {
        myStacks.set(elem, []);
    }

    const indexOfLowestRow = indexOfSpacer - 2;


    for (let i = indexOfLowestRow; i >= 0; i--) {
        const currRow = linesArr[i];
        addRowToStacks(currRow, myStacks, indexToStackNameMap);
    }

    myStacks;

    // Returns a Map of { stackName: [stack] }
    return myStacks;
}

function executeInstructions(linesArr, indexOfSpacer, stacks) {
    const indexOfInstructionStart = indexOfSpacer + 1;

    for (let i = indexOfInstructionStart; i < linesArr.length; i++) {
        const instruction = linesArr[i];

        const instructionParts = instruction.split(' ');

        let count = instructionParts[1];
        const popFromStack = instructionParts[3];
        const pushToStack = instructionParts[5];

        let cratesToMove = [];

        while (count > 0) {
            const crate = stacks.get(popFromStack).pop();
            cratesToMove.push(crate);
            count--;
        }

        while (cratesToMove.length > 0) {
            const crate = cratesToMove.pop();
            stacks.get(pushToStack).push(crate);
        }
    }

    // Returns modified Map of stacks (arrays)
    return stacks;
}

// what if we start at the middle (empty line)
// iterate upwards and add stuff to stacks
// then iterate downards to execute instructions?
fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');
    const linesArr = [...lines];

    const indexOfSpacer = findIndexOfSpacer(linesArr);

    let stacks = createStacks(linesArr, indexOfSpacer);

    const modifiedStacks = executeInstructions(linesArr, indexOfSpacer, stacks);

    let output = '';

    modifiedStacks.forEach((stack, _) => {
        output += stack.pop();
    })

    output;
})