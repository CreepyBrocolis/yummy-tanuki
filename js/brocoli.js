function Brocoli(spriteSheet) {
  var brocoli = new createjs.Sprite(spriteSheet, "stand");
  brocoli.isMoving = false;
  brocoli.faceRight = true;
  brocoli.movementSpeed = 4;
  brocoli.xPosition = brocoli.x;
  brocoli.yPosition = brocoli.y;

  brocoli.move = function (deltaS) {
  //  // Animate spritesheet with good animation
  //  // Move the item on the right
    var speed;
    if (brocoli.isMoving) {
      speed = (brocoli.faceRight) ? brocoli.movementSpeed : - brocoli.movementSpeed;
    }
    else {
      speed = 0;
    }
    brocoli.xPosition += deltaS * speed;
    brocoli.x = brocoli.xPosition - camera.xPosition;
    brocoli.y = brocoli.yPosition - camera.yPosition;
  };

  brocoli.tick = function (deltaS) {
    brocoli.move(deltaS);
  };

  brocoli.grapple = function (event) {
    console.log(event.stageX + " " + event.stageY);
  };


  brocoli.startMoveRight = function () {
    console.log("startMoveRight");
    brocoli.isMoving = true;
    brocoli.faceRight = true;
    brocoli.gotoAndPlay("moveRight");
  };

  brocoli.startMoveLeft = function () {
    console.log("startMoveLeft");
    brocoli.isMoving = true;
    brocoli.faceRight = false;
    brocoli.gotoAndPlay("moveLeft");
  };

  brocoli.stopMove = function () {
    console.log("stopMove");
    brocoli.isMoving = false;
    brocoli.gotoAndStop("stand");
  };



  return brocoli;
}