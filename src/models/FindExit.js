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
const addValidMoves = (maze, visitedCells, position, mazeWidth, validMoves) => {
    addNorthMove(maze, visitedCells, position, mazeWidth, validMoves) 
    addWestMove(maze, visitedCells, position, mazeWidth, validMoves)  
}


export {
    addNorthMove,
    addWestMove,
    addValidMoves
}