function Brocoli(stage, spriteSheet, img, initialPos) {
  var brocoli = new createjs.Sprite(spriteSheet, "idle");
  brocoli.regX = 60;
  brocoli.regY = 60;
  brocoli.y = initialPos - 60;
  brocoli.x = 60;
  stage.addChild(brocoli);

  var grapple = Grapple(stage, img);
  grapple.toggleHide();
  dispatcher.addEventListener("GRAPPLE_OK", moveToGrapple);

  var isMoving = false;
  var faceRight = true;
  var movementSpeed = 60;
  var grappleSpeed = 300;

  var grappling = false,
    movingToGrapple = false,
    wantedPos = {x: movementSpeed, y: movementSpeed},
    accelerationVector = {x: grappleSpeed, y: grappleSpeed},
    right = false,
    down = false;

  function moveToGrapple() {
    // Move broco to the grapple
    grappling = false;
    movingToGrapple = true;

    wantedPos.x = grapple.x();
    wantedPos.y = grapple.y();

    var xDistance = wantedPos.x - brocoli.x;
    var yDistance = wantedPos.y - brocoli.y;

    right = xDistance > 0;
    faceRight = right;
    down = yDistance > 0;

    accelerationVector.x = grappleSpeed * Math.abs(xDistance / yDistance);
  }

  function move(deltaS) {
    //  // Animate spritesheet with good animation
    //  // Move the item on the right

    if (movingToGrapple) {
      // Deactivate any movement
      isMoving = false;
      moveTo(deltaS, accelerationVector, right, down, brocoli, wantedPos);

      if (brocoli.x === wantedPos.x && brocoli.y === wantedPos.y) {
        movingToGrapple = false;
        grapple.toggleHide();
      }
    }
    else if (isMoving) {
      var speed = (faceRight) ? movementSpeed : -movementSpeed;
      brocoli.x = (brocoli.x + deltaS * speed);
      //brocoli.y -= 1;
    }
  }

  var tick = function (deltaS) {
    move(deltaS);
    if (grappling) {
      grapple.tick(deltaS);
    }
  };

  var grap = function (event) {
    if (!grappling) {
      grappling = true;
      grapple.toggleHide();
      grapple.grapple(event.stageX, event.stageY, brocoli.x, brocoli.y);
    }
  };

  var startMoveRight = function () {
    if ((isMoving && !faceRight) || !isMoving) {
      console.log("test");
      isMoving = true;
      faceRight = true;
      brocoli.gotoAndPlay("jump");
    }
  };

  var startMoveLeft = function () {
    if ((isMoving && faceRight) || !isMoving) {
      isMoving = true;
      faceRight = false;
      brocoli.gotoAndPlay("jump");
    }
  };

  var stopMove = function () {
    isMoving = false;
    brocoli.gotoAndPlay("idle");
  };

  return {
    tick: tick,
    grapple: grap,
    startMoveRight: startMoveRight,
    startMoveLeft: startMoveLeft,
    stopMove: stopMove,
    isMoving: function () {
      return isMoving || movingToGrapple;
    },
    direction: function () {
      return faceRight;
    },
    distance: function () {
      return accelerationVector.x;
    }
  };
}