import {addNorthMove, addWestMove, addSouthMove, addEastMove, addValidMoves} from '../models/FindExit';

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
        addValidMoves(maze, visitedCells, 4, width, validMoves);
        expect(validMoves[0]).toBe(1);
        expect(validMoves[1]).toBe(3);
        expect(validMoves[2]).toBe(7);
        expect(validMoves[3]).toBe(5);
    })
    test('can move in 2 directions', () => {
        addValidMoves(maze, visitedCells, 3, width, validMoves);
        expect(validMoves[0]).toBe(0);
        expect(validMoves[1]).toBe(6);
    })
    
})
