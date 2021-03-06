var gamePiece;
var playerScore;
var bumpSound;
var music;

var enemyRed,enemyGreen,enemyPurple,enemyChoc;


function startGame() {
  //gameBackground = new component(280,656,"road.png",0,0,"background");
  gamePiece = new component(25, 25,"orange",135,450);
  bumpSound = new sound("bump.mp3");
  music = new sound("dippermusic.mp3");
  music.play();
  playerScore = new component("15px","Consolas","black",140,20,"text");
  enemyRed = new component(30,30, "red",127,0);
  enemyGreen = new component(30,30,"green",190,0);
  enemyPurple = new component(30,30,"purple",27,0);
  enemyChoc = new component(30,30,"chocolate",67,0);
  gameArea.start();
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 280;
        this.canvas.height = 470;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0; //for player score count
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);    
    }
}

function component(width, height, color, x, y,type) {
	 this.type = type;
	 if (type === "image") {
    this.image = new Image();
    this.image.src = color;
  }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () { 
    ctx = gameArea.context;
    if (type === "image") {
      ctx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width, this.height);
    }
    if (this.type === "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);    
    }else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
         }
    }
    this.newPos = function () {
     this.x += this.speedX;
     this.y += this.speedY;    
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
}

function moveup() {
    gamePiece.speedY -= 1; 
}

function movedown() {
    gamePiece.speedY += 1; 
}

function moveleft() {
    gamePiece.speedX -= 1;
}

function moveright() {
    gamePiece.speedX += 1;
}

function stopmove() {
     gamePiece.speedX = 0;
     gamePiece.speedY = 0;
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function updateGameArea() {
	if(gamePiece.crashWith(enemyRed)){
		bumpSound.play();
		music.stop();
      gameArea.stop();	
      return;
	}
	if(gamePiece.crashWith(enemyGreen)){
		bumpSound.play();
		music.stop();
      gameArea.stop();
      return;	
	}
	if(gamePiece.crashWith(enemyPurple)){
		bumpSound.play();
		music.stop();
      gameArea.stop();	
      return;
	}
	if(gamePiece.crashWith(enemyChoc)){
		bumpSound.play();
		music.stop();
      gameArea.stop();	
      return;
	}else {
    gameArea.clear();
    //gameBackground.newPos();
    //gameBackground.update();
    gameArea.frameNo += 1;
    gamePiece.newPos();
    gamePiece.update();
    enemyRed.y += 1;
    enemyRed.update();
    enemyGreen.y += 0.5;
    enemyGreen.update();
    enemyPurple.y += 0.7;
    enemyPurple.update();
    enemyChoc.y += 1.4;
    enemyChoc.update();
    playerScore.text = "SCORE: "+gameArea.frameNo;
    playerScore.update();
    }
}


