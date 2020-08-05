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
const img = new PIXI.Sprite(texture);

img.x = renderer.screen.width / 2;
img.y = renderer.screen.height / 2;

img.scale.set(0.5, 0.5);
img.anchor.set(0.5, 0.5);

stage.addChild(img);

document.addEventListener('keydown', movement);

const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

function animate() {
    // img.rotation += 0.01;
    renderer.render(stage);
}

function movement(key) {
    // W Key is 87
    // Up arrow is 87
    if (key.keyCode === 87 || key.keyCode === 38) {
        // If the W key or the Up arrow is pressed, move the player up.
        if (img.y != 0) {
            // Don't move up if the player is at the top of the stage
            img.y -= 32;
        }
    }

    // S Key is 83
    // Down arrow is 40
    if (key.keyCode === 83 || key.keyCode === 40) {
        // If the S key or the Down arrow is pressed, move the player down.
        if (img.y != renderer.height - 1) {
            // Don't move down if the player is at the bottom of the stage
            img.y += 32;
        }
    }

    // A Key is 65
    // Left arrow is 37
    if (key.keyCode === 65 || key.keyCode === 37) {
        // If the A key or the Left arrow is pressed, move the player to the left.
        if (img.x != 0) {
            // Don't move to the left if the player is at the left side of the stage
            img.x -= 32;
        }
    }

    // D Key is 68
    // Right arrow is 39
    if (key.keyCode === 68 || key.keyCode === 39) {
        // If the D key or the Right arrow is pressed, move the player to the right.
        if (img.x != renderer.width - 32) {
            // Don't move to the right if the player is at the right side of the stage
            img.x += 32;
        }
    }
}
