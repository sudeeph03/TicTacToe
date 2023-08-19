
const cells = document.querySelectorAll(".cells")
const restart = document.querySelector("#restartGame")
const result = document.querySelector("#status")

let chance = ["","","","","","","","",""]
const winConditions = [[0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]]
let running = false
let currentPlayer = "X"

initializeGame()

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click" , cellClicked))
    restart.addEventListener("click" , restartGame)
    result.textContent = `${currentPlayer}'s turn`
    running = true
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")
    if(chance[cellIndex] != "" || !running){
        return;
    }

    updateCell(this,cellIndex)
    checkWinCondition()
}

function updateCell(cell, index){
    chance[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    result.textContent = `${currentPlayer}'s turn`
}

function checkWinCondition(){
    let roundWon = false

    for(let i = 0; i < winConditions.length; i++){
        let condition = winConditions[i]
        let cellA = chance[condition[0]]
        let cellB = chance[condition[1]]
        let cellC = chance[condition[2]]

        if(cellA == "" || cellB == "" || cellC == ""){
            continue
        } 
        if(cellA == cellB && cellB == cellC){
            roundWon = true
            break
        }
    }

    if(roundWon){
        result.textContent = `${currentPlayer} Won!`
        running = false
    } else if(!chance.includes("")) {
        result.textContent = `Draw!`
        running= false
    } else{
        changePlayer()
    }
}
function restartGame(){
    currentPlayer = "X";
    chance = ["", "", "", "", "", "", "", "", ""];
    result.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}