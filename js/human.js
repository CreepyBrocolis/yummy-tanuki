function Human (spritesheet) {
    var human = new createjs.Sprite(spritesheet, "move")
    human.movementSpeed = -4;
    human.isAlive = true;


    human.move = function (deltaS) {
        if (human.isMoving) {
            human.x = human.x + deltaS * human.movementSpeed;
        }
    };

    human.die = function () {
        human.gotoAndPlay("die");
    };


    human.tick = function (deltaS) {
        if (human.isAlive)
            human.move(deltaS);
        else
            human.die();
    }
}