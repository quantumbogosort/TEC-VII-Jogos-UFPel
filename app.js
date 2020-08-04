const display = document.getElementById('display');

// const app = new PIXI.Application({
//     view: display,
//     width: 512,
//     height: 512
// });
let _w = window.innerWidth;
let _h = window.innerHeight;

const renderer = new PIXI.Renderer({
    view: display,
    width: _w,
    height: _h,
    resolution: window.devicePixelRatio,
    autoDensity: true
});

window.addEventListener('resize', resize);

function resize() {
    _w = window.innerWidth;
    _h = window.innerHeight;

    renderer.resize(_w, _h);
}

const stage = new PIXI.Container();
const starship_texture = PIXI.Texture.from('images/starship.png');
const explosion_texture = PIXI.Texture.from('images/explosion.png');
const rock_texture = PIXI.Texture.from('images/rock.png');
const starship = new PIXI.Sprite(starship_texture);
const bullet = PIXI.Texture.from('images/bullet.png');

starship.x = renderer.screen.width / 2;
starship.y = renderer.screen.height / 2 + 260;

starship.scale.set(0.5, 0.5);
starship.anchor.set(0.5, 0.5);

stage.addChild(starship);

stage.interactive = true;

document.addEventListener('keydown', movement);

var bullets = [];
var enemies = [];
var bulletSpeed = 0.1;
var enemySpeed = 0.05;

var endGame = false;

const ticker = new PIXI.Ticker();

function movement(key) {
    if(endGame){
        return;
    }

    // W Key is 87 and Up arrow is 87
    if (key.keyCode === 87 || key.keyCode === 38) {
        if (starship.y != 0) {
            // Don't move up if the player is at the top of the stage
            starship.y -= 32;
        }
    }

    // S Key is 83 and Down arrow is 40
    if (key.keyCode === 83 || key.keyCode === 40) {
        if (starship.y != renderer.height - 1) {
            // Don't move down if the player is at the bottom of the stage
            starship.y += 32;
        }
    }

    // A Key is 65 and Left arrow is 37
    if (key.keyCode === 65 || key.keyCode === 37) {
        if (starship.x != 0) {
            // Don't move to the left if the player is at the left side of the stage
            starship.x -= 32;
        }
    }

    // D Key is 68 and Right arrow is 39
    if (key.keyCode === 68 || key.keyCode === 39) {
        if (starship.x != renderer.width - 32) {
            // Don't move to the right if the player is at the right side of the stage
            starship.x += 32;
        }
    }

    // Space Key is 32
    if (key.keyCode === 32) {
        shoot(starship.x, starship.y);
    }
}

function shoot(x, y) {
    var bullet_item = new PIXI.Sprite(bullet);

    bullet_item.scale.set(0.05)

    bullet_item.x = starship.x;
    bullet_item.y = starship.y;
    
    bullet_item.anchor.set(0.5, 0.5);
    
    stage.addChild(bullet_item);
    bullets.push(bullet_item);
}

function enemy() {
    var enemy = new PIXI.Sprite(rock_texture);

    enemy.scale.set(0.5)

    enemy.x = starship.x;
    enemy.y = starship.y - 450;
    
    enemy.anchor.set(0.5, 0.5);
    enemy.rotation += 380;
    
    stage.addChild(enemy);
    enemies.push(enemy);
}

enemy();
ticker.add(animate);
ticker.start();

function animate() {
    requestAnimationFrame(animate);

    for (var b = bullets.length - 1; b >= 0; b--) {
        if (bullets[b] != undefined) {
            bullets[b].y -= bulletSpeed;
            if (bullets[b].y < -50) {
                delete bullets[b];
            }
        }
    }

    for (var b = enemies.length - 1; b >= 0; b--) {
        if (enemies[b] != undefined) {
            enemies[b].y += enemySpeed;

            if (enemies[b].y >= starship.y - 40) {
                enemies[b].texture = explosion_texture;
                starship.texture = explosion_texture;
                delete enemies[b];
                endGame = true;
            }

            if (enemies[b].y > 700) {
                delete enemies[b];
            }
        }
    }
    // render the container
    renderer.render(stage);
}
