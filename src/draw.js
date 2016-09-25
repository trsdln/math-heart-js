import R from 'ramda';

import { point, text, ellipse, line } from './ocanvas-driver';
import { adjustPointToCircleCenter } from './math';


export function createBigCircle(centerPosition, radius) {
  const circleCenter = adjustPointToCircleCenter(centerPosition)(point(0, 0));
  return ellipse(R.merge({radius}, circleCenter));
}

export function createSectorLabel(lineNumberToPoint, textNumberToPoint, number) {
  return [
    // point number
    text(R.merge({text: String(number)}, textNumberToPoint(number))),
    // small circle
    ellipse(R.merge({radius: 3}, lineNumberToPoint(number)))
  ];
}

export function createSectorLine(lineNumberToPoint, multiplier, number) {
  return line({
    start: lineNumberToPoint(number),
    end: lineNumberToPoint(number * multiplier)
  });
}
