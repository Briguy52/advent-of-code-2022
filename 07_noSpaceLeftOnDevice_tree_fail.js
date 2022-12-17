const fs = require('fs');


// no maps!! just nodes within nodes :)

class File {
    constructor(name, size, parent) {
        this.name = name;
        this.size = size;
        this.parent = parent;
    }
}

class Directory {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.childDirectories = new Map();
        this.childFiles = new Map();
        this.childFileSum = 0;
        this.totalSize = -1;
    }

    hasChildDirectory(childName) {
        return this.childDirectories.has(childName);
    }

    addChildDirectory(name) {
        if (this.hasChildDirectory(name)) {
            return;
        }

        const childDirectory = new Directory(name, this);
        this.childDirectories.set(name, childDirectory);
    }

    getChildDirectory(name) {
        return this.childDirectories.get(name);
    }

    addChildFile(name, size) {
        if (!this.hasChildFile(name)) {
            const childFile = new File(name, size, this);
            this.childFiles.set(name, childFile);
            this.childFileSum += size;
        }
    }

    hasChildFile(name) {
        return this.childFiles.has(name);
    }

    toString() {
        return `Directory ${this.name}}`;
    }

    getSizeOfChildDirectories() {
        let sum = 0;

        this.childDirectories.forEach((directory, name) => {

        })
    }

    getSize() {
        // add together size of all child files + all child directories
        return -1;
    }
} 

// oh another idea is we keep track of current path
// whenever we add a file, we just add it to a map of path --> size
// obv if part 2 involves trimming nodes we can't do that
// but we can try it???

let rootDirectory = new Directory('/', null);

let currDirectory = rootDirectory;

function readCommand(line) {
    line;
    const args = line.split(' ');

    if (args[1] === 'ls') {
        return;
    }

    const cdOption = args[2];

    switch (cdOption) {
        case '/':
            currDirectory = rootDirectory;
            break;
        case '..':
            currDirectory = currDirectory.parent || rootDirectory;
            break;
        default:
            currDirectory.addChildDirectory(cdOption);
            currDirectory = currDirectory.getChildDirectory(cdOption);
            break;
    }

    return;
}

// Attempts to create a new directory
function readDirectory(line) {
    line;
    const directoryName = line.split(' ')[1];

    currDirectory.addChildDirectory(directoryName);
}

function readFile(line) {
    line;

    const [ size, name ] = line.split(' ');

    currDirectory.addChildFile(name, size);
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

    const threshold = 100000;
    let totalSumDirsBelowThreshold = 0;

    rootDirectory;

})