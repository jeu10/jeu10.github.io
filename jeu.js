myObstacleCl()

var myGamePiece;
var myBackground;
var myObstacle1;
var myObstacle2;
var myObstacle3;
var myObstacle4;
var myObstacle5;
var myObstacle6;
var nbpts = 0;
var timeini = 0;
var scoreHisto = [];
var bk = "";
h = ()=>(Math.random()*230);

function myObstacleCl(bk){
    var cl = ""
    if(bk == "image/bk1.jpg"){cl = "#A02323"}
    else if(bk == "image/bk2.jpeg"){cl = "#0ECBD2"}
    else if(bk == "image/bk3.jpg"){cl = "chartreuse"}
    else if(bk == "image/bk4.jpg"){cl = "#981B1B"}
    return cl
    }

la = ()=>(Math.random()*30+30);
lg = ()=>(Math.random()*30+30);
tps = () =>(0.95**nbpts*20)  ;
listBk = ["image/bk1.jpg","image/bk2.jpeg","image/bk3.jpg","image/bk4.jpg"];



document.getElementById("restart").addEventListener("click",function(){bk = listBk[Math.floor(Math.random()*listBk.length)];startGame()})


function startGame() {
    bk = listBk[Math.floor(Math.random()*listBk.length)];
    timeini = performance.now();
    myGamePiece = new content(30, 30, "#2ECC71", 100, 0, "piece");
    myBackground = new background(800, 270, bk, 0, 0, "background");
    myObstacle1 = new content(la(),lg(), myObstacleCl(bk), 240,h(), "myObstacle")
    myObstacle2 = new content(la(),lg(), myObstacleCl(bk), 353,220, "myObstacle")
    myObstacle3 = new content(la(),lg(), myObstacleCl(bk), 466,h(), "myObstacle")
    myObstacle4 = new content(la(),lg(), myObstacleCl(bk), 580,h(), "myObstacle")
    myObstacle5 = new content(la(),lg(), myObstacleCl(bk), 693,0, "myObstacle")
    myObstacle6 = new content(la(),lg(), myObstacleCl(bk), 710,h(), "myObstacle")
    myGameArea.start();
    nbpts = 0;
}


document.addEventListener("keydown",function(){
  move('up')
  if(!myGameArea.run){
    startGame()
  }
})

document.addEventListener("ontouchstart",function(){
  move('up')
  if(!myGameArea.run){
    startGame()
  }
})
document.addEventListener("keyup",function(){
  move('down')
})
document.addEventListener("ontouchend",function(){
  move('down')
})

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 680;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.run = true;
        NextFrame()

        //this.interval = setTimeout(function(){updateGameArea();setTimeout(this.interval(),tps())}, tps());
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      this.run = false;
        //clearInterval(this.interval);
    }
}

function NextFrame(){
  if(myGameArea.run){
  setTimeout(function(){
    updateGameArea();
    NextFrame();
  },tps())
}
}

myGameArea.canvas.addEventListener("click",function(){bk = listBk[Math.floor(Math.random()*listBk.length)];console.log(bk);startGame()})
function background(width, height, color, x, y, type) {
    this.type = type;
    this.image = new Image();
    this.image.src = color;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y,this.width, this.height);
        ctx.drawImage(this.image,
                this.x + this.width,
                this.y,
                this.width, this.height);
}
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    }
}
function content(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.fillSyle = color;
    //if(this.type == 'myObstacle')

    this.update = function() {
  ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    if(type == "piece"){
      this.gravity = 0.15;
      this.gravitySpeed = 0;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        if(this.y <0){
          this.y=0;
          this.speedY = -this.gravitySpeed;
        }
        this.hitBottom();
      }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height - 18;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            this.speedY = 0;
          }
      }
    }
    else {
    // this.image = new Image();
    // this.image.src = color;
    // this.x > 0
  }




    this.crashWith = function(otherobjarr) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var crashtot = false;
    for(var otherobj of otherobjarr){
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
      crashtot = crashtot||crash
    }
    return crashtot;
  }
}



