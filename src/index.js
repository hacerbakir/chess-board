const cols = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H' };
const chessBoard = document.getElementById('chessBoard');
const knight = document.getElementById('horse');
let x = 0, y = 0;
let horseX = 0, horseY = 0;

chessBoard.classList.add('board');

getTh();
for (let i = 1; i < 9; i++) {
    let tr = document.createElement('tr');
    for (let j = 1; j < 9; j++) {
        let td = document.createElement('td');
        let div = document.createElement('div');
        div.classList.add('flex', 'justify-center', 'items-center', 'w-full', 'h-full');
        td.setAttribute('id', `${j}${9 - i}`);
        td.setAttribute('ondrop', 'drop(event)');
        td.setAttribute('ondragover', 'dragOver(event)');
        ((i + j) % 2 == 0) ?
            td.setAttribute('class', 'white') :
            td.setAttribute('class', 'brown');
        td.appendChild(div);
        tr.appendChild(td);
        td.dataset.x = j;
        td.dataset.y = 9 - i;
        div.dataset.x = j;
        div.dataset.y = 9 - i;

    }
    chessBoard.appendChild(tr);
};
getTh();
function getTh() {
    for (let i = 0; i < 8; i++) {
        const th = document.createElement('th');
        th.innerHTML = cols[i];
        chessBoard.appendChild(th);
    }
};

function dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    ev.dataTransfer.effectAllowed = 'move';
    const horse = document.getElementById(ev.dataTransfer.getData('text'));
    let parent = horse.parentNode;
    x = parent.dataset.x;
    y = parent.dataset.y;
};

function dragOver(ev) {
    ev.preventDefault();
};

function drop(ev) {
    ev.preventDefault();
    const horse = document.getElementById(ev.dataTransfer.getData('text'));
    ev.target.appendChild(horse);
    let parent = horse.parentNode;
    knightMoves(parent, ev);
    horseX = ev.target.dataset.x;
    horseY = ev.target.dataset.y;
    console.log("drop", horseX, horseY);


};

function knightMoves(parent, ev) {
    if (!x || !y) return true;
    const parentX = parent.dataset.x;
    const parentY = parent.dataset.y;
    const sonucX = Math.abs(parentX - x);
    const sonucY = Math.abs(parentY - y);

    if ((sonucX === 1 && sonucY === 2) || (sonucX === 2 && sonucY === 1)) {
        return true;
    } else {
        returnHorseToOriginalPosition(x, y, ev);
        return false;
    }
};

function returnHorseToOriginalPosition(x, y, ev) {
    const allTd = document.querySelectorAll('td');
    const horsePosition = `${x}${y}`;
    allTd.forEach(e => {
        if (e.id == horsePosition) {
            e.firstChild.appendChild(document.getElementById(ev.dataTransfer.getData('text')));
        };
    });
};

let previousPositions = [];
function allKnightMoves(horseX, horseY) {
    previousPositions.forEach(position => {
        const cell = document.getElementById(position);
        if (cell) {
            cell.style.backgroundColor = "";
        }
    });


    const moves = [
        { dx: 1, dy: 2 },
        { dx: 1, dy: -2 },
        { dx: -1, dy: 2 },
        { dx: -1, dy: -2 },
        { dx: 2, dy: 1 },
        { dx: 2, dy: -1 },
        { dx: -2, dy: 1 },
        { dx: -2, dy: -1 }
    ];

    const getTd = [];
    for (const move of moves) {
        const newX = Number(horseX) + move.dx;
        const newY = Number(horseY) + move.dy;
        getTd.push(`${newX}${newY}`);
    }
    //console.log(getTd);

    const allTd = document.querySelectorAll('td');
    allTd.forEach(e => {
        getTd.map(td => {
            if (e.id == td) {
                e.style.backgroundColor="green";
            }
        });
    });
    previousPositions = getTd.slice();
};

knight.addEventListener('click', e=>{
    allKnightMoves(horseX, horseY);
});





