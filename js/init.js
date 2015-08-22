var loaderBar;
var stage;
var bar;
var imageContainer;
var loaderWidth;
var loaderColor;
var loader;
var canvas;

// grab canvas width and height for later calculations:
var width,
  height;

function init() {
  canvas = document.getElementById("myCanvas");
  stage = new createjs.Stage(canvas);
  stage.enableMouseOver(10);
  width = stage.canvas.width;
  height = stage.canvas.height;

  bar = new createjs.Shape();
  var barHeight = 20;
  loaderColor = createjs.Graphics.getRGB(247, 247, 247);
  bar.graphics.beginFill(loaderColor).drawRect(0, 0, 1, barHeight).endFill();

  imageContainer = new createjs.Container();
  imageContainer.x = 0;
  imageContainer.y = 0;
  stage.addChild(imageContainer);

  loaderWidth = 250;

  var bgBar = new createjs.Shape();
  var padding = 3;
  bgBar.graphics.setStrokeStyle(1).beginStroke(loaderColor).drawRect(-padding / 2, -padding / 2, loaderWidth + padding, barHeight + padding);

  loaderBar = new createjs.Container();
  loaderBar.x = width/2 - loaderWidth/2;
  loaderBar.y = height/2 - barHeight/2;
  loaderBar.addChild(bar, bgBar);

  stage.addChild(loaderBar);

  var manifest = [
    {src: "ground.png", id: "ground"}
  ];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("progress", handleProgress);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "assets/");

  createjs.Ticker.setFPS(30);
}

function handleProgress(event) {
  bar.scaleX = event.loaded * loaderWidth;
}

function handleComplete(event) {

  var groundImg = loader.getResult("ground");
  var ground = new createjs.Shape();
  ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, width, groundImg.height);
  ground.tileW = groundImg.width;
  ground.y = height - groundImg.height;
  stage.addChild(ground);


  loaderBar.visible = false;
  stage.update();
}