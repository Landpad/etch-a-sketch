function createDiv(childClass, childId, parentClass = 'gridContainer'){
    const parentDiv = document.querySelector(`.${parentClass}`);
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class',childClass);
    newDiv.setAttribute('id', `gridSquare${childId}`);
    parentDiv.appendChild(newDiv);

}

function createGrid (squaresPerSide){
    let totalGridSquare = (squaresPerSide * squaresPerSide) - 1;
    for( let i = totalGridSquare; i >= 0; i-- ){
        createDiv('gridSquare', i);

    }

}

function updateGridSquare(gridSquareId, color){
    const gridSquare = document.querySelector(`#gridSquare${gridSquareId}`);
    gridSquare.style.background = color;

}

function getGridSquare(event, squaresPerSide, color){
    let totalGridSquare = (squaresPerSide * squaresPerSide) - 1;
    for( let i = totalGridSquare; i>=0; i-- ){
        switch(event.target.id){
            case `gridSquare${i}`:
                updateGridSquare(i, color);
                break;
        }

    }

}

function removeGrid(){
    while(document.querySelector('.gridSquare') != null){
        let gridSquare = document.querySelector('.gridSquare');
        gridSquare.remove();
    }

}

function getSquaresPerSide (){
    let squaresPerSide = prompt('Enter a number of squares per side less than 100.');
    while (isNaN(parseInt(squaresPerSide)) || parseInt(squaresPerSide) > 100) {
        alert('Please enter a valid number less than 100.');
        squaresPerSide = prompt('Enter a number of squares per side less than 100.');
    }

    return squaresPerSide;

}

function resizeGrid(squaresPerSide){
    let totalGridSquare = (squaresPerSide * squaresPerSide) - 1;
    let gridSquareSize = 100 / squaresPerSide;

    for( let i = totalGridSquare; i >= 0; i--){
        let gridSquare = document.querySelector(`#gridSquare${i}`);
        gridSquare.style.width = `${gridSquareSize}%`;
        gridSquare.style.height = `${gridSquareSize}%`;

    }

}

function playAudio(audioSrc){
    let audio = new Audio(audioSrc);
    audio.play();
}

function insertCharacter(element, character, position, endPosition){
    if (!(element.value[0] === `${character}`)) {
        element.setSelectionRange(position, endPosition);
        element.value = `${character}` + element.value;

    }

    return element.value;

}

const DEFAULT_COLOR = '#000000';
const ERASER_COLOR = '#ffffff'
const DEFAULT_SQUARES_PER_SIDE = '16';
const SHAKE_SOUND = './resources/Zumbido_Messenger.mp3';

const gridContainer = document.querySelector('.gridContainer');
const resetGridButton = document.querySelector('#resetGrid');
const penColor = document.querySelector('#changeColor');
const hexColor = document.querySelector('#hexColor');
const eraser = document.querySelector('#eraser');

let squaresPerSide = DEFAULT_SQUARES_PER_SIDE;
let color = penColor.value;
color = DEFAULT_COLOR;

penColor.addEventListener('input', () =>{
    color = penColor.value;
    hexColor.value = color;
});

hexColor.addEventListener('input', () => {
    insertCharacter(hexColor, '#', 0, 0);
    penColor.value = hexColor.value;
    color = penColor.value;
});

eraser.addEventListener('click', () =>{
    color = ERASER_COLOR;
});

gridContainer.addEventListener('mouseover', (event) => {
    if(event.buttons == 1 || event.buttons == 4){
        getGridSquare(event, squaresPerSide, color);
    }
});

gridContainer.addEventListener('click', (event) => {
    getGridSquare(event, squaresPerSide, color);
});

resetGridButton.addEventListener('click', (event) => {
    removeGrid();
    squaresPerSide = getSquaresPerSide();
    createGrid(squaresPerSide);
    resizeGrid(squaresPerSide);
    event.preventDefault();
    gridContainer.classList.add('gridContainerShake');
    playAudio(SHAKE_SOUND);
    
});

gridContainer.addEventListener('animationend', () => {
    gridContainer.classList.remove('gridContainerShake');
});

createGrid(DEFAULT_SQUARES_PER_SIDE);