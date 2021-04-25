const addMazeBorder = (index, height, width, border) => {

    // SE corner
    // Modulo width is 0 and Index is greater than height x width - width
        // Push east and south to border
    if ((index + 1) % width === 0 && index >= (height * width) - width) {
        border.push("east")
        border.push("south")
    } else if ((index + 1) % width === 0) {
        border.push("east")
    } else if (index >= (height * width) - width) {
        border.push("south")
    }

    // East border
    // Modulo width is 0
        // Push east to border

    // South border
    // Index is greater than height x width - width
        // Push south to border

}

export {addMazeBorder};