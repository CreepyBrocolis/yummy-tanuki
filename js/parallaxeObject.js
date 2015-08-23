function ParallaxeObject(container, width, sprite, position, movementSpeed) {

  var sprite1 = new createjs.Bitmap(sprite);
  sprite1.y = position;
  sprite1.xPosition = 0;
  sprite1.yPosition = position;

  var sprite2 = sprite1.clone();
  sprite2.x = width;
  sprite2.xPosition = width;
  sprite2.yPosition = position;

  container.addChild(sprite1, sprite2);

  function move(sprite) {
    sprite.xPosition = sprite.xPosition - camera.xPosition * movementSpeed;

    var value = sprite.xPosition + width;

    if (value <= 0) {
      sprite.xPosition = width + value;
    }

    if (sprite.xPosition > width) {
      sprite.xPosition = (sprite.xPosition - width) - width;
    }

    sprite.x = sprite.xPosition;

    sprite.y = sprite.yPosition - camera.yPosition * movementSpeed;
  }

  var tick = function () {
    move(sprite1);
    move(sprite2);
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