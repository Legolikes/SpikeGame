const loadImage = url => new Promise(resolve => {
  const image = new Image();
  image.src = url;
  image.onload = () => resolve(image);
});
Promise.all([
  loadImage('background.png'),
  loadImage('spikeBall.png'),
  loadImage('net.png'),
  loadImage('player0.png'),
  loadImage('player1.png'),
  loadImage('bluePlayerJump.png'),
  loadImage('redPlayerJump.png'),
  ]).then(function main(images) {
 
var ballGravity = false;
var prevScore = 0;
var topScore = 0;
var gameOver = true;
var gameReset = true;





class Vec
{
  constructor(x = 0, y = 0)
  {
    this.x = x;
    this.y = y;
  }
}

class Rect
{
  constructor(w, h)
  {
    this.pos = new Vec();
    this.size = new Vec(w, h);
  }
  get left()
  {
    return this.pos.x - this.size.x / 2;
  }
  get right()
  {
    return this.pos.x + this.size.x / 2;
  }
  get top()
  {
    return this.pos.y - this.size.y / 2;
  }
  get bottom()
  {
    return this.pos.y + this.size.y / 2;
  }
}

class Net extends Rect
{
  constructor()
  {
    super(210,55);
    this.vel = new Vec();
  }
}
class Ball extends Rect
{
  constructor()
  {
    super(25,25);
    this.vel = new Vec();
  }
}
class Player extends Rect
 {
   constructor()
   {
      super(60, 200);
      this.vel = new Vec();
   }
 }
class Main
{
  constructor(canvas)
  {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this.net = new Net();
    this.net.pos.x = this._canvas.width/2;
    this.net.pos.y = this._canvas.height - this._canvas.height/8 ;
    this.net.vel.x = 0;
    this.net.vel.y = 0;
    this.ball = new Ball();
    this.ball.pos.x = this._canvas.width/6;
    this.ball.pos.y = (this._canvas.height - this._canvas.height/3) -60;
    this.ball.vel.x = 0;
    this.ball.vel.y = 0;
    this.players = [
      new Player(),
      new Player(),
      ];
      this.players[0].pos.x = 60;
      this.players[1].pos.x = this._canvas.width -60;
      this.players[0].pos.y = this._canvas.height - this._canvas.height/3;
      this.players[1].pos.y = this.ball.pos.y + 60;
      this.players[0].vel.y = 0;

    let lastTime;
    const callback = (millis) => {
        if (lastTime) {
          this.update((millis - lastTime) / 1000);
        }
        lastTime = millis;
        requestAnimationFrame(callback);
      };
      callback();
  }
 collide(player, ball)
  {
    if (player.left < ball.right && player.right > ball.left &&
        player.top < ball.bottom && player.bottom > ball.top) {
        ballGravity = false;
        if(this.ball.vel.x <= 0){
        if(gameOver === false){
        prevScore += 1;
          }
        }
        this.ball.vel.x = 1.75 *(this.net.pos.x -(this.ball.pos.x));
         
        
        this.ball.vel.y = 1.75*(this.net.pos.y - 27 - (this.ball.pos.y));
      }
  }
draw(){
    this._context.drawImage(images[0], 0, 0, this._canvas.width, this._canvas.height);
    
    this.drawnet(this.net);
    this.drawball(this.ball);
    
    if(this.players[0].pos.y< this._canvas.height/1.5){
    this.drawplayer0jump(this.players[0]);
    }else{
    this.drawplayer0(this.players[0]);
    }
    
    if(this.players[1].pos.y< this._canvas.height/1.5){
    this.drawplayer1jump(this.players[1]);
    }else{
    this.drawplayer1(this.players[1]);
    }
  }
  
  drawplayer0(rect){
     this._context.drawImage(images[3], rect.left, rect.top, rect.size.x, rect.size.y);
   // this._context.fillStyle = '#ffffff';
   // this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawplayer1(rect){
     this._context.drawImage(images[4], rect.left, rect.top, rect.size.x, rect.size.y);
   // this._context.fillStyle = '#ffffff';
    //this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawplayer0jump(rect){
     this._context.drawImage(images[5], rect.left, rect.top, rect.size.x, rect.size.y);
   // this._context.fillStyle = '#ffffff';
   // this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawplayer1jump(rect){
     this._context.drawImage(images[6], rect.left, rect.top, rect.size.x, rect.size.y);
   // this._context.fillStyle = '#ffffff';
    //this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawnet(rect){
    this._context.drawImage(images[2], rect.left, rect.top, rect.size.x, rect.size.y);
    //this._context.fillStyle = '#ffffff';
    //this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
  drawball(rect){
    this._context.drawImage(images[1], rect.left, rect.top, rect.size.x, rect.size.y);
   // this._context.fillStyle = '#ffffff';
   //this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

update(dt) {
    displayResults();
   if (gameOver === true){
   this.ball.vel.x = 0;
   this.ball.vel.y = 0;
   this.players[0].vel.x = 0;
   this.players[0].vel.y = 0;
   }
   this.ball.pos.y += (this.ball.vel.y * dt);
   this.ball.pos.x += (this.ball.vel.x * dt);
   this.players[0].pos.y += (this.players[0].vel.y * dt);
   this.players[0].pos.x += (this.players[0].vel.x * dt);
   
    if(ballGravity === true){
    this.ball.vel.y += (13);
    }
    if(this.players[0].pos.y < this._canvas.height - this._canvas.height/3.5){
    this.players[0].vel.y += (30);
    }
    
    if (prevScore > topScore){
     topScore = prevScore;
    }
   
    if(this.net.bottom > this.ball.top && this.net.top < this.ball.bottom && this.net.right > this.ball.left && this.net.left < this.ball.right ) {
      randomNetPos();
      ballGravity = true;
      if(this.ball.vel.x > 0){
        this.ball.vel.x = (this.ball.vel.x + 200);
        }
      if(this.ball.vel.x < 0){
        this.ball.vel.x = (this.ball.vel.x - 200);
        }
     
      if(this.ball.vel.y > 0){
        this.ball.vel.y = -(this.ball.vel.y + 250);
        }
    }

    if(this.net.pos.x > this._canvas.width){
     this.net.pos.x =  this._canvas.width;
     }
    if(this.net.pos.x < 0){
     this.net.pos.x = 0;
     }
     
    if(this.players[0].pos.y > this._canvas.height - this._canvas.height/3.5){
     this.players[0].pos.y = this._canvas.height - this._canvas.height/3.5;
     this.players[0].vel.y =  -0.1 * (this.players[0].vel.y);
    }
    if(this.players[0].pos.y < 0){
     this.players[0].pos.y = 0;
     this.players[0].vel.y =  -this.players[0].vel.y;
    }
    if(this.players[0].pos.x > this._canvas.width){
     this.players[0].pos.x =  this._canvas.width;
     }
    if(this.players[0].pos.x < 0){
     this.players[0].pos.x = 0;
     }
     
    if(this.ball.right > this._canvas.width - 5 || this.ball.left < 0) {
      gameOver = true;
    }
    if(this.ball.top < 0) {
      this.ball.vel.y = -this.ball.vel.y;
    }
    if(this.ball.bottom > this._canvas.height){
     gameOver = true;
    }
    
    if (gameOver === false){
     document.onkeydown = checkKey;
    }else{
      document.onkeydown = null;
      }
    this.players[1].pos.y = this.ball.pos.y + 60;
    this.players.forEach(player => this.collide(player, this.ball));
    this.draw();
  }
}

const canvas = document.getElementById('mainCanvas');
const STUFF = new Main(canvas);


      
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
   
      STUFF.players[0].vel.y = STUFF.players[0].vel.y -650;
    }else{
     if (e.keyCode == '83') {
      STUFF.players[0].vel.y = STUFF.players[0].vel.y +300;
     }
  }
}
  
  
function displayResults(){

document.getElementById("Results").innerHTML = "Score: " + prevScore + " Top Score: " + topScore;

}
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);


function resetGame(){

  prevScore = 0;
  gameOver = true;
  gameReset = true;
  ballGravity = false;
  displayResults();
    STUFF.net.pos.x = STUFF._canvas.width/2;
    STUFF.net.pos.y = STUFF._canvas.height - STUFF._canvas.height/8;
    STUFF.ball.pos.x = STUFF._canvas.width/6;
    STUFF.ball.pos.y = (STUFF._canvas.height - STUFF._canvas.height/3) - 60;
    STUFF.ball.vel.x = 0;
    STUFF.ball.vel.y = 0;
    STUFF.players[0].pos.y = STUFF._canvas.height - STUFF._canvas.height/3;
    
}
function startGame(){
  if(gameReset === true){
  prevScore = 0;
  gameOver = false;
  STUFF.ball.vel.x = -800;
  gameReset = false;
  }
}

function randomNetPos(){
  STUFF.net.pos.x = Math.floor((Math.random() -0.5) * 400)+600;
}

});