const fs = require('fs');

function getContainsMap(compartment) {
    const output = Map();
    for (item in compartment) {
        output.set(item, true)
    }
    return output;
}

function findDuplicate(duplicateMap, compartment) {
    for (item in compartment) {
        if (duplicateMap.has(item)) {
            return item;
        }
    }
}

function calculateItemPriority(item) {
    return item.charCodeAt(0) - 96;
}

function calculateLinePriority(line) {
    // split line in half

    // 123456 (len 6)
    // 6/2 = 3
    const halfway = line.length / 2;
    const compartment0 = line.substring(0, halfway);
    const compartment1 = line.substring(halfway);

    const firstHalfMap = getContainsMap(compartment0);

    // find duplicate element
    const foundItem = findDuplicate(firstHalfMap, compartment1);

    // get priority of duplicate
    return calculateItemPriority(foundItem);
}

fs.readFile('easyData.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');

    const totalPriority = 0;

    lines.forEach(line => {
        line;
        totalPriority += calculateLinePriority(line);
    })

    console.log(totalPriority);
})