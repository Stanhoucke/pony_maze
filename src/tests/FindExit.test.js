import
{
    addNorthMove,
    addWestMove,
    addSouthMove,
    addEastMove,
    addValidMoves,
    generateEmptyMaze,
    numberPath
} 
from '../models/FindExit';

describe('Find Exit Functions', function () {
    // Set up
    let maze;
    let width = 3;
    let visitedCells;
    let validMoves;

    beforeEach( function () {
        maze = [
            ["west", "north"], ["north"], ["west", "north", "east"],
            ["west"], [], ["east"],
            ["west", "south"],["south"],["north", "south", "east"]
        ]
        visitedCells = [
            [], [], [],
            [], [1], [],
            [],[],[]
        ]
        validMoves = []
    })
    
    // Tests
    // North
    test('can move north', () => {
        addNorthMove(maze, visitedCells, 4, width, validMoves);
        expect(validMoves[0]).toBe(1);
    })
    test('wall blocks move north', () => {
        addNorthMove(maze, visitedCells, 1, width, validMoves);
        expect(validMoves.length).toBe(0);
    })
    test('visited cell blocks move north', () => {
        addNorthMove(maze, visitedCells, 7, width, validMoves);
        expect(validMoves.length).toBe(0);
    })
    // West
    test('can move west', () => {
        addWestMove(maze, visitedCells, 4, validMoves);
        expect(validMoves[0]).toBe(3);
    })
    test('wall blocks move west', () => {
        addWestMove(maze, visitedCells, 0, validMoves);
        expect(validMoves.length).toBe(0);
    })
    test('visited cell blocks move west', () => {
        addWestMove(maze, visitedCells, 5, validMoves);
        expect(validMoves.length).toBe(0);
    })
    // South
    test('can move south', () => {
        addSouthMove(maze, visitedCells, 4, width, validMoves);
        expect(validMoves[0]).toBe(7);
    })
    test('wall blocks move south', () => {
        addSouthMove(maze, visitedCells, 8, width, validMoves);
        expect(validMoves.length).toBe(0);
    })
    test('visited cell blocks move south', () => {
        addSouthMove(maze, visitedCells, 1, width, validMoves);
        expect(validMoves.length).toBe(0);
    })
    test('adjacent cell wall blocks move south', () => {
        addSouthMove(maze, visitedCells, 5, width, validMoves);
        expect(validMoves.length).toBe(0);
    })
    // East
    test('can move east', () => {
        addEastMove(maze, visitedCells, 4, validMoves);
        expect(validMoves[0]).toBe(5);
    })
    test('wall blocks move east', () => {
        addEastMove(maze, visitedCells, 8, validMoves);
        expect(validMoves.length).toBe(0);
    })
    test('visited cell blocks move east', () => {
        addEastMove(maze, visitedCells, 3, validMoves);
        expect(validMoves.length).toBe(0);
    })
    test('adjacent cell wall blocks move east', () => {
        addEastMove(maze, visitedCells, 2, validMoves);
        expect(validMoves.length).toBe(0);
    })
    // All possible moves
    test('can move in 4 directions', () => {
        const nextMoves = addValidMoves(maze, visitedCells, 4, width, validMoves);
        expect(nextMoves[0]).toBe(1);
        expect(nextMoves[1]).toBe(3);
        expect(nextMoves[2]).toBe(7);
        expect(nextMoves[3]).toBe(5);
    })
    test('can move in 2 directions', () => {
        const nextMoves = addValidMoves(maze, visitedCells, 3, width, validMoves);
        expect(nextMoves[0]).toBe(0);
        expect(nextMoves[1]).toBe(6);
    })

    // Generate Maze
    test('can generate empty maze', () => {
        const emptyMaze = generateEmptyMaze(3, 3);
        expect(emptyMaze.length).toBe(9);
    })
    
    // Number path
    test('can number path of a 3x3 maze with no internal walls', () => {
        const visitedCells = generateEmptyMaze(3, 3);

        maze = [
            ["west", "north"], ["north"], ["north", "east"],
            ["west"], [], ["east"],
            ["west", "south"],["south"],["south", "east"]
        ]
        let endPointPosition = 8;
        let ponyPosition = 0;
        const validMoves = [endPointPosition];

        numberPath(endPointPosition, ponyPosition, maze, 3, 3, visitedCells, 0, validMoves);
        expect(visitedCells[0][0]).toBe(4)
        expect(visitedCells[8][0]).toBe(0)
    })
    test('can number path of a 3x3 maze with no internal walls from centre', () => {
        const visitedCells = generateEmptyMaze(3, 3);

        maze = [
            ["west", "north"], ["north"], ["north", "east"],
            ["west"], [], ["east"],
            ["west", "south"],["south"],["south", "east"]
        ]
        let endPointPosition = 4;
        let ponyPosition = 2;
        const validMoves = [endPointPosition];

        numberPath(endPointPosition, ponyPosition, maze, 3, 3, visitedCells, 0, validMoves);
        expect(visitedCells[2][0]).toBe(2)
        expect(visitedCells[4][0]).toBe(0)
    })
    test('can number path of a 3x3 maze with walls', () => {
        const visitedCells = generateEmptyMaze(3, 3);

        maze = [
            ["west", "north"], ["north"], ["north", "east"],
            ["west"], [], ["east"],
            ["west", "south"],["north", "south"],["west", "south", "east"]
        ]
        let endPointPosition = 3;
        let ponyPosition = 7;
        const validMoves = [endPointPosition];

        numberPath(endPointPosition, ponyPosition, maze, 3, 3, visitedCells, 0, validMoves);
        expect(visitedCells[7][0]).toBe(2)
        expect(visitedCells[3][0]).toBe(0)
    })
    test('can number path of a 3x3 maze forcing long route', () => {
        const visitedCells = generateEmptyMaze(3, 3);

        maze = [
            ["west", "north"], ["west", "north"], ["north", "east"],
            ["west"], ["west"], ["west", "east"],
            ["west", "south"],["south"],["west", "south", "east"]
        ]
        let endPointPosition = 0;
        let ponyPosition = 8;
        const validMoves = [endPointPosition];

        numberPath(endPointPosition, ponyPosition, maze, 3, 3, visitedCells, 0, validMoves);
        expect(visitedCells[8][0]).toBe(8)
        expect(visitedCells[0][0]).toBe(0)
    })
    
    
})
