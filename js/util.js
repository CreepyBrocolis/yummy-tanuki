function moveTo(deltaS, accelerationVector, right, down, obj, wantedPos) {
  var xDistance = deltaS * accelerationVector.x,
    yDistance = deltaS * accelerationVector.y;

  if (right) {
    if (obj.x + xDistance < wantedPos.x) {
      obj.x = obj.x + xDistance;
    } else {
      obj.x = wantedPos.x;
    }
  } else {
    if (obj.x - xDistance > wantedPos.x) {
      obj.x = obj.x - xDistance;
    } else {
      obj.x = wantedPos.x;
    }
  }

  if (down) {
    if (obj.y + yDistance < wantedPos.y) {
      obj.y = obj.y + yDistance;
    } else {
      obj.y = wantedPos.y;
    }
  } else {
    if (obj.y - yDistance > wantedPos.y) {
      obj.y = obj.y - yDistance;
    } else {
      obj.y = wantedPos.y;
    }
  }
}