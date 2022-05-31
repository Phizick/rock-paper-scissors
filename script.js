

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}



function randomRGB() {
  return `rgb(${random(0, 3)},${random(0, 3)},${random(0, 3)})`;
}


function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    
  }

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

var testBall = new Ball(50, 100, 4, 4, 'blue', 10);
testBall.x
testBall.size
testBall.color
testBall.draw()

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

  let balls = [];

  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        let dx = this.x - balls[j].x;
        let dy = this.y - balls[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
       

         
    //     if ((distance < this.size + balls[j].size) && ((balls[j].color === "green") || (balls[j].color === "blue"))) {
                
    //         balls[j].color = this.color = 'green';
    //     }   else if ((distance < this.size + balls[j].size) && ((balls[j].color === "red") || (balls[j].color === "green"))) {
                
    //         balls[j].color = this.color = 'green';
         
    //       } else if ((distance < this.size + balls[j].size) && ((balls[j].color === "red") || (balls[j].color === "blue"))) {
                
    //         balls[j].color = this.color = 'blue';
    //   }


      if ((distance < this.size + balls[j].size) && ((this.color === "green") && (balls[j].color != "transparent"))) {
                
        this.color = 'transparent';
        if (balls[j].color === 'red') {
            balls[j].color = this.color = 'blue'
        }

    }   else if ((distance < this.size + balls[j].size) && ((this.color === "red") && (balls[j].color != "transparent"))) {
            
        this.color = 'transparent';
        if (balls[j].color === 'blue') {
            balls[j].color = this.color = 'green'
        }
     
      } else if ((distance < this.size + balls[j].size) && ((this.color === "blue") && (balls[j].color != "transparent"))) {
            
        this.color = 'transparent'; 
       if (balls[j].color === 'green') {
        balls[j].color = this.color = 'red'
  }
}

    }
    }
}
        
  


//   red > green
//   green > blue
//   blue > red

  function colored(l) {
      if (l === 0) {
          return "red"
        } else if (l === 1) {
            return "blue"
        }else if (l === 2) {
            return "green"
        }
        return
        }
  


  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, width, height);
  
    while (balls.length < 150) {
      let ball = new Ball(
        random(0,width),
        random(0,height),
        random(-7,7),
        random(-7,7),
        colored(random(0,2)),
        random(10,20)
      );
      balls.push(ball);
    }

  
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop);
  }

  loop()

