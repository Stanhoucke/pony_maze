const addMazeWall = (index, height, width, wall) => {
    if ((index + 1) % width === 0 && index >= (height * width) - width) {
        wall.push("east")
        wall.push("south")
    } else if ((index + 1) % width === 0) {
        wall.push("east")
    } else if (index >= (height * width) - width) {
        wall.push("south")
    }
}

const updateAllWalls = (walls, width, height) => {
    walls.forEach((wall, index) => {
        addMazeWall(index, height, width, wall);
    });
    return walls;
}

const getWallClasses = (borders) => {
    let classNames = "";
    borders.forEach((wall) => {
        classNames.length > 0 ? classNames += (" " + wall) : classNames += wall;
    })
    return classNames;
}

export {
    addMazeWall,
    updateAllWalls,
    getWallClasses
};