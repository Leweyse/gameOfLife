const main = document.querySelector('.content');

let numRows = 25;
let numColumns = 52;

for (let row = 0; row < numRows; row++) {
    for (let column = 0; column < numColumns; column++) {
        const input = document.createElement('input')
        input.setAttribute('type', 'checkbox');
        input.classList.add('elem');
        input.classList.add(`r${row % numRows}-c${column % numColumns}`);
        main.appendChild(input)
    }
}

const elements = document.querySelectorAll('.elem');

for (let active = 0; active < 250; active++) {
    let className = `r${Math.floor(Math.random() * numRows)}-c${Math.floor(Math.random() * numColumns)}`;
    elements.forEach(elem => {
        if (elem.classList.contains(className)) elem.setAttribute('checked', true);
    })
}

const gridToIndex = (x, y) => x + (y * numColumns);

const isAlive = (x, y) => {
    if (x < 0 || x >= numColumns || y < 0 || y >= numRows) return false;
    return document.querySelector(`.r${x}-c${y}`).checked ? 1 : 0;
}

for (let a = 0; a < numRows; a++) {
    for (let b = 0; b < numColumns; b++) {
        // Count the nearby population
        let numAlive = isAlive(a - 1, b - 1) + isAlive(a, b - 1) + isAlive(a + 1, b - 1) + isAlive(a - 1, b) + isAlive(a + 1, b) + isAlive(a - 1, b + 1) + isAlive(a, b + 1) + isAlive(a + 1, b + 1);
        let centerIndex = gridToIndex(a, b);
        // Do nothing
        if (numAlive == 2) document.querySelector(`.r${a}-c${b}`).checked = true;
        // Make alive
        else if (numAlive == 3) document.querySelector(`.r${a}-c${b}`).checked = true;
        // Make dead
        else document.querySelector(`.r${a}-c${b}`).checked = false;
    }
}

// // Apply the new state to the cells
// for (let i = 0; i < arr.length; i++) {
//     arr[i].alive = arr[i].nextAlive;
// }

// const gameLoop = () => {
//     checkSurrounding();

//     // The loop function has reached it's end, keep requesting new frames
//     setTimeout( () => {
//         window.requestAnimationFrame(() => gameLoop());
//     }, 100)
// }
