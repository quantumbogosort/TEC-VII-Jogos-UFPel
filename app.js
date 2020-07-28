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

img.scale.set(0.5, 0.5);
img.anchor.set(0.5, 0.5);

stage.addChild(img);

const ticker = new PIXI.Ticker();
ticker.add(animate);
ticker.start();

function animate(){
    img.x = renderer.screen.width / 2;
    img.y = renderer.screen.height / 2;
    img.rotation += 0.01;
    renderer.render(stage);
}
