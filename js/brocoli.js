function Brocoli(stage, spriteSheet, img) {
  var brocoli = new createjs.Sprite(spriteSheet, "stand");
  stage.addChild(brocoli);

  var grapple = Grapple(stage, img);
  dispatcher.addEventListener("GRAPPLE_OK", moveToGrapple);

  var isMoving = false;
  var faceRight = true;
  var movementSpeed = 4;
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
      }
    }

    if (!movingToGrapple && isMoving) {
      var speed = (faceRight) ? movementSpeed : -movementSpeed;
      brocoli.x = (brocoli.x + deltaS * speed);
    }
  }

  var tick = function (deltaS) {
    move(deltaS);
    if (grappling) {
      grapple.tick(deltaS);
    }
  };

  var grap = function (event) {
    grappling = true;
    grapple.grapple(event.stageX, event.stageY);
  };


  var startMoveRight = function () {
    console.log("startMoveRight");
    isMoving = true;
    faceRight = true;
    brocoli.gotoAndPlay("moveRight");
    camera.setPosition(camera.xPosition + 1, camera.yPosition);
  };

  var startMoveLeft = function () {
    console.log("startMoveLeft");
    isMoving = true;
    faceRight = false;
    brocoli.gotoAndPlay("moveLeft");
  };

  var stopMove = function () {
    console.log("stopMove");
    isMoving = false;
    brocoli.gotoAndStop("stand");
  };

  return {
    tick: tick,
    grapple: grap,
    setY: function (y) {
      brocoli.y = y;
    }
  };
}