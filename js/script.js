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

  const play = function(){
    const maxRounds = 9;
    let playerIndex = null;
    for(let i = 0; i < maxRounds; i++){
      playerIndex = i % 2;
      console.log(`round: ${i + 1}`);
      playRound(players[playerIndex]);
      if(checkWin()){
        console.log(getGameBoard());
        if(checkWin() == "X"){
          console.log(players[0].name + " Won!");
          players[0].wins += 1;
        }
        else{
          console.log(players[1].name + " Won!");
          players[1].wins += 1;
        }
        break;
      }
    }
  };

  const playRound = function(player){
    const marker = player.marker;
    alert(`Player: ${player.name}\nMarker: ${player.marker}`);
    while(true){
      const {row,col} = getMarkerLocation();
      if(addMarker(marker,row,col) === 0){
        console.log(getGameBoard());
        break;
      }
      else{
        console.log("Invalid Location!");
      }
    }
  }; 

  return{
    getPlayers,
    setPlayerName,
    play,
  };
})();

App.setPlayerName(prompt("Player1: ","Player-1"),"1");
App.setPlayerName(prompt("Player2: ","Player-2"),"2");
App.play();