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

var brocoli,
  hill,
  buildings, buildings2;

var dispatcher = EventDispatcher();

var camera = Camera();

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

  loaderWidth = 300;

  var bgBar = new createjs.Shape();
  var padding = 3;
  bgBar.graphics.setStrokeStyle(1).beginStroke(loaderColor).drawRect(-padding / 2, -padding / 2, loaderWidth + padding, barHeight + padding);

  loaderBar = new createjs.Container();
  loaderBar.x = width / 2 - loaderWidth / 2;
  loaderBar.y = height / 2 - barHeight / 2;
  loaderBar.addChild(bar, bgBar);

  stage.addChild(loaderBar);

  var manifest = [
    {src: "ground.png", id: "ground"},
    {src: "hills.png", id: "hills"},
    {src: "buildings.png", id: "buildings"},
    {src: "sky.png", id: "sky"},
    {src: "grapple-head.png", id: "grapple"}
  ];

  for (var i = 0; i < 30; ++i) {
    manifest.push({src: "iddle/iddle.00" + (i < 10 ? "0" : "") + i + ".png", id: "idle" + i});
  }
  for (i = 0; i < 30; ++i) {
    manifest.push({src: "jump/broco_jump.00" + (i < 10 ? "0" : "") + i + ".png", id: "jump" + i});
  }
  for (i = 0; i < 30; ++i) {
    manifest.push({src: "land/arm.00" + (i < 10 ? "0" : "") + i + ".png", id: "land" + i});
  }

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("progress", handleProgress);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "assets/");
}

function handleProgress(event) {
  bar.scaleX = event.loaded * loaderWidth;
  stage.update();
}

function handleComplete(event) {

  var groundImg = loader.getResult("ground");
  var skyImg = loader.getResult("sky");
  var buildingImg = loader.getResult("buildings");
  var hillImg = loader.getResult("hills");
  var grappleImg = loader.getResult("grapple");

  var sky = new createjs.Bitmap(skyImg);
  stage.addChild(sky);

  buildings = ParallaxeObject(stage, width, buildingImg, 20 - groundImg.height, 0.2);
  buildings.setAlpha(0.3);

  buildings2 = ParallaxeObject(stage, width, buildingImg, -groundImg.height, 0.4);

  hill = ParallaxeObject(stage, width, hillImg, height - groundImg.height - hillImg.height, 0.8);

  var ground = new createjs.Shape();
  ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, width, groundImg.height);
  ground.tileW = groundImg.width;
  ground.y = height - groundImg.height;
  stage.addChild(ground);

  var spriteSheetBuilder = new createjs.SpriteSheetBuilder();
  var spriteFrames = [];
  for (var i = 0; i < 30; ++i) {
    spriteSheetBuilder.addFrame(new createjs.Bitmap(loader.getResult("idle" + i)));
    spriteFrames.push(i);
  }
  spriteSheetBuilder.addAnimation("idle", spriteFrames);

  spriteFrames = [];
  for (i = 0; i < 30; ++i) {
    spriteSheetBuilder.addFrame(new createjs.Bitmap(loader.getResult("jump" + i)));
    spriteFrames.push(30 + i);
  }
  spriteSheetBuilder.addAnimation("jump", spriteFrames, "land");

  spriteFrames = [];
  for (i = 0; i < 30; ++i) {
    spriteSheetBuilder.addFrame(new createjs.Bitmap(loader.getResult("land" + i)));
    spriteFrames.push(60 + i);
  }
  spriteSheetBuilder.addAnimation("land", spriteFrames, "jump");

  var spriteSheet = spriteSheetBuilder.build();

  brocoli = Brocoli(stage, spriteSheet, grappleImg, height - groundImg.height);

  stage.addEventListener("click", brocoli.grapple);
  dispatcher.addEventListener("startMoveRight", brocoli.startMoveRight);
  dispatcher.addEventListener("startMoveLeft", brocoli.startMoveLeft);
  dispatcher.addEventListener("stopMove", brocoli.stopMove);

  loaderBar.visible = false;
  stage.update();

  createjs.Ticker.setFPS(30);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
  var deltaS = event.delta / 1000;

  brocoli.tick(deltaS);

  if (brocoli.isMoving()) {
    var brocoliDistance = deltaS * brocoli.distance();
    hill.tick(brocoliDistance, brocoli.direction());
    buildings.tick(brocoliDistance, brocoli.direction());
    buildings2.tick(brocoliDistance, brocoli.direction());
  }

  stage.update(event);
}
