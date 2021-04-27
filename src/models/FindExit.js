// Base case
// Win
    // Pony position is on end point position
    // return true
// No moves available
    // Pony has walls and visited spaces on all 4 sides
    // returns false
    // Check left:
        // x has wall west
        // x - 1 has visited space
    // Check up: 
        // x has wall north
        // x - width has visited space
    // Check right:
        // x has wall east
        // x + 1 has wall west
        // x + 1 has visited space
    // Check down:
        // x has wall south
        // x + width has wall north
        // x + width has visited space

// Recursive case
// Start at exit, mark as 0
// Add valid moves to queue
// Repeat marking space as x + 1

const checkNorthMove = (maze, mazeWidth, position) => {
    if (!maze[position].includes("north") && position - mazeWidth >= 0) {
        return true;
    } else {
        return false;
    }
}
const checkWestMove = (maze, position) => {
    if (!maze[position].includes("west") && position - 1 >= 0) {
        return true;
    } else {
        return false;
    }
}
const checkSouthMove = (maze, mazeWidth, mazeHeight, position) => {
    if (!maze[position].includes("south") && !maze[position + mazeWidth].includes("north") && position + mazeWidth <= mazeWidth * mazeHeight) {
        return true;
    } else {
        return false;
    }
}
const checkEastMove = (maze, mazeWidth, mazeHeight, position) => {
    if (!maze[position].includes("east") && !maze[position + 1].includes("west") && position + 1 <= mazeWidth * mazeHeight) {
        return true;
    } else {
        return false;
    }
}

const addNorthMove = (maze, visitedCells, position, mazeWidth, validMoves) => {
    if (checkNorthMove(maze, mazeWidth, position) && visitedCells[position - mazeWidth].length === 0) {
        validMoves.push(position - mazeWidth);
    } 
}
const addWestMove = (maze, visitedCells, position, validMoves) => { 
    if (checkWestMove(maze, position) && visitedCells[position - 1].length === 0) {
        validMoves.push(position - 1);
    } 
}
const addSouthMove = (maze, visitedCells, position, mazeWidth, mazeHeight, validMoves) => {
    if (checkSouthMove(maze, mazeWidth, mazeHeight, position) && visitedCells[position + mazeWidth].length === 0) {
        validMoves.push(position + mazeWidth);
    } 
}
const addEastMove = (maze, visitedCells, position, mazeWidth, mazeHeight, validMoves) => { 
    if (checkEastMove(maze, mazeWidth, mazeHeight, position) && visitedCells[position + 1].length === 0) {
        validMoves.push(position + 1);
    } 
}

const addValidMoves = (maze, visitedCells, position, mazeWidth, mazeHeight, validMoves) => {
    validMoves = [];
    addNorthMove(maze, visitedCells, position, mazeWidth, validMoves) 
    addWestMove(maze, visitedCells, position, validMoves)
    addSouthMove(maze, visitedCells, position, mazeWidth, mazeHeight, validMoves) 
    addEastMove(maze, visitedCells, position, mazeWidth, mazeHeight, validMoves)
    return validMoves;
}

const generateEmptyMaze = (mazeWidth, mazeHeight) => {
    const emptyMaze = new Array(mazeWidth * mazeHeight).fill(null).map(() => []);
    return emptyMaze;
}

const numberPath = (startPosition, ponyPosition, maze, mazeWidth, mazeHeight, visitedCells, visitCounter, validMoves) => {    
    // Base case
    if (startPosition === ponyPosition) {
        if (visitedCells[startPosition].length > 0 && visitCounter < visitedCells[startPosition]) {
            visitedCells[startPosition] = [visitCounter]
        } else {
            visitedCells[startPosition].push(visitCounter)
        }
        return;
    }

    // mark current position as visited
    if (visitedCells[startPosition].length === 0) {
        visitedCells[startPosition].push(visitCounter)
        visitCounter++;
    }

    // Add valid moves
    validMoves = addValidMoves(maze, visitedCells, startPosition, mazeWidth, mazeHeight, validMoves);
    
    // Recurse
    while (validMoves.length > 0) {
        let position = validMoves.shift()
        numberPath(position, ponyPosition, maze, mazeWidth, mazeHeight, visitedCells, visitCounter, validMoves);
    }
}

const shortestPath = (ponyPosition, visitedCells, mazeWidth, mazeHeight, maze) => {
    const pathIndeces = [ponyPosition];
    let moveNumber = visitedCells[ponyPosition][0];
    let position = ponyPosition;

    while (moveNumber !== 0) {
        // Check all directions for next move (moveNumber - 1)
        if (checkNorthMove(maze, mazeWidth, position) && visitedCells[position - mazeWidth][0] === moveNumber - 1) {
            position -= mazeWidth;
        } else if (checkWestMove(maze, position) && visitedCells[position - 1][0] === moveNumber - 1) {
            position -= 1;
        } else if (checkSouthMove(maze, mazeWidth, mazeHeight, position) && visitedCells[position + mazeWidth][0] === moveNumber - 1) {
            position += mazeWidth;
        } else if (checkEastMove(maze, mazeWidth, mazeHeight, position) && visitedCells[position + 1][0] === moveNumber - 1) {
            position += 1;
        }
        pathIndeces.push(position);
        moveNumber--;
    }
    return pathIndeces;
}

const getEndPath = (endPointPosition, ponyPosition, maze, mazeWidth, mazeHeight) => {

    const visitedCells = generateEmptyMaze(mazeWidth, mazeHeight);
    const validMoves = [endPointPosition];
    let visitCounter = 0;
    numberPath(endPointPosition, ponyPosition, maze, mazeWidth, mazeHeight, visitedCells, visitCounter, validMoves);

    const endPath = shortestPath(ponyPosition, visitedCells, mazeWidth, mazeHeight, maze);
    return endPath;
}

export {
    addNorthMove,
    addWestMove,
    addSouthMove,
    addEastMove,
    addValidMoves,
    generateEmptyMaze,
    numberPath,
    shortestPath,
    getEndPath
}