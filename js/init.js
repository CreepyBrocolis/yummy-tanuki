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
  loaderBar.x = width / 2 - loaderWidth / 2;
  loaderBar.y = height / 2 - barHeight / 2;
  loaderBar.addChild(bar, bgBar);

  stage.addChild(loaderBar);

  var manifest = [
    {src: "ground.png", id: "ground"}
  ];

  for (var i = 0; i < 24; ++i) {
    manifest.push({src: "testAnim/testAnim.00" + (i < 10 ? "0" : "") + i + ".png", id: "tuxAnim" + i});
  }

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("progress", handleProgress);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "assets/");

  createjs.Ticker.setFPS(30);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
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

  var tuxSpriteImgs = [];
  for (var i = 0; i < 24; ++i) {
    tuxSpriteImgs.push(loader.getResult("tuxAnim" + i));
  }

  var spriteSheetBuilder = new createjs.SpriteSheetBuilder();
  tuxSpriteImgs.forEach(function (img) {
    spriteSheetBuilder.addFrame(new createjs.Bitmap(img));
  });

  spriteSheetBuilder.addAnimation("stand", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  var spriteSheet = spriteSheetBuilder.build();

  var brocoli = Brocoli(spriteSheet);
  stage.addChild(brocoli);

  loaderBar.visible = false;
  stage.update();
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
  //hill2.x = (hill2.x - deltaS * 45);
  //if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
  //  hill2.x = w;
  //}

  stage.update(event);
}