//function obstacle(width, height, color, x, y) {
  //this.width = width;
//  this.height = height;
//  this.speedY = 0;
//  this.y = y;
//  this.update = function() {
//    ctx = myGameArea.context;
//    ctx.fillStyle = color;
//    ctx.fillRect(this.x, this.y, this.width, this.height);
//  this.newPos = function() {
//    this.x += this.speedX;
  //  this.y += this.speedY;
//  }
//  this.crashWith = function(otherobj) {
//    var myleft = this.x;
//    var myright = this.x + (this.width);
//    var mytop = this.y;
//    var mybottom = this.y + (this.height);
//    var otherleft = otherobj.x;
//    var otherright = otherobj.x + (otherobj.width);
//    var othertop = otherobj.y;
//    var otherbottom = otherobj.y + (otherobj.height);
//    var crash = true;
  //  if ((mybottom < othertop) ||
  //  (mytop > otherbottom) ||
  //  (myright < otherleft) ||
  //  (myleft > otherright)) {
  //    crash = false;
  //  }
//    return crash;
//  }
//}



function updateGameArea() {
  if (myGamePiece.crashWith([myObstacle1,myObstacle2,myObstacle3,myObstacle4,myObstacle5,myObstacle6])) {
    myGameArea.stop();
    console.log("Tu as gagné ",nbpts," points")
    var li = document.createElement('li');
    li.innerHTML = ""+nbpts;
    scoreHisto.push(nbpts);
    document.getElementById("scoreMax").innerHTML = "Score Max = "+Math.max(...scoreHisto)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    document.getElementById("scoreMoyen").innerHTML = "Moyenne = "+(scoreHisto.reduce(reducer)/scoreHisto.length);
    document.getElementById("Nbparties").innerHTML = "Nb paties = "+(scoreHisto.length);
    document.getElementById("historiqueScores").insertBefore(li,document.getElementById("historiqueScores").firstChild);


    nbpts = 0


  } else {
    if(myObstacle1.x<0){
    myObstacle1 = new content(la(),lg(), myObstacleCl(bk), 680,h(), "myObstacle")
    nbpts += 1;
  }
  if(myObstacle2.x<0){
    myObstacle2 = new content(la(),lg(), myObstacleCl(bk), 680,220, "myObstacle")
    nbpts += 1;
  }
  if(myObstacle3.x<0){
    myObstacle3 = new content(la(),lg(), myObstacleCl(bk), 680,h(), "myObstacle")
    nbpts += 1;
  }
  if(myObstacle4.x<0){
    myObstacle4 = new content(la(),lg(), myObstacleCl(bk), 680,h(), "myObstacle")
    nbpts += 1;
  }
  if(myObstacle5.x<0){
    myObstacle5 = new content(la(),lg(), myObstacleCl(bk), 680,0, "myObstacle")
    nbpts += 1;
  }
  if(myObstacle6.x<0){
    myObstacle6 = new content(la(),lg(), myObstacleCl(bk), 680,h(), "myObstacle")
    nbpts += 1;
  }

    document.getElementById("score").innerHTML = "score:"+nbpts;
    myGameArea.clear();
    myBackground.speedX = -1;
    myObstacle1.x += -2;
    myObstacle2.x += -2;
    myObstacle3.x += -2;
    myObstacle4.x += -2;
    myObstacle5.x += -2;
    myObstacle6.x += -2;
    myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
    myObstacle1.update();
    myObstacle2.update();
    myObstacle3.update();
    myObstacle4.update();
    myObstacle5.update();
    myObstacle6.update();
  }


}

function move(dir) {
    //myGamePiece.image.src = "angry.gif";
    if (dir == "up") {myGamePiece.speedY += -10; }

}

function clearmove() {
    //myGamePiece.image.src = "smiley.gif";
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
