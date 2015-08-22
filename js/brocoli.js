function Brocoli(stage, spriteSheet, img, initialPos) {
  var brocoli = new createjs.Sprite(spriteSheet, "idle");

  brocoli.addEventListener("animationend", animationEnded);

  brocoli.regX = 60;
  brocoli.regY = 60;
  brocoli.y = initialPos - 60;
  brocoli.x = 60;
  brocoli.yStart = brocoli.y;
  brocoli.lastDistanceTraveled = 0;

  stage.addChild(brocoli);

  var grapple = Grapple(stage, img);
  grapple.toggleHide();
  dispatcher.addEventListener("GRAPPLE_OK", moveToGrapple);

  var isMoving = false;
  var faceRight = true;
  var movementSpeed = 60;
  var jumpStrength = 20;
  var grappleSpeed = 800;
  var gravity = 8.0;
  var jumping = false;

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

  function animationEnded (evt){
    if(evt.name == "land") {
      //still moving, jump again
      if(movement.x != 0.0) {
        jump();
      }
    }
  }

  function jump() {
    brocoli.gotoAndPlay("jump");
    velocity.y += jumpStrength;
    console.log("JMP velocity.y " + velocity.y);
    jumping = true;
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
        if(!jumping && velocity.y == 0.0 && movement.x != 0.0) {
          jump();
        }

        //gravity
        if(!jumping && brocoli.y >= floorHeight - 60) { //ground height ?
          velocity.y = 0.0;
        } else {
          velocity.y -= gravity * deltaS;
        }

        brocoli.x += (movement.x + velocity.x) * deltaS;
        brocoli.y += (movement.y - velocity.y) * deltaS;
        brocoli.lastDistanceTraveled = (movement.x + velocity.x) * deltaS;
        //reset horizontal movement (because the key needs to be hold down to move)
        movement.x = 0.0;
    }
  }

  var tick = function (deltaS) {
    move(deltaS);
    //start land animation when we fall
    if (velocity.y < 0.0) { //&& jumping //if we don't test jumping -> restart land anim until we reach ground
      jumping = false;
      brocoli.gotoAndPlay("land");
    }
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

    distance: function () {
      return brocoli.lastDistanceTraveled;
    }
  };
}