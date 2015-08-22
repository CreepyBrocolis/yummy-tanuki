function Brocoli(spriteSheet) {
  var brocoli = new createjs.Sprite(spriteSheet, "stand");

  brocoli.moveRight = function () {
    // Animate spritesheet with good animation
    // Move the item on the right
  };

  brocoli.moveLeft = function () {
    // Animate spritesheet with good animation
    // Move the item on the left
  };

  return brocoli;
}