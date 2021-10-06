let numRows = 25;
let numColumns = 52;

const createCells = () => {
    const main = document.querySelector('.content');

    for (let row = 0; row < numRows - 1; row++) {
        for (let column = 0; column < numColumns - 1; column++) {
            const input = document.createElement('input')
            input.setAttribute('type', 'checkbox');
            input.classList.add('elem');
            input.classList.add(`r${(row % numRows) + 1}-c${(column % numColumns) + 1}`);
            main.appendChild(input)
        }
    }
}

createCells();

const checkRandomBoxes = () => {
    const elements = document.querySelectorAll('.elem');
    
    for (let active = 0; active < 10; active++) {
        let className = `r${Math.floor(Math.random() * numRows)}-c${Math.floor(Math.random() * numColumns)}`;
        elements.forEach(elem => {
            if (elem.classList.contains(className)) elem.checked = true;
        })
    }
}

checkRandomBoxes();

const isAlive = (x, y) => {
    if (x < 1 || x >= numRows || y < 1 || y >= numColumns) return false;
    return document.querySelector(`.r${x}-c${y}`).checked ? 1 : 0;
}

let numsAlive = [];
let centerCellAlive = [];

const checkSurrounding = () => {
    for (let a = 1; a < numRows; a++) {
        for (let b = 1; b < numColumns; b++) {
            // Count the nearby population
            let numAlive = isAlive(a - 1, b - 1) + isAlive(a, b - 1) + isAlive(a + 1, b - 1) + isAlive(a - 1, b) + isAlive(a + 1, b) + isAlive(a - 1, b + 1) + isAlive(a, b + 1) + isAlive(a + 1, b + 1);
            let centerCell = isAlive(a, b);
            numsAlive.push(numAlive);
            centerCellAlive.push(centerCell);
        }
    }
}

function checkArrContent(stateArr) {
    if (stateArr.length > 0) {
        const elements = document.querySelectorAll('.elem');

        stateArr.map((alive, idx) => {
            // Do nothing
            if (alive == 2) elements[idx].checked = elements[idx].checked;
            // Make alive
            else if (alive == 3) elements[idx].checked = true;
            // Make dead
            else elements[idx].checked = false;
        })
    }
}

let intervalId;

document.getElementById('play').addEventListener('click', () => {
    intervalId = setInterval(() => {
        window.requestAnimationFrame(() => {
            checkSurrounding();
            checkArrContent(numsAlive);
            numsAlive = [];
        })
    }, 200);
    document.getElementById('save').style.display = "none";
})

document.getElementById('pause').addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById('save').style.display = "block";
})

document.getElementById('random').addEventListener('click', () => {
    checkRandomBoxes();
})

document.getElementById('save').addEventListener('click', () => {
    checkSurrounding();
    checkArrContent(numsAlive);
    console.log(numsAlive);

    let dataArr = [];
    let centerArr = [];

    numsAlive.map(data => dataArr.push(data));
    centerCellAlive.map(center => centerArr.push(center));

    localStorage.removeItem("checkedElem");
    localStorage.removeItem("checkedCenter");
    localStorage.setItem("checkedElem", dataArr);
    localStorage.setItem("checkedCenter", centerArr);

    console.log(dataArr);
})

window.addEventListener('load', () => {
    let savedData = localStorage.getItem("checkedElem");
    let savedCenter = localStorage.getItem("checkedCenter");

    savedData = savedData.split(',');
    savedCenter = savedCenter.split(',');
    console.log([...savedData]);
    console.log([...savedCenter]);

    document.getElementById('previous').addEventListener('click', () => {
        checkArrContent(savedData);
        checkArrContent(savedCenter);
    })
})