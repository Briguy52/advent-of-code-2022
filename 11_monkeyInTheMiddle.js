const fs = require('fs');

// let's start by just reading in our data
// so each monkey gets:
// 1. a list of items it has (and their worry levels)
// 2. "inspection" - a function to modify each item's worry level
// 3. then divide / 3 and then test, true/false throw to other monkey

function createInspectionFunc(equationString) {
    const args = equationString.split(' ');
    const operator = args[1];
    const operandStr = args[2];

    return function(x) {
        // all we care about is remainder from mod arithmetic
        x = x % lcm;

        // not good to use eval() anyways! big security risk
        // return eval(equationString);
        const operand = operandStr === 'old' ? x : BigInt(parseInt(operandStr));

        switch (operator) {
            case '+':
                return x + operand;
            case '-':
                return x - operand;
            case '*':
                return x * operand;
            case '/':
                return x / operand;
            default:
                return x;
        }

    }
}

let MonkeyMap = new Map();

let lcm = BigInt(1);

function findLcm(arr) {
    for (let i = 0; i < arr.length; i += 7) {
        const modDivisor = BigInt(parseInt(arr[i+3].split(' ').pop()));

        lcm *= modDivisor;
    }
}

function readMonkeys(arr) {
    for (let i = 0; i<arr.length; i+=7) {
        // Monkey ID
        const monkeyIdRaw = arr[i].split(' ').pop();
        const monkeyId = parseInt(monkeyIdRaw.substring(0, monkeyIdRaw.length -1));

        // Starting items
        const startingItemsCsv = arr[i+1].split(':').pop();
        const startingItemsStr = startingItemsCsv.split(', ');
        const startingItems = startingItemsStr.map(str => BigInt(parseInt(str)));

        // Monkey inspection :O
        const operationRaw = arr[i+2].split(':').pop();
        const equationStr = operationRaw.split('=').pop().trim();
        const inspectionFunc = createInspectionFunc(equationStr);

        // Test (don't forget we need to /3 at some point)
        const modDivisor = BigInt(parseInt(arr[i+3].split(' ').pop()));

        // Monkeys to toss to
        const trueMonkeyTarget = parseInt(arr[i+4].split(' ').pop());
        const falseMonkeyTarget = parseInt(arr[i+5].split(' ').pop());


        monkeyId;
        startingItems;
        modDivisor;
        trueMonkeyTarget;
        falseMonkeyTarget;

        let newMonkey = {
            id: monkeyId,
            items: [...startingItems],
            inspectionFunc,
            inspectionCount: 0,
            modDivisor,
            trueMonkeyTarget,
            falseMonkeyTarget,
        }

        MonkeyMap.set(monkeyId, newMonkey);
    }
}

// Goes through all monkeys once
function executeMonkeyRound() {
    const monkeyCount = MonkeyMap.size;

    // each monkey gets 1 turn per round
    for (let monkeyId = 0; monkeyId < monkeyCount; monkeyId++) {
        const monkey = MonkeyMap.get(monkeyId);

        // inspect each item individually
        while (monkey.items.length) {
            let item = monkey.items.shift();

            // perform inspection...
            let inspectedItem = monkey.inspectionFunc(item);
            monkey.inspectionCount++;

            // Divide by 3 due to relief... or not
            // const dividedItem = Math.floor(inspectedItem / 3);

            // Find target monkey
            const targetMonkeyId = inspectedItem % monkey.modDivisor === BigInt(0) ? monkey.trueMonkeyTarget : monkey.falseMonkeyTarget;
            const targetMonkey = MonkeyMap.get(targetMonkeyId);

            // Remove from own items + send to target monkey
            targetMonkey.items.push(inspectedItem);
        }
    }

}

fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');
    const linesArr = [...lines];

    // Init our monkeys
    findLcm(linesArr);
    readMonkeys(linesArr);

    // Perform x number of monkey rounds
    const rounds = 10000;
    for (let i = 0; i < rounds; i++) {
        executeMonkeyRound();
    }

    // Check inspection counts
    let inspectionCounts = [];

    for (let i = 0; i < MonkeyMap.size; i++) {
        inspectionCounts.push(MonkeyMap.get(i).inspectionCount)
    }

    let sortedInspectionCounts = [...inspectionCounts];

    sortedInspectionCounts.sort((a, b) => b - a);

    const output = sortedInspectionCounts[0] * sortedInspectionCounts[1];

    inspectionCounts;
    sortedInspectionCounts;

    output;

})