function Camera () {
    var camera = {};
    camera.xPosition = 0;
    camera.yPosition = 0;

    camera.setPosition = function (x, y) {
        camera.xPosition = x;
        camera.yPosition = y;
    };

    return camera;

}