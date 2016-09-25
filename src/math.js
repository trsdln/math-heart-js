import R from 'ramda';

export function calculateAngle(number, sectorsCount) {
  return (2 * Math.PI / sectorsCount) * (number % sectorsCount);
}

export function getPointByAngle(angle, radius) {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  };
}

export const getPointByNumber = R.curry(function (sectorsCount, radius, number) {
  return getPointByAngle(calculateAngle(number, sectorsCount), radius);
});

// adjustToCircleCenter :: Number -> Point -> Point
// Point = {x: Number, y: Number}
export function adjustPointToCircleCenter(centerPosition) {
  return R.evolve({x: R.add(centerPosition), y: R.add(centerPosition)});
}

// createNumberToPointConverter :: (Number, Number, Number) -> Number -> Point
export function createNumberToPointConverter(centerPosition, sectorsCount, radius) {
  return R.compose(
    adjustPointToCircleCenter(centerPosition),
    getPointByNumber(sectorsCount, radius)
  );
}