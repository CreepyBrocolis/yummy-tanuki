function moveTo(deltaS, obj, wantedPos, speed) {

  var pouet = twoPointDistance(obj, wantedPos);

  var distance = Math.min(deltaS * speed, pouet.distance);

  obj.x += pouet.xDistance / pouet.distance * distance;
  obj.y += pouet.yDistance / pouet.distance * distance;

  obj.lastDistanceTraveled = pouet.xDistance / pouet.distance * distance;
}

function twoPointDistance(pointA, pointB) {
  var xDistance = pointB.x - pointA.x;
  var yDistance = pointB.y - pointA.y;

  return {
    xDistance: xDistance,
    yDistance: yDistance,
    distance: Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
  }
}