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

const addNorthMove = (maze, visitedCells, position, mazeWidth, validMoves) => {
    if (!maze[position].includes("north") && visitedCells[position - mazeWidth].length === 0) {
        validMoves.push(position - mazeWidth);
    } 
}
const addWestMove = (maze, visitedCells, position, validMoves) => { 
    if (!maze[position].includes("west") && visitedCells[position - 1].length === 0) {
        validMoves.push(position - 1);
    } 
}
const addSouthMove = (maze, visitedCells, position, mazeWidth, validMoves) => {
    if (!maze[position].includes("south") && !maze[position + mazeWidth].includes("north") && visitedCells[position + mazeWidth].length === 0) {
        validMoves.push(position + mazeWidth);
    } 
}
const addEastMove = (maze, visitedCells, position, validMoves) => { 
    if (!maze[position].includes("east") && !maze[position + 1].includes("north") && visitedCells[position + 1].length === 0) {
        validMoves.push(position + 1);
    } 
}

const addValidMoves = (maze, visitedCells, position, mazeWidth, validMoves) => {
    addNorthMove(maze, visitedCells, position, mazeWidth, validMoves) 
    addWestMove(maze, visitedCells, position, validMoves)
    addSouthMove(maze, visitedCells, position, mazeWidth, validMoves) 
    addEastMove(maze, visitedCells, position, validMoves)
}

const generateEmptyMaze = (mazeWidth, mazeHeight) => {
    const emptyMaze = new Array(mazeWidth * mazeHeight).fill(null).map(() => []);
    return emptyMaze;
}

const numberPath = (startPosition, ponyPosition, maze, mazeWidth, mazeHeight, visitedCells, visitCounter, validMoves) => {    
    // mark current position as visited
    visitedCells[startPosition].push(visitCounter)
    visitCounter++;

    // Base case
    if (startPosition === ponyPosition) {
        return;
    }

    // Add valid moves
    console.log(validMoves)
    addValidMoves(maze, visitedCells, startPosition, mazeWidth, validMoves);
    console.log(validMoves)

    // Recurse
    while (validMoves.length < 0) {
        let position = validMoves.shift()
        numberPath(position, ponyPosition, maze, mazeWidth, mazeHeight, visitedCells, visitCounter, validMoves);
    }
}


export {
    addNorthMove,
    addWestMove,
    addSouthMove,
    addEastMove,
    addValidMoves,
    generateEmptyMaze,
    numberPath
}