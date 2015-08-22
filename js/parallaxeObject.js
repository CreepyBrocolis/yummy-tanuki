function ParallaxeObject(container, width, sprite, position, movementSpeed) {

  var sprite1 = new createjs.Bitmap(sprite);
  sprite1.y = position;
  sprite1.yPosition = position;

  var sprite2 = sprite1.clone();
  sprite2.x = width;
  sprite2.yPosition = position;

  container.addChild(sprite1, sprite2);

  function move(sprite, distance) {
    sprite.x = sprite.x - distance * movementSpeed;

    if (sprite.x + width <= 0) {
      sprite.x = width;
    }

    if (sprite.x > width) {
      sprite.x = -width;
    }
  }

  var tick = function (distance, right) {
    distance = right ? distance : -distance;
    move(sprite1, distance);
    move(sprite2, distance);
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