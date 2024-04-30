const App = (function(){
  const gameBoard = [
    ["","",""],
    ["","",""],
    ["","",""],
  ];

  const players = [
    {
      id: "1",
      name: "Player-1",
      marker: "X",
      wins: 0,
    },
    {
      id: "2",
      name: "Player-2",
      marker: "O",
      wins: 0,
    }
  ];

  let currentPlayer = players[0];
  let currentRound = 0;

  const getPlayers = function(){
    return players;
  };

  const getGameBoard = function(){
    return gameBoard;
  };

  const addMarker = function(marker,row,col){
    if(!gameBoard[row][col]){
      gameBoard[row][col] = marker;
      return 0;
    }
    return 1;
  };

  const checkWin = function(){
    let winnerMarker = "";

    if(
      gameBoard[0][0] == gameBoard[0][1] && 
      gameBoard[0][0] == gameBoard[0][2]
    ){
        winnerMarker = gameBoard[0][0];
    }
    else if(
      gameBoard[1][0] == gameBoard[1][1] && 
      gameBoard[1][0] == gameBoard[1][2]
    ){
      winnerMarker = gameBoard[1][0];
    }
    else if(
      gameBoard[2][0] == gameBoard[2][1] && 
      gameBoard[2][0] == gameBoard[2][2]
    ){
      winnerMarker = gameBoard[2][0];
    }
    else if(
      gameBoard[0][0] == gameBoard[1][0] &&
      gameBoard[0][0] == gameBoard[2][0]
    ){
      winnerMarker = gameBoard[0][0];
    }
    else if(
      gameBoard[0][1] == gameBoard[1][1] &&
      gameBoard[0][1] == gameBoard[2][1]
    ){
      winnerMarker = gameBoard[0][1];
    }
    else if(
      gameBoard[0][2] == gameBoard[1][2] &&
      gameBoard[0][2] == gameBoard[2][2]
    ){
      winnerMarker = gameBoard[0][2];
    }
    else if(
      gameBoard[0][0] == gameBoard[1][1] &&
      gameBoard[0][0] == gameBoard[2][2]
    ){
      winnerMarker = gameBoard[0][0];
    }
    else if(
      gameBoard[0][2] == gameBoard[1][1] &&
      gameBoard[0][2] == gameBoard[2][0]
    ){
      winnerMarker = gameBoard[0][2];
    }

    return winnerMarker;
  };

  const setPlayerName = function(name,id){
    players.forEach(player => {
      if(player.id == id){
        player.name = name;
      }
    });
  };

  const getMarkerLocation = function(){
    let row = null;
    let col = null;
    while(true){
      const userInput = prompt("row,col: ").trim();
    
      row = userInput.split(",")[0];
      col = userInput.split(",")[1];

      if((row > 2 || row < 0) || (col > 2 || col < 0)){
        continue;
      }
      else{
        break;
      }
    }

    return {row,col};
  };

  const boardEl = document.querySelector("#gameBoard");
  const winnerEl = document.querySelector("#winner");
  const playerEl = document.querySelector("#player");

  const renderBoard = function(){
    boardEl.innerHTML = null;
    const gameBoard = getGameBoard();

    gameBoard.forEach((row,rowIndex) => {
      row.forEach((col,colIndex) => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.coords = `${rowIndex}-${colIndex}`;
        tile.textContent = col;
        tile.addEventListener("click",tileClickHandler);
        boardEl.append(tile);
      });
    });
  };

  const renderWinner = function(player){
    winnerEl.textContent = player.name + "Won!";
    winnerEl.style.color = "lime";
  };

  const renderTie = function(){
    winnerEl.textContent = "It's a tie!";
  }
  
  const renderCurrentPlayer = function(player){
    playerEl.textContent = 
      `Current Player: ${player.name} | Marker: ${player.marker}`;
  };

  const render = function(){
    renderBoard();
    renderCurrentPlayer(currentPlayer);
  }

  const tileClickHandler = function(event){
    const coords = event.target.dataset.coords;
    const [row,col] = coords.split("-");

    playRound(row,col);

    if(checkWin()){
      renderBoard();
      if(checkWin() == "X"){
        renderWinner(players[0]);
        players[0].wins += 1;
      }
      else{
        renderWinner(players[1]);
        players[1].wins += 1;
      }
    }
    else if(currentRound === 9){
      renderTie();
    }
    
  };
  
  const playRound = function(row,col){
    const marker = currentPlayer.marker;
    while(true){
      if(addMarker(marker,row,col) === 0){
        renderBoard();
        break;
      }
    }
    
    currentRound++;
    const currentIndex = currentRound % 2;
    currentPlayer = players[currentIndex];
    renderCurrentPlayer(currentPlayer);
  }; 

  // const play = function(){
  //   renderBoard();
  //   const maxRounds = 9;
  //   let playerIndex = null;
  //   for(let i = 0; i < maxRounds; i++){
  //     playerIndex = i % 2;
  //     playRound(players[playerIndex]);
  //     if(checkWin()){
  //       renderBoard();
  //       if(checkWin() == "X"){
  //         renderWinner(players[0]);
  //         players[0].wins += 1;
  //       }
  //       else{
  //         renderWinner(players[1]);
  //         players[1].wins += 1;
  //       }
  //       break;
  //     }
  //   }
  // };


  return{
    getPlayers,
    setPlayerName,
    render,
  };
})();

App.setPlayerName(prompt("Player1: ","Player-1"),"1");
App.setPlayerName(prompt("Player2: ","Player-2"),"2");
App.render();