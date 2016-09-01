// drawing stuff

var drawLine = R.curry(function (canvas, startPoint, endPoint) {
  var lineInstance = canvas.display.line({
    start: startPoint,
    end: endPoint
  });

  canvas.addChild(lineInstance);
});

function drawCircle(canvas, centerPoint, radius) {
  var circleConfig = R.merge(centerPoint, {
    radius: radius,
    stroke: "1px #000"
  });

  var circleInstance = canvas.display.ellipse(circleConfig);

  canvas.addChild(circleInstance);
}

function drawText(canvas, point, text) {
  var textConfig = R.merge(point, {
    text: text,
    origin: {x: "center", y: "center"},
    font: "12px sans-serif",
    fill: "#999"
  });

  var textInstance = canvas.display.text(textConfig);
  canvas.addChild(textInstance);
}
