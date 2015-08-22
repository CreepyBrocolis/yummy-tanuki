function ParallaxeObject(container, width, sprite, position, movementSpeed) {
  var sprite1 = new createjs.Bitmap(sprite);
  sprite1.yPosition = position;
  sprite1.y = sprite1.yPosition + camera.yPosition;
  sprite1.xPosition = 0;
  sprite1.x = sprite1.xPosition + camera.xPosition;

  var sprite2 = sprite1.clone();
  sprite2.xPosition = width;
  sprite2.x = sprite2.xPosition + camera.xPosition;
  sprite2.yPosition = position;
  sprite2.y = sprite2.yPosition + camera.yPosition;

  console.log(sprite2);

  container.addChild(sprite1, sprite2);

  function move(sprite, deltaS) {
    sprite.xPosition = sprite.xPosition - deltaS * movementSpeed;
    if (sprite.xPosition + sprite.image.width <= 0) {
      sprite.xPosition = width;
    }

    sprite.x = sprite.xPosition + camera.xPosition;
    sprite.y = sprite.yPosition + camera.yPosition * (movementSpeed/100);

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