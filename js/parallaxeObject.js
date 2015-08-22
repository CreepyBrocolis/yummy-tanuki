function ParallaxeObject(container, width, sprite, position, movementSpeed) {
  var sprite1 = new createjs.Bitmap(sprite);
  sprite1.xPosition = 0;
  sprite1.yPosition = position;
  sprite1.x = sprite1.xPosition - camera.xPosition;
  sprite1.y = sprite1.yPosition - camera.yPosition;

  var sprite2 = sprite1.clone();
  sprite2.xPosition = width;
  sprite2.x = sprite2.xPosition - camera.xPosition;

  container.addChild(sprite1, sprite2);

  function move(sprite, deltaS) {
    sprite.xPosition = sprite.xPosition - deltaS * movementSpeed;
    sprite.x = sprite.xPosition - camera.xPosition;
    sprite.y = sprite.yPosition - camera.yPosition;
    if (sprite.x + sprite.image.width * sprite.scaleX <= 2) {
      sprite.x = width;
    }
  }

  var tick = function (deltaS) {
    move(sprite1, deltaS);
    move(sprite2, deltaS);
  };

  var setAlpha = function (alpha) {
    sprite1.alpha = alpha;
    sprite2.alpha = alpha;
  };

  return {
    tick: tick,
    setAlpha: setAlpha
  };
}