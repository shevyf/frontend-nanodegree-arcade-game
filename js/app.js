// Enemies our player must avoid
var Enemy = function(loc, vel) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // the location of the bug when it's rendered; the starting position 
    // will be determined when the enemies are initiated. 
    this.x = loc[0];
    this.y = loc[1];
    
    // the speed of movement varies depending on which lane the bug is on,
    // so this needs to be determined at the start. this will be applied to the 
    // x coord of the location when the update function is called.
    this.vel = vel;
    
    
}

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
        var move = this.vel * dt;
    }
    // movement gets added to the x position, however if this results in the bug 
    // moving off the screen, it should go back to the other side. 
    this.x = this.x + move;
    if (this.x > 505) {
        this.x = -101;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(loc) {
    this.loc = loc;
    }
    
Player.prototype.render = function() {
    return null
    }
    
Player.prototype.update = function(dt) {
    return null
    }

Player.prototype.handleInput = function() {
    return null
    }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy([0, 300], 100));

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
