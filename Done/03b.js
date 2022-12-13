const fs = require('fs');

function getContainsMap(compartment) {
    const output = new Map();
    [...compartment].forEach(item => output.set(item, true))
    return output;
}

function findDuplicate(duplicateMap, compartment) {
    duplicateMap;
    compartment;

    for (const item of compartment) {
        if (duplicateMap.has(item)) {
            return item;
        }
    }
}

function calculateItemPriority(item) {
    if (item <= 'z' && item >= 'a') {
        return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }

    return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27;   
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

function findOverlap(elf0, elf1) {
    const elf0map = getContainsMap(elf0);

    elf0map;

    let overlap = new Map();

    for (const item of elf1) {
        if (elf0map.has(item)) {
            overlap.set(item, true)
        }
    }

    return overlap;
}

function findBadge(elf0, elf1, elf2) {
    const overlap = findOverlap(elf0, elf1);

    const badge = findDuplicate(overlap, elf2);

    badge;

    return badge;
}

fs.readFile('03data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');

    let totalPriority = 0;

    let elves = [];

    lines.forEach(line => {
        if (elves.length >= 3) {
            elves = [];
        }

        elves.push(line);

        if (elves.length === 3) {
            const badge = findBadge(...elves)
            badge;
            totalPriority += calculateItemPriority(badge.charAt(0))
        }
    })

    console.log(totalPriority);
})