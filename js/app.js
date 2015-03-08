//function to return a random speed
var newSpeed = function () {
    return 150 + Math.random() * 230
    }

//funtion to return random lane
var newLane = function () {
    return 55 + (Math.floor(Math.random() * 3) * 83)
    }

//start position for any player (not currently used)
var startPosPlayer = [505/2 - 50, 55 + 83*4]
    
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
    // console.log(this.x);
    // console.log(this.y);
    // the speed of movement is randomised using the newSpeed function. The velocity will be applied to the 
    // x coord of the location when the update function is called.
    this.vel = newSpeed();
        
}
\`   
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// player always starts in the same place, but that location 
// changes so it can't be part of the prototype object.
// it is rendered the same way as the Enemy, and 
var Player = function() {

    this.sprite = 'images/char-horn-girl.png';
    this.x = 2*101;
    this.y = 387;
    
    }
    
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    // check for collisions and winning; movement is
    // handled by handleInput. Need to check for win before render or 
    // the sprite's hair gets printed over the water forever
Player.prototype.update = function() {
    return null
    }

    // handleInput adds or subtracts from x and y based on input, but also will not let the sprite move off the board.
Player.prototype.handleInput = function(keystroke) {
    if (keystroke == 'up' && this.y > -28) {this.y = this.y - 83};
    if (keystroke == 'down' && this.y < 387) {this.y = this.y + 83};
    if (keystroke == 'left' && this.x > 0) {this.x = this.x - 101};
    if (keystroke == 'right' && this.x < 101*4) {this.x = this.x + 101};
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
