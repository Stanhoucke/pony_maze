import {addMazeBorder} from '../models/MazeFunctions';

// Tests
test('can add SE cornner maze borders', () => {
    const border = ["north"];
    addMazeBorder(8, 3, 3, border);
    expect(border.length).toBe(3);
})
