import R from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import oCanvas from 'ocanvas';

import { MainAppView } from './ui/MainAppView';

import * as Draw from './lib/draw';
import * as HeartMath from './lib/heart-math';


ReactDOM.render(<MainAppView/>, document.getElementById('app-container'));


// configuration
// todo: ability to change it using UI
const sectorsCount = 100;
const multiplier = 5;
const linesCount = 100;

const margin = 30; // px

// todo: refactor code below

// initialize canvas
const canvas = oCanvas.create({
  canvas: '#main',
  background: '#FFF'
});


const radiusWithMargin = canvas.width / 2;
const radius = radiusWithMargin - margin;

const adjustToMainCircleCenter = HeartMath.adjustPointToCircleCenter(radiusWithMargin);

// numberToPointConverter :: Number -> Point
const numberToPointConverter = R.compose(adjustToMainCircleCenter,
  HeartMath.getPointByNumber(sectorsCount, radius));

const lineDrawer = Draw.drawLine(canvas);

// draw main circle
Draw.drawCircle(canvas, adjustToMainCircleCenter({
  x: 0,
  y: 0
}), radius);

// draw basic numbers and labels
function drawSectorLabel(number) {
  // draw text
  const point = HeartMath.getPointByNumber(sectorsCount, radius + margin - 10, number);
  Draw.drawText(canvas, adjustToMainCircleCenter(point), number.toString());

  // draw small circle
  const smallCircleCenter = numberToPointConverter(number);
  Draw.drawCircle(canvas, smallCircleCenter, 3);
}

R.forEach(drawSectorLabel, R.range(0, sectorsCount));


for (let i = 0; i < linesCount; i++) {
  lineDrawer(numberToPointConverter(i), numberToPointConverter(i * multiplier));
}
