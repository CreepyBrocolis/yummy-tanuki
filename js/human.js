function Human (stage, bodySpritesheet, legSpriteSheet, x, y) {

    var humanBody = new createjs.Sprite(bodySpritesheet, "idle");

    var humanLegs = new createjs.Sprite(legSpriteSheet, "walk");


    var xPosition = x;
    var yPosition = y - humanBody.height - humanLegs.height;


    humanLegs.x = xPosition;
    humanLegs.y = yPosition + humanBody.height;

    humanBody.x = xPosition;
    humanBody.y = yPosition;


    stage.addChild(humanLegs);
    stage.addChild(humanBody);


    var human = {
        humanLegs: humanLegs,
        humanBody: humanBody,
        xPosition: xPosition,
        yPosition: yPosition,
    };

    human.movementSpeed = -4;
    human.isAlive = true;


    human.die = function () {
        humanBody.gotoAndPlay("die");
        humanLegs.gotoAndPlay("die");
    };

    human.tick = function (deltaS) {
        if (human.isAlive)
            human.move(deltaS);
        else
            human.die();
    };


    human.setPosition = function (x, y) {
        human.xPosition = x;
        human.yPosition = y;

        humanLegs.x = human.xPosition - camera.xPosition;
        humanLegs.y = human.yPosition - camera.yPosition + humanBody.height;

        humanBody.x = human.xPosition - camera.xPosition;
        humanBody.y = human.yPosition - camera.yPosition;
    }


    human.move = function (deltaS) {
        human.setPosition(human.x + deltaS * human.movementSpeed, human.y);
    };


    return human;
}