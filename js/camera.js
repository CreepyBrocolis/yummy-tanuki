function Camera() {
  var camera = {
    xPosition: 0,
    yPosition: 0,
    setPosition: function (x, y) {
      camera.xPosition = x;
      camera.yPosition = y;
    }
  };

  return camera;
}