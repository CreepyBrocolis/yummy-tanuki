function Brocoli(spriteSheet) {
  var brocoli = new createjs.Sprite(spriteSheet, "stand");

  brocoli.moveRight = function () {
  //  // Animate spritesheet with good animation
  //  // Move the item on the right
  };

  brocoli.moveLeft = function () {
  //  // Animate spritesheet with good animation
  //  // Move the item on the left
  };

  brocoli.grapple = function (event) {
    console.log(event.stageX + " " + event.stageY);
  };


  brocoli.startMoveRight = function () {
    console.log("startMoveRight");
  };

  brocoli.startMoveLeft = function () {
    console.log("startMoveLeft");
  };

  brocoli.stopMove = function () {
    console.log("stopMove");
  };



  return brocoli;
}