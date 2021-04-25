const addMazeBorder = (index, height, width, border) => {
    if ((index + 1) % width === 0 && index >= (height * width) - width) {
        border.push("east")
        border.push("south")
    } else if ((index + 1) % width === 0) {
        border.push("east")
    } else if (index >= (height * width) - width) {
        border.push("south")
    }
}

const updateAllBorders = (walls, width, height) => {
    walls.forEach((wall, index) => {
        addMazeBorder(index, height, width, wall);
    });
    return walls;
}

export {
    addMazeBorder,
    updateAllBorders
};