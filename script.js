let gameActive = true;
let currentPlayer ="X";
let gameState = ["","","","","","","","",""];
statusDispaly = document.querySelector(".game--status");



function handleRestartGame(){
   gameActive = true;
   currentPlayer="X";
   gameState=["","","","","","","","",""];
   document.querySelectorAll(".cell").forEach(cell => cell.innerHTML ="");
   statusDispaly.innerHTML = `Its ${currentPlayer}'s turn`;
}

function handleCellClick(ClickedEvent){
    const clickedCell = ClickedEvent.target;
    const clickedCellIndex =parseInt(clickedCell.getAttribute("data-cell-index"));
    
    if(gameState[clickedCellIndex] != "" || !gameActive){
        return;
    }
    // console.log(gameState[clickedCell)];
    // console.log(!gameActive);
    handleCellPlayer(clickedCell,clickedCellIndex);
    handleResultValidation();

}


function handleCellPlayer(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function handleResultValidation(){
    let roundWon = false;
    for(let i=0; i<=7; i++){
        const winningCondition = winningConditions[i];
        let a=gameState[winningCondition[0]];
        let b=gameState[winningCondition[1]];
        let c=gameState[winningCondition[2]];

        if(a === "" || b ==="" || c ===""){
            continue;
        } 

        if(a===b && b===c){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusDispaly.innerHTML = `Player ${currentPlayer} has won. Congratualations!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDispaly.innerHTML = "Its a draw";
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange(){
    // if(currentPlayer === "X"){
    //     currentPlayer = "O"
    // }
    // else{
    //     currentPlayer = "X"
    // }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDispaly.innerHTML = `Its ${currentPlayer}'s turn`;
}

document.querySelector(".game--restart").addEventListener("click",handleRestartGame);
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click",handleCellClick));