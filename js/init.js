var loaderBar;
var stage;
var bar;
var imageContainer;
var loaderWidth;
var loaderColor;
var preload;
var canvas;

function init() {
  canvas = document.getElementById("myCanvas");
  stage = new createjs.Stage(canvas);
  stage.enableMouseOver(10);

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
  loaderBar.x = canvas.width/2 - loaderWidth/2;
  loaderBar.y = canvas.height/2 - barHeight/2;
  loaderBar.addChild(bar, bgBar);

  stage.addChild(loaderBar);

  var manifest = [
    {src: "image0.jpg", id: "image0"},
    {src: "image1.jpg", id: "image1"},
    {src: "image2.jpg", id: "image2"},
    {src: "image3.jpg", id: "image3"}
  ];

  preload = new createjs.LoadQueue(true, "test/");

  // Use this instead to use tag loading
  //preload = new createjs.PreloadJS(false);

  preload.on("progress", handleProgress);
  preload.on("complete", handleComplete);
  preload.on("fileload", handleFileLoad);
  preload.loadManifest(manifest, true, "assets/");

  createjs.Ticker.setFPS(30);
}

function handleProgress(event) {
  bar.scaleX = event.loaded * loaderWidth;
}

function handleFileLoad(event) {
  var image = event.result;
  var w = image.width * 0.10;
  var h = image.height * 0.10;

  var bmp = new createjs.Bitmap(image).set({
    scaleX: 0.10, scaleY: 0.10,
    regX: w / 2, regY: h / 2,
    rotation: Math.random() * 16 - 8,
    cursor: "pointer",
    x: canvas.width/2 - w/2, y: canvas.height/2 - h/2
  });

  var container = new createjs.Container();
  container.addChild(bmp);
  imageContainer.addChild(container);
  stage.update();
}

function handleComplete(event) {
  loaderBar.visible = false;
  stage.update();
}