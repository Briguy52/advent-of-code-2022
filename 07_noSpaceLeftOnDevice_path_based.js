const fs = require('fs');

// oh another idea is we keep track of current path
// whenever we add a file, we just add it to a map of path --> size
// obv if part 2 involves trimming nodes we can't do that
// but we can try it???

const atRoot = ['root'];

let path = atRoot;

function getPathHash(pathArr) {
    return pathArr.join('/');
}

let hashedPaths = [getPathHash(atRoot)];

function readCommand(line) {
    line;
    const args = line.split(' ');

    if (args[1] === 'ls') {
        return;
    }

    const cdOption = args[2];

    switch (cdOption) {
        case '/':
            path = atRoot;
            hashedPaths = [getPathHash(atRoot)];
            break;
        case '..':
            path.pop();
            hashedPaths.pop(); 
            break;
        default:
            path.push(cdOption);
            path;
            hashedPaths.push(getPathHash(path));
            break;
    }

    path;

    return;
}

// Attempts to create a new directory
function readDirectory(line) {
    line;
    const directoryName = line.split(' ')[1];

    // don't need to do anything right?
}

// Need to hash unique keys in case of duplicate Directory names
// in different branches
const DirectorySizeMap = new Map();

function readFile(line) {
    line;

    const [ size, name ] = line.split(' ');

    // TODO: handle ls-ing the same file twice, currently assume we don't

    // TODO: need to add size to every file along the path...  

    path;
    hashedPaths;

    hashedPaths.forEach(hash => {
        if (!DirectorySizeMap.has(hash)) {
            DirectorySizeMap.set(hash, 0);
        }

        const curr = DirectorySizeMap.get(hash);
        const toAdd = parseInt(size);

        DirectorySizeMap.set(hash, curr + toAdd);
    })
}

fs.readFile('data.txt', function(err, data) {
    if (err) throw err;

    const lines = data.toString().split('\n');
    const linesArr = [...lines];

    // Iterate through once to read inputs + construct tree
    linesArr.forEach(line => {
        const c = line[0];
        switch (c) {
            case '$':
                readCommand(line);
                break;
            case 'd':
                readDirectory(line);
                break;
            default:
                readFile(line);
                break;
        }
    })

    // const threshold = 100000;
    // let output = 0;

    // DirectorySizeMap;

    // DirectorySizeMap.forEach((size, path) => {
    //     if (size < threshold) {
    //         output += size;
    //     }
    // })

    const diskSpace = 70000000;
    const newGameSize = 30000000;

    const currSpaceUsed = DirectorySizeMap.get('root');
    
    const currFreeSpace = diskSpace - currSpaceUsed;
    const spaceToFreeUp = newGameSize - currFreeSpace;

    let currDirectoryToDeleteSize = 99999999999;

    DirectorySizeMap.forEach((size, path) => {
        if (size >= spaceToFreeUp && size < currDirectoryToDeleteSize) {
            currDirectoryToDeleteSize = size;
        }
    });

    currDirectoryToDeleteSize;

})