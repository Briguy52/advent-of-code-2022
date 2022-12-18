const fs = require('fs');

// output is just unique spots the tail visited
// can store that in a set/map to prevent duplicates
// for each direction, we can process each 1 unit step individually
// need to detect horizontal/vertical vs. diagonal

// isDiagonal --> if we go from up/down to left/right or vice versa
// need to keep track of previous command in order to compare

// also need to detect if T needs to move (H moves > 1 unit away)

// Map from 1-9 --> {x, y}
let KnotCoords = new Map();

const numberOfKnots = 10;

for (let i = 0; i < numberOfKnots; i++) {
    KnotCoords.set(i, {
        x: 0,
        y: 0
    })
}

let head = KnotCoords.get(0);

// let head = {
//     x: 0,
//     y: 0,
// }

// Q: does T always go to a spot that H already visited?

// let's observe some patterns/rules
// (1) H at (0,0), T at (0,0)
//     H at (1,0), T at (0,0)
//     H at (2,0), T at (1,0) -> T snaps to last H pos b/c 2-0 > 1
// (2) same thing for columns
// (3) H at (4,1), T at (3,0) -> OK
//     H at (4,2), T at (4,1) -> T snaps to last H pos
// (4) H at (4,4), T at (4,3) -> OK
//     H at (3,4), T at (4,3) -> still OK
//     H at (2,4), T at (3,4) -> T snaps to last H pos
// (5) H at (5,2), T at (4,3) -> OK, both 1 diff
//     H at (4,2), T at (4,3) -> OK, Y is 1 diff
//     H at (3,2), T at (4,3) -> OK, both 1 diff
//     H at (2,2), T at (3,2) -> T snaps to last H pos

// test cases:
// (2,2) & (4,3) yes
// (3,2) & (4,3) no
function shouldMoveKnot(a, b) {
    const xDiff = Math.abs(a.x - b.x);
    const yDiff = Math.abs(a.y - b.y);

    return (xDiff > 1 || yDiff > 1);
}

// a just moved to where it is
// returns where b should move to
function moveKnot(a, b) {
    // (4,2) (3,0) --> (4,1) ceil
    // (4,1) (2,0) --> (3,1)
    // (2,4) (4,3) --> (3,4)
    // (2,0) (0,0) --> (1,0)
    // (3,4) (4,2) --> (3,3) floor 

    const diffX = (a.x + b.x) / 2;
    const diffY = (a.y + b.y) / 2;

    const newX = (a.x > b.x) ? Math.ceil(diffX) : Math.floor(diffX);
    const newY = (a.y > b.y) ? Math.ceil(diffY) : Math.floor(diffY);

    return { x: newX, y: newY};
}

const TailTrackerMap = new Map();

function getCoordinateHash(coord) {
    return `${coord.x},${coord.y}`;
}

let tailMovementCounter = 0;

// let's first just model the head's movements
function moveHeadOneSpace(direction) {
    // Shallow copy of where leading knot was before moving
    let prev = {...head};

    switch (direction) {
        case 'R':
            head.x++;
            break;
        case 'D':
            head.y--;
            break;
        case 'U':
            head.y++;
            break;
        case 'L':
            head.x--;
            break;
        default:
            console.log(`invalid direction ${direction}`);
            break;
    }

    for (let i = 0; i < numberOfKnots - 1; i++) {
        const a = KnotCoords.get(i);
        const b = KnotCoords.get(i+1);

        if (shouldMoveKnot(a, b)) {
            const newPrev = {...b};
            
            // b moves to where a was before
            const newCoord = moveKnot(a, b);
            KnotCoords.set(i+1, {...newCoord})

            // if tail moved, update our tracker
            if (i + 1 === 9) {
                const hash = getCoordinateHash({...newCoord});
                TailTrackerMap.set(hash, true);
            }

            // in case we move the next knot
            prev = newPrev;
        }
    }

    console.log(KnotCoords);
}

let totalSteps = 0;

function readCommand(line) {
    const [direction, stepsStr] = line.split(' ');
    const steps = parseInt(stepsStr);

    totalSteps += steps;

    for (let i = 0; i < steps; i++) {
        moveHeadOneSpace(direction);
    }

}

fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');

    // Need to mark starting location as visited
    TailTrackerMap.set(getCoordinateHash(KnotCoords.get(9)), true);

    for (let line of lines) {
        readCommand(line);
    }

    TailTrackerMap;

    KnotCoords;

    head;

    const output = TailTrackerMap.size;
    output;
})