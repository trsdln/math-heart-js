var canvas = oCanvas.create({
  canvas: "#main",
  background: "#FFF"
});

var r = canvas.width / 2;

var baseCircle = canvas.display.ellipse({
  x: r,
  y: r,
  radius: r,
  stroke: "1px #000"
});

canvas.addChild(baseCircle);