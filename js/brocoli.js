function Brocoli(stage, spriteSheet, img, initialPos) {
  var brocoli = new createjs.Sprite(spriteSheet, "idle");

  brocoli.addEventListener("animationend", animationEnded);

  function animationEnded (evt){
    if(evt.name == "land") {
      //still moving, jump again
      if(movement.x != 0.0) {
        jump();
      }
    }
  }

  brocoli.regX = 60;
  brocoli.regY = 60;
  brocoli.y = initialPos - 60;
  brocoli.x = 60;
  brocoli.jumpStart = 0;
  brocoli.yStart = brocoli.y;

  stage.addChild(brocoli);

  var grapple = Grapple(stage, img);
  grapple.toggleHide();
  dispatcher.addEventListener("GRAPPLE_OK", moveToGrapple);

  var isMoving = false;
  var faceRight = true;
  var movementSpeed = 60;
  var jumpStrength = 100;
  var grappleSpeed = 800;
  var gravity = 8.0;

  var velocity = {x: 0.0, y: 0.0};
  var movement = {x: 0.0, y: 0.0};

  var grappling = false,
    movingToGrapple = false,
    wantedPos = {x: movementSpeed, y: movementSpeed};

  function moveToGrapple() {
    // Move broco to the grapple
    grappling = false;
    movingToGrapple = true;

    wantedPos.x = grapple.x();
    wantedPos.y = grapple.y();
  }


//TODO
//brocoli.lastDistanceTraveled;
//brocoli.jumpStart

  function jump() {
    brocoli.gotoAndPlay("jump");
    velocity.y += jumpStrength;
  }

  function move(deltaS) {
    // Animate spritesheet with good animation
    // Move the item on the right

    if (movingToGrapple) {
      // Deactivate any movement
      isMoving = false;
      moveTo(deltaS, brocoli, wantedPos, grappleSpeed);

      if (brocoli.x === wantedPos.x && brocoli.y === wantedPos.y) {
        movingToGrapple = false;
        grapple.toggleHide();
      }
    } else {
        //player moving
        if(velocity.y == 0.0 && movement.x != 0.0) {
          jump();
        }

        //gravity
        if(brocoli.y <= floorHeight) { //ground height ?
          velocity.y = 0.0;
        } else {
          velocity.y -= gravity * deltaS;
        }

        brocoli.x += (movement.x + velocity.x) * deltaS;
        brocoli.x += (movement.y + velocity.y) * deltaS;
        //reset horizontal movement (because the key needs to be hold down to move)
        mouvement.x = 0.0;
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
    movement.x = movementSpeed;
//    brocoli.gotoAndPlay("jump");
  };

  var startMoveLeft = function () {
    movement.x = -movementSpeed;
  };

  var stopMove = function () {
    /*isMoving = false;
    brocoli.gotoAndPlay("landAndIdle");
    if (brocoli.jumpStart > 0) {
      brocoli.jumpStart = 0;
      brocoli.y = brocoli.yStart;
    }*/
  };

  return {
    tick: tick,
    grapple: grap,
    startMoveRight: startMoveRight,
    startMoveLeft: startMoveLeft,
    stopMove: stopMove,
    isMoving: function () {
      return movement.x != 0.0 || movingToGrapple;
    },
    direction: function () {
      return movement.x >= 0.0;
    },
    distance: function () {
      return brocoli.lastDistanceTraveled;
    }
  };
}