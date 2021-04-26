import {addNorthMove, addWestMove, addValidMoves} from '../models/FindExit';

describe('Find Exit Functions', function () {
    // Set up
    let maze;
    let width = 3;
    let visitedCells;
    let validMoves;

    beforeEach( function () {
        maze = [
            ["west", "north"], ["north"], ["north"],
            ["west"], [], [],
            ["west"],[],[]
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
    
})
