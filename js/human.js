function Human (spritesheet) {
    var human = new createjs.Sprite(spritesheet, "move")
    human.movementSpeed = -4;
    human.isAlive = true;
    human.xPosition = human.x;
    human.yPosition = human.y;


    human.move = function (deltaS) {
        human.xPosition += deltaS * human.movementSpeed;
        human.x = human.xPosition - camera.xPosition;
        human.y = human.yPosition - camera.yPosition;
    };

    human.die = function () {
        human.gotoAndPlay("die");
    };


    human.tick = function (deltaS) {
        if (human.isAlive)
            human.move(deltaS);
        else
            human.die();
    };

    return human;
}