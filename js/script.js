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

  const boardEl = document.querySelector("#gameBoard");
  const winnerEl = document.querySelector("#winner");
  const playerEl = document.querySelector("#player");
  const infoEl = document.querySelector("#info");
  const nextBtn = document.querySelector("#next-game");
  const resetBtn = document.querySelector("#reset");
  const modalBox = document.querySelector("dialog");

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

  const renderBoard = function(){
    boardEl.innerHTML = null;
    const gameBoard = getGameBoard();

    gameBoard.forEach((row,rowIndex) => {
      row.forEach((col,colIndex) => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.coords = `${rowIndex}-${colIndex}`;
        tile.textContent = col;
        tile.addEventListener("click",tileClickHandler,{once: true});
        boardEl.append(tile);
      });
    });
  };

  const renderWinner = function(player){
    winnerEl.textContent = player.name + " Won!";
    winnerEl.style.color = "lime";
    removeListeners();
  };

  const renderTie = function(){
    winnerEl.textContent = "It's a tie!";
    removeListeners();
  };
  
  const renderCurrentPlayer = function(player){
    playerEl.textContent = 
      `Current Player: ${player.name} | Marker: ${player.marker}`;
  };

  const renderInfo = function(){
    const player1El = document.createElement("p");
    player1El.textContent = 
      `Player 1: ${players[0].name} | Wins: ${players[0].wins}`;

    const player2El = document.createElement("p");
    player2El.textContent = 
      `Player 2: ${players[1].name} | Wins: ${players[1].wins}`;

    infoEl.innerHTML = null;
    infoEl.append(player1El,player2El);
  };

  const render = function(){
    renderBoard();
    renderCurrentPlayer(currentPlayer);
    renderInfo();
  };

  const tileClickHandler = function(event){
    const coords = event.target.dataset.coords;
    const [row,col] = coords.split("-");

    playRound(row,col);

    if(checkWin()){
      if(checkWin() == "X"){
        renderWinner(players[0]);
        players[0].wins += 1;
        renderInfo();
      }
      else{
        renderWinner(players[1]);
        players[1].wins += 1;
        renderInfo();
      }
    }
    else if(currentRound === 9){
      renderTie();
    }
  };
  
  const playRound = function(row,col){
    const marker = currentPlayer.marker;
    if(addMarker(marker,row,col) === 0){
      renderBoard();
      currentRound++;
      const currentIndex = currentRound % 2;
      currentPlayer = players[currentIndex];
      renderCurrentPlayer(currentPlayer);
    }
    
  };
  
  const removeListeners = function(){
    document.querySelectorAll(".tile").forEach(tile => {
      tile.removeEventListener("click",tileClickHandler);
    });
  };

  const nextGameHandler = function(){
    gameBoard.forEach((row,rowIndex) => {
      row.forEach((col,colIndex) => gameBoard[rowIndex][colIndex] = "");
    });
    renderBoard();

    currentRound = 0;
    currentPlayer = players[0];
  };

  const resetHandler = function(){
    document.location.reload();
  };
  
  resetBtn.addEventListener("click",resetHandler);
  nextBtn.addEventListener("click",nextGameHandler);

  return{
    getPlayers,
    setPlayerName,
    render,
  };
})();

App.setPlayerName(prompt("Player1: ","Player-1"),"1");
App.setPlayerName(prompt("Player2: ","Player-2"),"2");
App.render();