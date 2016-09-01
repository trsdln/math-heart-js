// math stuff

function calculateAngle(number, sectorsCount) {
  return (2 * Math.PI / sectorsCount) * (number % sectorsCount);
}

function getPointByAngle(angle, radius) {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  };
}

var getPointByNumber = R.curry(function (sectorsCount, radius, number) {
  return getPointByAngle(calculateAngle(number, sectorsCount), radius);
});

// adjustToCircleCenter :: Number -> Point -> Point
// Point = {x: Number, y: Number}
var adjustPointToCircleCenter = function (shiftDistance) {
  return R.evolve({x: R.add(shiftDistance), y: R.add(shiftDistance)});
};
