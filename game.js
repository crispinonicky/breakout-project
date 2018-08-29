// console.log("test1");

var canvas = document.getElementById('myCanvas').getContext('2d')

var canvas2 =document.getElementById('myCanvas')

var ballRadius = 10;
var bulletRadius = 7;

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
          if(bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            canvas.beginPath();
            canvas.rect(brickX, brickY, brickWidth, brickHeight)
            // console.log(brickX+ brickY);
            canvas.fillStyle = color
            // canvas.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
            canvas.fill();
            canvas.closePath();
          }
        }
    }
}

function drawOuterBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < outerRowCount; r++) {
      if (outerBricks[c][r].status == 1) {
        var outerBrickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var outerBrickY =
          r * (brickHeight + brickPadding) +
          brickRowCount * (brickPadding + brickHeight) +
          brickOffsetTop;
        outerBricks[c][r].x = outerBrickX;
        outerBricks[c][r].y = outerBrickY;
        canvas.beginPath();
        canvas.rect(outerBrickX, outerBrickY, brickWidth, brickHeight);
        // console.log(brickX+ outerBrickY);
        canvas.fillStyle = "blue";
        // canvas.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        canvas.fill();
        canvas.closePath();
      }
    }
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var color = "#00dd67"
// #00dd67"
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var brick = bricks[c][r];

            if(brick.status ===1){

                if(x > brick.x && x < brick.x+brickWidth && y > brick.y && y < brick.y+brickHeight) {
                  dy = -dy;
                //   yb = -10
                  brick.status = 0
                  score++
                }
                if(bulletX > brick.x && bulletX< brick.x+brickWidth && yb > brick.y && yb < brick.y+brickHeight) {
                //   color = getRandomColor();
                  yb = -20
                  brick.status = 0
                  score++
                }
                  if(score === 48) {
                          alert("YOU WIN, CONGRATULATIONS!");
                          document.location.reload();
                      }
                  // }
              }
        }
    }
}

var counter = 0

function outerCollisionDetection() {


    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < outerRowCount; r++) {
            var outerBrick = outerBricks[c][r];
            if (outerBrick.status === 1) {
                if (
                    x > outerBrick.x &&
                    x < outerBrick.x + brickWidth &&
                    y > outerBrick.y &&
                    y < outerBrick.y + brickHeight
                ) {
                    // color = getRandomColor();
                    dy = -dy;
                    counter++;
                    if (counter % 2 === 0) {
                        outerBrick.status = 0;
                        // redrawBricks();

                        score++;
                        // if(score === outerRowCount*brickColumnCount + outerRowCount*brickColumnCount) {
                            if (score === 48) {
                                alert("YOU WIN, CONGRATULATIONS!");
                                document.location.reload();
                            }
                        }
                    }
            }
        }
    }
}

function drawBall(){

  canvas.beginPath();
  canvas.arc(x, y, ballRadius, 0, Math.PI*2);
  canvas.fillStyle = getRandomColor();
  canvas.fill();
  canvas.closePath();
}
function drawBullet(){
  canvas.beginPath();
  canvas.arc(bulletX, yb, bulletRadius, 0, Math.PI*2);
  canvas.fillStyle = "red";
  canvas.fill();
  canvas.closePath();
}

function drawPaddle() {
    canvas.beginPath();
    canvas.rect(paddleX, canvas2.height-paddleHeight, paddleWidth, paddleHeight);
    canvas.fillStyle = "#0095DD";
    canvas.fill();
    canvas.closePath();
}

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;
var mouseClicked = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click", mouseHandler, false);

function mouseHandler(e){
    if (e.which === 1){
        mouseClicked = true;
    }
}

function keyDownHandler(e) {
    if(e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = true;
    }
    else if(e.keyCode == 37 || e.keyCode === 65) {
        leftPressed = true;
    }else if(e.keyCode === 32 || e.keyCode === 87 || e.keyCode === 83 || e.keyCode === 38 || e.keyCode === 40){
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = false ;

    }
    else if(e.keyCode == 37 || e.keyCode === 65) {
        leftPressed = false;
      
    }
}


function drawScore() {
    canvas.font = "16px Arial";
    canvas.fillStyle = "#0095DD";
    canvas.fillText("Score: "+score, 8, 20);
}


function drawLives() {
    canvas.font = "16px Arial";
    canvas.fillStyle = "#0095DD";
    canvas.fillText("Lives: "+lives, canvas2.width - 65, 20);
}