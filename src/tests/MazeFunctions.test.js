import {addMazeBorder, updateAllBorders} from '../models/MazeFunctions';

describe('Maze Functions', function () {
    // Set up
    let border;
    let walls;

    beforeEach( function () {
        border = ["north"];
        walls = [
            ["west", "north"], ["north"], ["north"],
            ["west"], [], [],
            ["west"],[],[]
        ]
    })
    
    // Tests
    test('can add SE cornner maze borders', () => {
        addMazeBorder(8, 3, 3, border);
        expect(border.length).toBe(3);
    })

    test('can add east border', () => {
        addMazeBorder(2, 3, 3, border);
        expect(border[1]).toBe("east");
    })

    test('can add south border', () => {
        addMazeBorder(6, 3, 3, border);
        expect(border[1]).toBe("south");
    })

    test('all south and east walls can be updated', () => {
        updateAllBorders(walls, 3, 3);
        expect(walls[2][1]).toBe("east");
        expect(walls[5][0]).toBe("east");
        expect(walls[6][1]).toBe("south");
        expect(walls[7][0]).toBe("south");
        expect(walls[8].length).toBe(2);
        expect(walls[4].length).toBe(0);
        expect(walls[0].length).toBe(2);
        expect(walls[1][0]).toBe("north");
    })

})



