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
    {src: "grapple-head.png", id: "grapple"},
    {src: "broco.png", id: "broco"}
  ];

  //for (var i = 0; i < 24; ++i) {
  //  manifest.push({src: "testAnim/testAnim.00" + (i < 10 ? "0" : "") + i + ".png", id: "tuxAnim" + i});
  //}

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
  var brocoImg = loader.getResult("broco");

  var sky = new createjs.Bitmap(skyImg);
  stage.addChild(sky);

  buildings = ParallaxeObject(stage, width, buildingImg, 20 - groundImg.height, 4);
  buildings.setAlpha(0.3);

  buildings2 = ParallaxeObject(stage, width, buildingImg, -groundImg.height, 10);

  hill = ParallaxeObject(stage, width, hillImg, height - groundImg.height - hillImg.height, 25);

  var ground = new createjs.Shape();
  ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, width, groundImg.height);
  ground.tileW = groundImg.width;
  ground.y = height - groundImg.height;
  stage.addChild(ground);

  var spriteSheetBuilder = new createjs.SpriteSheetBuilder();
  spriteSheetBuilder.addFrame(new createjs.Bitmap(brocoImg));
  spriteSheetBuilder.addFrame(new createjs.Bitmap(brocoImg));
  spriteSheetBuilder.addAnimation("stand", [0, 1]);
  var spriteSheet = spriteSheetBuilder.build();

  brocoli = Brocoli(stage, spriteSheet, grappleImg);
  brocoli.setY(height - groundImg.height);

  //var tuxSpriteImgs = [];
  //for (var i = 0; i < 24; ++i) {
  //  tuxSpriteImgs.push(loader.getResult("tuxAnim" + i));
  //}
  //
  //var spriteSheetBuilder = new createjs.SpriteSheetBuilder();
  //tuxSpriteImgs.forEach(function (img) {
  //  spriteSheetBuilder.addFrame(new createjs.Bitmap(img));
  //});
  //
  //spriteSheetBuilder.addAnimation("stand", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  //var spriteSheet = spriteSheetBuilder.build();

  stage.addEventListener("click", brocoli.grapple);
  //dispatcher.addEventListener("startMoveRight", brocoli.startMoveRight);
  //dispatcher.addEventListener("startMoveLeft", brocoli.startMoveLeft);
  //dispatcher.addEventListener("stopMove", brocoli.stopMove);

  loaderBar.visible = false;
  stage.update();

  createjs.Ticker.setFPS(30);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
  var deltaS = event.delta / 1000;
  //var position = grant.x + 150 * deltaS;
  //
  //var grantW = grant.getBounds().width * grant.scaleX;
  //grant.x = (position >= w + grantW) ? -grantW : position;
  //
  //ground.x = (ground.x - deltaS * 150) % ground.tileW;
  //hill.x = (hill.x - deltaS * 30);
  //if (hill.x + hill.image.width * hill.scaleX <= 0) {
  //  hill.x = w;
  //}

  hill.tick(deltaS);
  buildings.tick(deltaS);
  buildings2.tick(deltaS);
  brocoli.tick(deltaS);

  stage.update(event);
}
