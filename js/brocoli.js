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
    alert(event.stageX + " " + event.stageY);
  };


  brocoli.startMoveRight = function () {
    alert("startMoveRight");
  };

  brocoli.startMoveLeft = function () {
    alert("startMoveLeft");
  };

  brocoli.stopMove = function () {
    alert("stopMove");
  };



  return brocoli;
}