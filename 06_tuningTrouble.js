const fs = require('fs');

const lengthOfWindow = 14;

function isMarker(arr) {
    const tempSet = new Set(arr);

    return tempSet.size === lengthOfWindow;
}

// Returns index (int) for end of 1st marker
function findEndOfFirstMarker(line) {
    // Error handling, edge cases
    // if line.length < 4, no possible marker, etc.
    // trim empty spaces, invalid chars, etc.

    let myArr = line.split('').slice(0, lengthOfWindow - 1);

    line;

    for (let i = lengthOfWindow - 1; i < line.length; i++) {
        const c = line[i];

        // Add this char
        myArr.push(c);

        if (isMarker(myArr)) {
            return i;
        }

        // Bump out first char
        myArr.shift();
    }


    return 0;
}

fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');
    const linesArr = [...lines];

    lines.forEach(line => {
        const index = findEndOfFirstMarker(line);
        console.log(index + 1); 
    })

})