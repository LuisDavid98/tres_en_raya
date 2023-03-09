let turn = "X";
let winConditions = [
  [
    1,1,1,
    0,0,0,
    0,0,0
  ],
  [
    0,0,0,
    1,1,1,
    0,0,0
  ],
  [
    0,0,0,
    0,0,0,
    1,1,1
  ],
  [
    1,0,0,
    1,0,0,
    1,0,0
  ],
  [
    0,1,0,
    0,1,0,
    0,1,0
  ],
  [
    0,0,1,
    0,0,1,
    0,0,1
  ],
  [
    1,0,0,
    0,1,0,
    0,0,1
  ],
  [
    0,0,1,
    0,1,0,
    1,0,0
  ]
]

function onCellClick(element) {
  let div = document.createElement("div");
  div.className = "cell__item";
  div.append(turn);
  element.append(div);
  element.classList.add("cell--disabled");
  verifyTable(turn);
  changeTurn();
}

function changeTurn() {
  if (turn == "X") {
    turn = "O";
  }else {
    turn = "X"
  }
}
function verifyTable(player) {
  let cells = document.getElementsByClassName("cell");
  let playerStatus = [];
  for (let index = 0; index < cells.length; index++) {  
    let cellItem = cells[index].firstChild;
    if (cellItem != null) {
      const coin = cellItem.firstChild.textContent;
      if (coin === player) {
        playerStatus.push(1);
      }else {
        playerStatus.push(0);
      }
    }else {
      playerStatus.push(0);
    }
  }
  console.log(playerStatus);
  winConditions.forEach(winCondition => {
    let winPositions = [];
    winCondition.forEach((winCoin, index) => {
      if (winCoin === 1) {
        winPositions.push(index);
      }
    })
    let confirmations = 0;
    winPositions.forEach(position => {
      if (playerStatus[position] === 1) {
        confirmations += 1;
      }
    });
    if (confirmations === 3) {
      setWinner(player, winPositions);
      return;
    } 
  });
}

function setWinner(winnerCoin, positions) {
  const cellList = document.getElementsByClassName("cell");
  console.log(positions);
  positions.forEach(winPosition => {
    cellList[winPosition].firstChild.classList.add("cell__item--win");
  })
  for (let index = 0; index < cellList.length; index++) {
    const element = cellList[index];
    element.classList.add("cell--disabled");
  }
  document.getElementById("result__title").textContent = "Ganador: "+winnerCoin;
}

function cleanTable() {
  let cells = document.getElementsByClassName("cell");
  for (let index = 0; index < cells.length; index++) {
    let cell = cells[index];
    const cellItem = cell.lastChild;
    if (cellItem != null) {
      cell.removeChild(cellItem);
    }
    cell.classList.remove("cell--disabled");
  }
  const result = document.getElementById("result__title").textContent = "";
}
