
const SPEED_LIMIT = 380;
const FIRSTLINEGRASS = 60;
const SECONDLINEGRASS = 140;
const THIRDLINEGRASS = 220;
const VERTICALSPACE = 80;
const HORIZONTALSPACE = 101;
const ENEMYSIZE = 70;

var GameObjects = function(x, y) {
    this.x = x;
    this.y = y;
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    GameObjects.call(this, x, y);
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

Enemy.prototype = Object.create(GameObjects.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //when enemy gets off screen bring it back to the beginning of screen
    this.x = this.x + (this.speed * dt);
    if (this.x >= 500) {
        this.x = -100;
        var ranNum = Math.random();
        //randomly set the y position of enemy, horizontal line (y-axis) is about 80px
        // set a speed limit
        if (ranNum <= 0.33) {
            this.y = FIRSTLINEGRASS;
            this.speed *= 2;
            if (this.speed > SPEED_LIMIT) {
                this.speed /= 3;
            }
        }
        else if (ranNum <= 0.66 && ranNum > 0.33) {
            this.y = SECONDLINEGRASS;
            this.speed *= 2.5;
            if (this.speed > SPEED_LIMIT) {
                this.speed /= 3;
            }
        }
        else if (ranNum > 0.66) {
            this.y = THIRDLINEGRASS;
            this.speed *= 3;
            if (this.speed > SPEED_LIMIT) {
                this.speed /= 3;
            }
        };
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    GameObjects.call(this, x, y);
    this.sprite = "images/char-boy.png";
};

Player.prototype = Object.create(GameObjects.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

};

//draw the player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handles player input by increment or decrement x and y
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= HORIZONTALSPACE;
        if (this.x <= 0) {
            this.x = 0;
        }
    }
//each square is about 101 pixels, move player to right by 101 pixels
    else if (key === 'right') {
        this.x += HORIZONTALSPACE;
        if (this.x >= 400) {
            this.x = 400;
        }
    }
//return player to starting position if it reaches the river
//each square is about 80 pixel (y-axis), move player 80 pixels up
    else if (key === 'up') {
        this.y -= VERTICALSPACE;
        if (this.y == -20) {
            this.x = 200;
            this.y = 380;
        }
    }

    else if (key === 'down') {
        this.y += VERTICALSPACE;
        if (this.y >= 380) {
            this.y = 380;
        }
    }
};

//collision function declared outside of scope to access player and enemy properties
//if the enemy hit the player, return player to starting point
//the bug's horizontal size is about 70pixels
var checkCollisions = function(enemyObject) {
    if (enemyObject.x + ENEMYSIZE > player.x && enemyObject.x - ENEMYSIZE < player.x && enemyObject.y == player.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemy = new Enemy(-100, 60, 280);
var enemy2 = new Enemy(-100, 140, 310);
var enemy3 = new Enemy(-100, 220, 400);
var player = new Player(200, 380);
allEnemies.push(enemy);
allEnemies.push(enemy2);
allEnemies.push(enemy3);


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
