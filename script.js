function createDiv(childClass, childId, parentClass = 'container'){
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



const container = document.querySelector('.container');

container.addEventListener('mouseover', (event) => {
    getGridSquare(event, '16');
});









