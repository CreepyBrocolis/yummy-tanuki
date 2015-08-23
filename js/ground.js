function Ground(stage, groundImg) {
  var ground = new createjs.Shape();
  ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, width, groundImg.height);
  ground.tileW = groundImg.width;
  ground.y = height - groundImg.height;
  ground.yPosition = ground.y;
  stage.addChild(ground);

  function tick() {
    ground.y = ground.yPosition - camera.yPosition;
  }

  return {
    tick: tick
  }
}