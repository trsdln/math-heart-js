import R from 'ramda';

// drawing stuff

export const drawLine = R.curry(function (canvas, startPoint, endPoint) {
  const lineInstance = canvas.display.line({
    start: startPoint,
    end: endPoint
  });

  canvas.addChild(lineInstance);
});

export function drawCircle(canvas, centerPoint, radius) {
  const circleConfig = R.merge(centerPoint, {
    radius: radius,
    stroke: '1px #000'
  });

  const circleInstance = canvas.display.ellipse(circleConfig);

  canvas.addChild(circleInstance);
}

export function drawText(canvas, point, text) {
  const textConfig = R.merge(point, {
    text: text,
    origin: {x: 'center', y: 'center'},
    font: '12px sans-serif',
    fill: '#999'
  });

  const textInstance = canvas.display.text(textConfig);
  canvas.addChild(textInstance);
}
