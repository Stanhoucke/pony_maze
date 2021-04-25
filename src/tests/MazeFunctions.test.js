import {addMazeWall, updateAllWalls, getWallClasses} from '../models/MazeFunctions';

describe('Maze Functions', function () {
    // Set up
    let wall;
    let walls;

    beforeEach( function () {
        wall = ["north"];
        walls = [
            ["west", "north"], ["north"], ["north"],
            ["west"], [], [],
            ["west"],[],[]
        ]
    })
    
    // Tests
    // addMazeWall
    test('can add SE cornner maze walls', () => {
        addMazeWall(8, 3, 3, wall);
        expect(wall.length).toBe(3);
    })

    test('can add east wall', () => {
        addMazeWall(2, 3, 3, wall);
        expect(wall[1]).toBe("east");
    })

    test('can add south wall', () => {
        addMazeWall(6, 3, 3, wall);
        expect(wall[1]).toBe("south");
    })

    // updateAllWalls
    test('all south and east walls can be updated', () => {
        updateAllWalls(walls, 3, 3);
        expect(walls[2][1]).toBe("east");
        expect(walls[5][0]).toBe("east");
        expect(walls[6][1]).toBe("south");
        expect(walls[7][0]).toBe("south");
        expect(walls[8].length).toBe(2);
        expect(walls[4].length).toBe(0);
        expect(walls[0].length).toBe(2);
        expect(walls[1][0]).toBe("north");
    })

    // getWallClasses
    test('can get 1 wall class', () => {
        expect(getWallClasses(wall)).toBe("north");
    })
    
    test('can get 2 wall classes', () => {
        wall = ["west", "north"]
        expect(getWallClasses(wall)).toBe("west north");
    })
    
    test('can get 3 wall classes', () => {
        wall = ["north", "east", "south"]
        expect(getWallClasses(wall)).toBe("north east south");
    })
    
})



