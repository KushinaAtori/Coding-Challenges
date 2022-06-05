/*
  Two player that give X,Y
  Fill 8 Tables
  -- Server List
  -- Users
  
  
  Bot AI (Impossible)
  -- Padd Y Axis == Ball Y
  
  Controls
  W & S
  W = 87 => UP
  S = 83 => Down
  
  Ball
  140 => X
  205 => Y
*/

var key;
var playerPaddleY;
var playerPaddleX;
var botPaddleY;
var botPaddleX;

var ballY;
var ballX;

// Make new Corners
// Player Corner2
var PC2;
var PC3;
var BC2;

var lastTouch = "player";

onEvent("screen1", "keydown", function(event){
  key = event.charCode || event.keyCode;
  playerPaddleY = getYPosition("playerPaddle");
  console.log(key);
  
  // Private Positions
  setInterval(function(){
    playerPaddleY = getYPosition("playerPaddle");
    botPaddleY = getYPosition("botPaddle");
    playerPaddleX = getXPosition("playerPaddle");
    botPaddleX = getXPosition("botPaddle");
    
  }, 100);
  
  // Bot
  if (key == 87) {
    botPaddleY-=5;
    setPosition("botPaddle",300,botPaddleY);
  }
  if (key == 83) {
    botPaddleY+=5;
    setPosition("botPaddle",300,botPaddleY);
  }
  // Player
  if (key == 69) {
    playerPaddleY-=5;
    setPosition("playerPaddle",-10,playerPaddleY);
  }
  if (key == 68) {
    playerPaddleY+=5;
    setPosition("playerPaddle",-10,playerPaddleY);
  }
});
collisions();
function collisions(){
  var newBallX = 140;
  var newBallY = 205;
  setInterval(function(){
    
    // Private Positions
    playerPaddleY = getYPosition("playerPaddle");
    botPaddleY = getYPosition("botPaddle");
    playerPaddleX = getXPosition("playerPaddle");
    botPaddleX = getXPosition("botPaddle");
    
    // Ball Position
    ballY = getYPosition("Ball");
    ballX = getXPosition("Ball");
    
    // Second Corners
    PC2 = playerPaddleY+99; // X is based on right side
    PC3 = playerPaddleX+30;
    BC2 = botPaddleY+99;
    
    // Collision Handler
    // Return To Bot
    if(ballX <= 260 && lastTouch == "player"){
      setPosition("Ball",newBallX,newBallY);
      if(ballX >= 260 && ballY >= botPaddleY && ballY <= BC2){
        lastTouch = "bot";
      }
    }
    if(ballX >= 20 && lastTouch == "bot"){
      setPosition("Ball",newBallX,newBallY);
      if(ballX <= 20 && ballY >= playerPaddleY && ballY <= PC2){
        lastTouch = "player";
      }
    }
    
    // Basic Physics Handler
    // Half of each object => 137.5
    
    // Left Side
    newBallX = ballX;
    newBallY = ballY;
    
    
    
    if(ballX < 140) {
      if(ballX >= playerPaddleY && ballX <= PC2/2){
      newBallX+5;
      newBallY-5;
      setPosition("Ball",newBallX,newBallY);
    } else if(ballX >= PC2/2 && ballX<PC2){
        newBallX+5;
        newBallY+5;
        setPosition("Ball",newBallX,newBallY);
      } 
    } else {
      setPosition("Ball",newBallX+5,newBallY+5);
    }
    // Right Side
    if(ballX > 140){
      if(ballX >= botPaddleY && ballX <= BC2/2){
      newBallX-5;
      newBallY-5;
      setPosition("Ball",newBallX,newBallY);
    } else if(ballX >= BC2/2 && ballX <= BC2){
        newBallX-5;
        newBallY+5;
        setPosition("Ball",newBallX,newBallY);
      }
    } 
    
  }, 100);
}
