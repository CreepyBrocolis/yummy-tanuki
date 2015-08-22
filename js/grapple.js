function Grapple(stage, img) {
  var grapple = new createjs.Bitmap(img);
  grapple.regX = img.width / 2;
  grapple.regY = img.height / 2;
  stage.addChild(grapple);

  var speed = 200;
  var accelerationVector = {x: speed, y: speed};
  var wantedPos = {x: grapple.x, y: grapple.y};
  var right = true,
    down = true;

  var grappleTo = function (x, y) {
    // Move the sprite from the current position to the new one
    wantedPos.x = x;
    wantedPos.y = y;

    var xDistance = wantedPos.x - grapple.x;
    var yDistance = wantedPos.y - grapple.y;

    right = xDistance > 0;
    down = yDistance > 0;

    accelerationVector.x = speed * Math.abs(xDistance / yDistance);
  };

  var tick = function (deltaS) {
    moveTo(deltaS, accelerationVector, right, down, grapple, wantedPos);

    if (grapple.x === wantedPos.x && grapple.y === wantedPos.y) {
      dispatcher.dispatchEvent("GRAPPLE_OK");
    }
  };

  return {
    x: function () {
      return grapple.x;
    },
    y: function () {
      return grapple.y
    },
    grapple: grappleTo,
    tick: tick,
    toggleHide: function() {
      grapple.visible = ! grapple.visible;
    }
  }
}