function ParallaxeObject(sprite, width, position, movementSpeed) {
  var sprite1 = new createjs.Bitmap(sprite);
  sprite1.y = position; //height - groundImg.height - sprite1.getBounds().height;

  var sprite2 = sprite1.clone();
  sprite2.x = width;

  var tick = function(deltaS) {
    sprite1.x = (sprite1.x - deltaS * movementSpeed);
    if (sprite1.x + sprite1.image.width * sprite1.scaleX <= 0) {
      sprite1.x = width;
    }

    sprite2.x = (sprite2.x - deltaS * movementSpeed);
    if (sprite2.x + sprite2.image.width * sprite2.scaleX <= 0) {
      sprite2.x = width;
    }
  };

  return {
    bitmap1: sprite1,
    bitmap2: sprite2,
    tick: tick
  };
}