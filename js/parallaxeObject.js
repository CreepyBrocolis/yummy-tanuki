function ParallaxeObject(container, width, sprite, position, movementSpeed) {
  var sprite1 = new createjs.Bitmap(sprite);
  sprite1.y = position;

  var sprite2 = sprite1.clone();
  sprite2.x = width;

  container.addChild(sprite1, sprite2);

  function move(sprite, deltaS) {
    sprite.x = (sprite.x - deltaS * movementSpeed);
    if (sprite.x + sprite.image.width <= 0) {
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