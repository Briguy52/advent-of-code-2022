const fs = require('fs');


const isCalorieCount = str => {
    return str.length > 0
}

const compareNumbers = (a, b) => {
    return b - a
}

const findMaxElf = lines => {
    let currMax = 0
    let currSum = 0

    lines.forEach(line => {
        if (isCalorieCount(line)) {
            currSum += parseInt(line)
        } else {
            if (currSum > currMax) {
                currMax = currSum
            }
            currSum = 0
        }

    })

    if (currSum > currMax) {
        currMax = currSum
    }

    return currMax
}

const findTopThree = (lines) => {
    // Keep track of current top 3
    // If currSum > #3, replace #3
    // If currSum > #2, replace #2 and #2 replaces #3
    // If currSum > #1, replace #1, #1 + #2 bump #3 out

    // If it's just 3 items max, can we just sort?

    // TODO: keep track of top 3
    let topThree = []

    let currSum = 0;

    // data.slice(0, 20).forEach(line => console.log(line))

    lines.forEach(line => {
        // Check for number vs. empty
        if (isCalorieCount(line)) {
            currSum += parseInt(line);
        } else {
            // Finished with 1 elf, check sum
            topThree.push(currSum)
            currSum = 0
            // Sort by num, not alphabetical unicode!
            if (topThree.length > 3) {
                topThree = topThree.sort(compareNumbers).slice(0, 3)
            }
        }
    })

    // Could also be done at end but no space
    topThree.push(currSum)
    currSum = 0
    // Sort by num, not alphabetical unicode!
    if (topThree.length > 3) {
        topThree = topThree.sort(compareNumbers).slice(0, 3)
    }

    return topThree;
}




fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');

    // const maxElf = findMaxElf(lines)
    // console.log(maxElf)


    topThree = findTopThree(lines);

    console.log(topThree)
    console.log(topThree.reduce((acc, curr) => acc + curr, 0));
    
})