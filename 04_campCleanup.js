const fs = require('fs');


function hasFullOverlap(elf0, elf1) {
    elf0;
    elf1;

    const [start0, end0] = elf0;
    const [start1, end1] = elf1;

    // ...45...
    // ..345...

    if (start0 >= start1 && end0 <= end1) {
        return true;
    }

    // also check reverse

    if (start1 >= start0 && end1 <= end0) {
        return true;
    }
    
    return false;
}

function hasSomeOverlap(elf0, elf1) {
    const [start0, end0] = elf0;
    const [start1, end1] = elf1;

    // .......678..
    // ......56...

    // check if start or end are contained in other interval
    if (start0 >= start1 && start0 <= end1) {
        return true;
    } 

    // .....5677....
    // ........7899
    if (end0 >= start1 && end0 <= end1) {
        return true;
    }

    return false;
}

function isDuplicateAssignment(line) {
    const assignments = line.split(',');
    assignments;

    const elf0 = assignments[0].split('-').map(elem => parseInt(elem));
    const elf1 = assignments[1].split('-').map(elem => parseInt(elem));

    // return hasFullOverlap(elf0, elf1);
    return hasSomeOverlap(elf0, elf1) || hasSomeOverlap(elf1, elf0);
}

fs.readFile('easyData.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');

    let count = 0;

    console.log(Object.keys(lines).length)
    
    lines.forEach(line => {
        if (isDuplicateAssignment(line)) {
            count += 1;
        }
    })

    console.log(count);
})