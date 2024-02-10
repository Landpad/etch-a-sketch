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

function updateGridSquare(gridSquareId){
    const gridSquare = document.querySelector(`#gridSquare${gridSquareId}`);
    gridSquare.style.background = 'red';

}

function getGridSquare(event, squaresPerSide){
    let totalGridSquare = (squaresPerSide * squaresPerSide) - 1;
    for( let i = totalGridSquare; i>=0; i-- ){
        switch(event.target.id){
            case `gridSquare${i}`:
                updateGridSquare(i);
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

function resizeGrid(squaresPerSide){
    let totalGridSquare = (squaresPerSide * squaresPerSide) - 1;
    let gridSquareSize = 100 / squaresPerSide;

    for( let i = totalGridSquare; i >= 0; i--){
        let gridSquare = document.querySelector(`#gridSquare${i}`);
        gridSquare.style.width = `${gridSquareSize}%`;
        gridSquare.style.height = `${gridSquareSize}%`;
    }
}

const gridContainer = document.querySelector('.gridContainer');
const resetGridButton = document.querySelector('#resetGrid');

gridContainer.addEventListener('mouseover', (event) => {
    getGridSquare(event, '100');

});

resetGridButton.addEventListener('click', () => {
    let squaresPerSide = prompt('Enter a number of squares per side less than 100.');
    
    removeGrid();

    while (isNaN(parseInt(squaresPerSide)) || parseInt(squaresPerSide) > 100) {
        alert('Please enter a valid number less than 100.');
        squaresPerSide = prompt('Enter a number of squares per side less than 100.');
    }

    createGrid(squaresPerSide);
    resizeGrid(squaresPerSide);


});

createGrid('16');













