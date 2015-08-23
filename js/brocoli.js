function Brocoli(stage, spriteSheet, img, initialPos) {
  var brocoli = new createjs.Sprite(spriteSheet, "idle");

  brocoli.addEventListener("animationend", animationEnded);

  brocoli.regX = 60;
  brocoli.regY = 60;
  brocoli.y = initialPos - 60;
  brocoli.x = 120;
  brocoli.yStart = brocoli.y;
  brocoli.lastDistanceTraveled = 0;

  stage.addChild(brocoli);

  var grapple = Grapple(stage, img);
  grapple.toggleHide();
  dispatcher.addEventListener("GRAPPLE_OK", moveToGrapple);
  dispatcher.addEventListener("GRAPPLE_BACK", grappleBack);

  var movementSpeed = 100;
  var jumpStrength = -300;
  var grappleSpeed = 1200;
  var gravity = 800;
  var jumping = false;

  var velocity = {x: 0, y: 0};

  var grappling = false,
    movingToGrapple = false,
    wantedPos = {x: movementSpeed, y: movementSpeed};

  function moveToGrapple() {
    // Move broco to the grapple
    movingToGrapple = true;

    wantedPos.x = grapple.x();
    wantedPos.y = grapple.y();
  }

  function grappleBack() {
    grappling = false;
    movingToGrapple = false;
    grapple.toggleHide();
  }

  function animationEnded(evt) {
    if (evt.name == "landAndIdle") {
      //still moving, jump again
      if (velocity.x != 0) {
        jump();
      }
    }
  }

  function jump() {
    brocoli.gotoAndPlay("jump");
    velocity.y += jumpStrength;
    jumping = true;
  }

  function move(deltaS) {
    if (movingToGrapple) {
      // Deactivate any movement
      var pouet = twoPointDistance(brocoli, wantedPos);

      var distance = Math.min(deltaS * grappleSpeed, pouet.distance);

      brocoli.lastDistanceTraveled = pouet.xDistance / pouet.distance * distance;

      velocity.x += brocoli.lastDistanceTraveled;
      velocity.y += pouet.yDistance / pouet.distance * distance;

      grapple.back(brocoli.x, brocoli.y);

    } else {
      //player moving
      if (!jumping && velocity.y === 0 && velocity.x !== 0) {
        jump();
      }

      //gravity
      if (!jumping && brocoli.y >= (floorHeight - 60) - camera.yPosition) { //ground height ?
        velocity.y = 0;
        velocity.x = 0;
      } else {
        velocity.y += gravity * deltaS;
      }

      //brocoli.x += (velocity.x) * deltaS;
      //brocoli.y += (velocity.y) * deltaS;
    }
    camera.yPosition += (velocity.y) * deltaS;
    camera.xPosition = (velocity.x) * deltaS;
  }

  var tick = function (deltaS) {
    move(deltaS);
    //start land animation when we fall
    if (velocity.y > 0) {
      jumping = false;
      brocoli.gotoAndPlay("landAndIdle");
    }
    if (grappling) {
      grapple.tick(deltaS);
    }
  };

  var grap = function (event) {
    if (!grappling) {
      var hit = false;
      grappable.forEach(function (entity) {
        hit = collide(entity, event.stageX, event.stageY);
      });
      if (hit) {
        grappling = true;
        grapple.toggleHide();
        grapple.grapple(event.stageX, event.stageY, brocoli.x, brocoli.y);
      }
    }
  };

  var startMoveRight = function () {
    if (velocity.x !== 0) return;
    velocity.x = movementSpeed;
  };

  var startMoveLeft = function () {
    if (velocity.x !== 0) return;
    velocity.x = -movementSpeed;
  };

  return {
    tick: tick,
    grapple: grap,
    startMoveRight: startMoveRight,
    startMoveLeft: startMoveLeft,
    isMoving: function () {
      return velocity.x !== 0 || movingToGrapple;
    }
  };
}