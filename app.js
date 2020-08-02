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
const texture = PIXI.Texture.from('images/starship.png');
const startship = new PIXI.Sprite(texture);
const bullet = PIXI.Texture.from('images/bullet.png');

startship.x = renderer.screen.width / 2;
startship.y = renderer.screen.height / 2;

startship.scale.set(0.5, 0.5);
startship.anchor.set(0.5, 0.5);

stage.addChild(startship);

stage.interactive = true;

document.addEventListener('keydown', movement);

var bullets = [];
var bulletSpeed = 0.1;

const ticker = new PIXI.Ticker();

function movement(key) {
    // W Key is 87 and Up arrow is 87
    if (key.keyCode === 87 || key.keyCode === 38) {
        if (startship.y != 0) {
            // Don't move up if the player is at the top of the stage
            startship.y -= 32;
        }
    }

    // S Key is 83 and Down arrow is 40
    if (key.keyCode === 83 || key.keyCode === 40) {
        if (startship.y != renderer.height - 1) {
            // Don't move down if the player is at the bottom of the stage
            startship.y += 32;
        }
    }

    // A Key is 65 and Left arrow is 37
    if (key.keyCode === 65 || key.keyCode === 37) {
        if (startship.x != 0) {
            // Don't move to the left if the player is at the left side of the stage
            startship.x -= 32;
        }
    }

    // D Key is 68 and Right arrow is 39
    if (key.keyCode === 68 || key.keyCode === 39) {
        if (startship.x != renderer.width - 32) {
            // Don't move to the right if the player is at the right side of the stage
            startship.x += 32;
        }
    }

    // Space Key is 32
    if (key.keyCode === 32) {
        shoot(startship.x, startship.y);
    }
}

function shoot(x, y) {
    var bullet_item = new PIXI.Sprite(bullet);

    bullet_item.scale.set(0.05)

    bullet_item.x = startship.x;
    bullet_item.y = startship.y;
    
    bullet_item.anchor.set(0.5, 0.5);
    
    stage.addChild(bullet_item);
    bullets.push(bullet_item);
}

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
    // render the container
    renderer.render(stage);
}
