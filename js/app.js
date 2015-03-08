// initiating some simple variables to allow tweaking and tailoring, and also to ensure precision in placing sprites

var squareHeight = 83,
    spriteZero = -28,
    squareWidth = 101,
    charMargin = 20;
//start position for any player (not currently used)

// this is a simple object that keeps track of scores, enables a win condition etc. The player resets itself when
var score = {
    points: 0,
    message: "",
    increase: function() {
        score.points += 1;
        score.message = "";
        if (score.points > 9) {
            score.message = "You win!";
            score.points = 0
        }
    },
    decrease: function() {
        score.message = "";
        if (score.points > 0) {
            score.points -= 1
        }
    },
    render: function() {
        ctx.font = "30px Arial";
        ctx.fillText(score.message, 20, 550);
        ctx.fillText(score.points, 450, 550);
        ctx.strokeText(score.message, 20, 550);
        ctx.strokeText(score.points, 450, 550);
    }
}


console.log("check");

var startPosPlayer = [2 * squareWidth, spriteZero + squareHeight * 5]

//function to return a random speed
var newSpeed = function () {
    return 150 + Math.random() * 230
    }

//funtion to return random lane
var newLane = function () {
    return spriteZero + squareHeight + (Math.floor(Math.random() * 3) * squareHeight)
    }

// the drawing of the board and movement of the pieces is determined by the width of the images (101) and height of the rows (83).
// in addition, to get the pieces to land correctly on the squares, they need to have a y offset of -28 compared to the location of the squares.


console.log("check2");
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // the location of the bug when it's rendered; the starting position 
    // will be determined when the enemies are initiated. 
    this.x = Math.random()*505;
    this.y = newLane();
    console.log(this.x);
    console.log(this.y);
    // the speed of movement is randomised using the newSpeed function. The velocity will be applied to the 
    // x coord of the location when the update function is called.
    this.vel = newSpeed();
        
}

console.log("check3");

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // movement is determined by each enemy's velocity times the dt value to compensate for system run speed.
    // need to make sure a value is passed here or else undefined will be returned.
    var move = this.vel;
    if (dt != null) {
        var move = this.vel * dt; // not yet implemented dt so this will help me compensate for that.
    }
    // movement gets added to the x position, however if this results in the bug 
    // moving off the screen, it should go back to the other side, and choose
    // a random lane to start in. It should also change it's speed to between 150 and 350
    this.x = this.x + move;
    if (this.x > 505) {
        this.x = -101;
        this.y = newLane()
        this.vel = 120 + Math.random() * 200 
    }
}

console.log("check4");

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// player always starts in the same place, but that location 
// changes so it can't be part of the prototype object.
// it is rendered the same way as the Enemy, but I don't think 
// that's a good enough reason to make it a subclass.
var Player = function() {

    this.sprite = 'images/char-horn-girl.png';
    this.x = 2*squareWidth;
    this.y = spriteZero + squareHeight * 5; 

    }
    
console.log("check5");
    
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    // check for collisions and winning; movement is
    // handled by handleInput. Sprite is narrower than bug; need to compensate for that when measuring collision.
    // problem: if i try to use allEnemies.forEach, suddenly this refers to allEnemies instead of the player
    // Do I solve this by putting the update function in the enemy update, or do I write a seperate collision function? Can I pass this as an arguement to a function?
    // probably best to have a collision function in the engine and apply it as Collision(enemy.y, player.y) under the general update.
Player.prototype.update = function() {
    /* allEnemies.forEach(function(enemy) {
        // console.log(this.y);
        if (this.y == enemy.y) {
            // console.log("equal y " + enemy.y);
            if ((this.x < enemy.x + squareWidth - charMargin) && (this.x > enemy.x - squareWidth + charMargin)) {
                // console.log("equal x");
                this.x = 2*squareWidth;
                this.y = spriteZero + squareHeight * 5; 
                score += 1;
                console.log(score);
                }
            }
        }
    )*/
        if (this.y < 0) {
            score.increase();
            this.x = 2*squareWidth;
            this.y = spriteZero + squareHeight * 5; 
        }
    };

console.log("check6");

    // handleInput adds or subtracts from x and y based on input, but also will not let the sprite move off the board.
Player.prototype.handleInput = function(keystroke) {
    if (keystroke == 'up' && this.y > -28) {this.y = this.y - 83};
    if (keystroke == 'down' && this.y < 387) {this.y = this.y + 83};
    if (keystroke == 'left' && this.x > 0) {this.x = this.x - 101};
    if (keystroke == 'right' && this.x < 101*4) {this.x = this.x + 101};
    console.log("Player");
    console.log(this.x);
    console.log(this.y);
    }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

allEnemies.push(new Enemy()); 
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

// when instantiating the enemies, they should be given a set value from one of the 3 lanes
// for y, and a random value between 0 and canvas.width for their starting point.
// Unlike normal frogger, the bare minimum rules for this game do not require groups
// of enemies moving together, and they can overrun each other.
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var collisionCheck = function(enemy, player) {
    if (player.y == enemy.y) {
        // console.log("equal y " + enemy.y);
        if ((player.x < enemy.x + squareWidth - charMargin) && (player.x > enemy.x - squareWidth + charMargin)) {
            // console.log("equal x");
            player.x = 2*squareWidth;
            player.y = spriteZero + squareHeight * 5; 
            score.decrease();
        }
    }
}