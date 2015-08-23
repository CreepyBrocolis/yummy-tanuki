function Grapple(stage, img) {
  var grapple = new createjs.Bitmap(img);
  grapple.regX = img.width / 2;
  grapple.regY = img.height / 2;
  stage.addChild(grapple);

  var movingBack = false;
  var speed = 1200;
  var wantedPos = {x: grapple.x, y: grapple.y};

  var grappleTo = function (x, y, fromX, fromY) {
    movingBack = false;
    grapple.x = fromX;
    grapple.y = fromY;
    // Move the sprite from the current position to the new one
    wantedPos.x = x;
    wantedPos.y = y;

    var xDistance = wantedPos.x - grapple.x;
    var yDistance = wantedPos.y - grapple.y;

    grapple.rotation = -radToDeg * Math.atan2(xDistance, yDistance);
  };

  var tick = function (deltaS) {
    moveTo(deltaS, grapple, wantedPos, speed);

    if (grapple.x === wantedPos.x && grapple.y === wantedPos.y) {
      dispatcher.dispatchEvent(movingBack ? "GRAPPLE_BACK" : "GRAPPLE_OK");
    }
  };

  var back = function (x, y) {
    movingBack = true;
    wantedPos.x = x;
    wantedPos.y = y;
  };

  return {
    x: function () {
      return grapple.x;
    },
    y: function () {
      return grapple.y
    },
    grapple: grappleTo,
    back: back,
    tick: tick,
    toggleHide: function () {
      grapple.visible = !grapple.visible;
    }
  }
}