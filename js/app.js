// initiating some simple variables to allow tweaking and tailoring, and also to ensure precision in placing sprites
// the drawing of the board and movement of the pieces is determined by the width of the images (101) and height of the rows (83).
// in addition, to get the pieces to land correctly on the squares, they need to have a y offset of -28 compared to the location of the squares.

// Important: for all the placing of sprites the board is effectively 10 as an additional row is added to make the top of the board tidy.
// TODO: link this object into the engine. Might not be worth it as the layout of the board still have to include the list of images per row.
// Might be worth having a level object that holds all of the board settings.
var boardSize = {x:8, y:11},
    squareHeight = 83,
    spriteZero = -28,
    squareWidth = 101,
    charMargin = 20;

// calculate the normal player starting position based on the values above.
var startX = Math.floor(boardSize.x / 2) * squareWidth;
var startY = spriteZero + (squareHeight * (boardSize.y-2));

// this is a simple object that keeps track of scores, enables a win condition etc.
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
        ctx.font = "700 30px Arial";
        ctx.fillStyle = "violet";
        ctx.lineWidth = 2;
        ctx.fillText(score.message, 20, 750);
        ctx.fillText(score.points, 753, 750);
        ctx.strokeText(score.message, 20, 750);
        ctx.strokeText(score.points, 753, 750);
    }
}

// function to return a random speed
// argument 'direction' should be 1 for right and -1 for left
var newSpeed = function (direction) {
    return (150 + Math.random() * 230) * direction 
}

//funtion to return random lane. Argument 'lanes' should be either 'top' for the top three lanes, or 'bottom' for the bottom three.
var newLane = function (lanes) {
    if (lanes == "top") {
        return spriteZero + squareHeight + (Math.floor(Math.random() * 3) * squareHeight)
    } 
    else { 
        return spriteZero + squareHeight + ((Math.floor(Math.random() * 3) + 4) * squareHeight)
    }
}

// Enemies our player must avoid
var Enemy = function(lanes, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // lanes and direction are added to allow bugs to be placed in the correct formation in current the 2-road setup.
    // lanes are top or bottom, which lets the randomise function place them into their correct group when spawning or leaving the screen.
    // The lanes value is also added to a string to corectly select the bug image that faces the right way.
    // direction is either 1 or -1, and is used as a multiplier for the velocity to make the bugs go the other way
    // TODO: since lanes and direction are explicitly linked, reduce this to one value. Possibly.
    this.lanes = lanes;
    this.direction = direction;
    
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-' + this.lanes + ".png";
    
    // the location of the bug when it's rendered; the starting position 
    // will be determined when the enemies are initiated. 
    this.x = Math.random()*808;
    this.y = newLane(this.lanes);
    console.log(this.x);
    console.log(this.y);
    // the speed of movement is randomised using the newSpeed function. The velocity will be applied to the 
    // x coord of the location when the update function is called.
    this.vel = newSpeed(this.direction);
        
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // movement is determined by each enemy's velocity times the dt value to compensate for system run speed.
    // need to make sure a value is passed here or else undefined will be returned.
    var move = this.vel * dt; 

    // movement gets added to the x position, however if this results in the bug 
    // moving off the screen, it should go back to the other side, and choose
    // a random lane to start in. It should also change it's speed to between 150 and 350
    this.x = this.x + move;
    if (this.x > 808) {
        this.x = -101;
        this.y = newLane(this.lanes);
        this.vel = newSpeed(this.direction) 
    };
    if (this.x < -101) {
        this.x = 808;
        this.y = newLane(this.lanes);
        this.vel = newSpeed(this.direction) 
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.save();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore()
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// changed to the horn girl image becuase it's cooler.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = startX;
    this.y = startY; 
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
    
    // check for winning; movement is handled by handleInput. 
Player.prototype.update = function() {
    if (this.y < 0) {
        score.increase();
        this.x = startX;
        this.y = startY; 
    }
};

    // handleInput adds or subtracts from x and y based on input, but also will not let the sprite move off the board.
Player.prototype.handleInput = function(keystroke) {
    if (keystroke == 'up' && this.y > spriteZero) {this.y = this.y - 83};
    if (keystroke == 'down' && this.y < 719) {this.y = this.y + 83};
    if (keystroke == 'left' && this.x > 0) {this.x = this.x - 101};
    if (keystroke == 'right' && this.x < (squareWidth * 7)) {this.x = this.x + 101};
    }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

// using this loop to allow number of enemies spawned to be changed easily.
for (i = 0; i < 4; i++) { 
    allEnemies.push(new Enemy("top", 1)); 
    allEnemies.push(new Enemy("bottom", -1));
};

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
    console.log(e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
});

// this was necessary because trying to put a this.y inside a allEnemies.forEach results in the this referring to allEnemies. Instead,
// this is called during the allEnemies update so that it can refer to the enemy and the player directly. Sprite is narrower than 
// bug; need to compensate for that when measuring collision.
var collisionCheck = function(enemy, player) {
    if (player.y == enemy.y) {
        if ((player.x < enemy.x + squareWidth - charMargin) && (player.x > enemy.x - squareWidth + charMargin)) {
            player.x = startX;
            player.y = startY; 
            score.decrease();
        }
    }
}
