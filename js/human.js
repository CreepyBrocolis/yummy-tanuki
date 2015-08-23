function Human (stage, bodySpritesheet, legSpriteSheet, x, y) {

    var humanBody = new createjs.Sprite(bodySpritesheet, "idle");
    var humanLegs = new createjs.Sprite(legSpriteSheet, "walk");

    humanBody.height = 675;
    humanBody.magicXOffset = 75;
    humanLegs.height = 600;

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
        yPosition: yPosition
    };

    human.movementSpeed = -100;
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
        human.xPosition = x - camera.xPosition;
        human.yPosition = y;

        humanLegs.x = human.xPosition;
        humanLegs.y = human.yPosition + humanBody.height - camera.yPosition;

        humanBody.x = human.xPosition - humanBody.magicXOffset;
        humanBody.y = human.yPosition - camera.yPosition;
    };


    human.move = function (deltaS) {
        human.setPosition(human.xPosition + deltaS * human.movementSpeed, human.yPosition);
    };


    return human;
}