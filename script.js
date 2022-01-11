
const btnGenerate = document.getElementById("generate");
const select = document.getElementById("level");
const grid = document.getElementById("grid");
const main = document.getElementsByTagName("main")[0];

const difficultyCells = [10, 9, 8];
const nBombs = 16;
const bombIndexes = new Array(nBombs);


function generateGrid(items){

    let row = "";
    let cell = "";

    let j = 0;
    grid.innerHTML = "";

    for(let i=1; i <= items; i++){
        
        row = document.createElement("div");
        row.className = "row";
        
        for (j=0; j < items; j++){
            
            cell = document.createElement("div");
            cell.className = "col";
            let index = (j+1) + items * (i-1);
            cell.innerText = index;
            cell.setAttribute("data_index", index);
            row.append(cell);
        }
        grid.append(row);
    }    
}


function generateBombsIndexes(cellsInARow, nBombs=16){
    
    let index;
    let i = 0;

    while(bombIndexes[nBombs-1] === undefined){
        
        index = getRandomNumber(1, cellsInARow * cellsInARow);
        if (keyExists(index, bombIndexes) == -1){
            bombIndexes[i] = index;
            i++;
        }
    }
}


function getBombs(){
    let bombs = [];
    for(let i=0; i < bombIndexes.length; i++){
        bombs[i] = document.querySelector(`[data_index="${bombIndexes[i]}"]`);
    }
    return bombs;
}


function keyExists(key, values){

    for (let i=0; i < values.length; i++){
        if (key == values[i]){
            return i;
        }
    }
    return -1;
}


function getRandomNumber(min, max){

    return Math.floor(Math.random() * (max - min) + 1) + min;
}


function showAllBombs(){

    for(let i=0; i < bombIndexes.length; i++){
        let cell = document.querySelector(`[data_index="${bombIndexes[i]}"]`);
        console.log(cell);
        cell.classList.add('bomb');
        cell.classList.add('active');
    }
}


window.addEventListener("DOMContentLoaded", function(){
    // let lostMessage = `<h2 class='message'>Seleziona una difficoltà</h2>`;
    // main.innerHTML = main.innerHTML + lostMessage;
});

    
btnGenerate.addEventListener('click', function(){
    let choice = select.options[select.selectedIndex].value;
    generateGrid(difficultyCells[choice]);
    generateBombsIndexes(difficultyCells[choice]);
});


grid.addEventListener('click', (e) => handleCells(e));

let endGame = false;
let successCount = 0;

function handleCells(event){

    let item = event.target;

    if (item.className == "col" && !endGame){

        if(keyExists(item.getAttribute("data_index"), bombIndexes) != -1){
            grid.removeEventListener('click', handleCells, true);
            endGame = true;
            console.log(bombIndexes);
            showAllBombs();
            alert("Game over!");

            let lostMessage = `<h2 class='message lost'>Game Over! <br> Numeri di tentativi riusciti: ${successCount}</h2>`         
            main.innerHTML = main.innerHTML + lostMessage;

            // main.innerHTML = main.innerHTML + lostMessage;
            // main.append(modal);
        }
        else {
            item.classList.add("active");
            successCount++;
        }
    }
}


