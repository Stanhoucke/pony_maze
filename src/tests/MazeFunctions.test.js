import {addMazeBorder} from '../models/MazeFunctions';

describe('Maze Functions', function () {
    // Set up
    let border;

    beforeEach( function () {
        border = ["north"];
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

})



