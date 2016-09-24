// import R from 'ramda';
// import oCanvas from 'ocanvas';
//
// // math stuff
//
// function calculateAngle(number, sectorsCount) {
//   return (2 * Math.PI / sectorsCount) * (number % sectorsCount);
// }
//
// function getPointByAngle(angle, radius) {
//   return {
//     x: radius * Math.cos(angle),
//     y: radius * Math.sin(angle)
//   };
// }
//
// var getPointByNumber = R.curry(function (sectorsCount, radius, number) {
//   return getPointByAngle(calculateAngle(number, sectorsCount), radius);
// });
//
// // adjustToCircleCenter :: Number -> Point -> Point
// // Point = {x: Number, y: Number}
// var adjustPointToCircleCenter = function (shiftDistance) {
//   return R.evolve({x: R.add(shiftDistance), y: R.add(shiftDistance)});
// };
//
//
// // drawing stuff
//
// var drawLine = R.curry(function (canvas, startPoint, endPoint) {
//   var lineInstance = canvas.display.line({
//     start: startPoint,
//     end: endPoint
//   });
//
//   canvas.addChild(lineInstance);
// });
//
// function drawCircle(canvas, centerPoint, radius) {
//   var circleConfig = R.merge(centerPoint, {
//     radius: radius,
//     stroke: "1px #000"
//   });
//
//   var circleInstance = canvas.display.ellipse(circleConfig);
//
//   canvas.addChild(circleInstance);
// }
//
// function drawText(canvas, point, text) {
//   var textConfig = R.merge(point, {
//     text: text,
//     origin: {x: "center", y: "center"},
//     font: "12px sans-serif",
//     fill: "#999"
//   });
//
//   var textInstance = canvas.display.text(textConfig);
//   canvas.addChild(textInstance);
// }
//
// // configuration
// // todo: ability to change it using UI
// var sectorsCount = 100;
// var multiplier = 5;
// var linesCount = 100;
//
// var margin = 30; // px
//
// // todo: refactor code below
//
// // initialize canvas
// var canvas = oCanvas.create({
//   canvas: "#main",
//   background: "#FFF"
// });
//
//
// var radiusWithMargin = canvas.width / 2;
// var radius = radiusWithMargin - margin;
//
// var adjustToMainCircleCenter = adjustPointToCircleCenter(radiusWithMargin);
//
// // numberToPointConverter :: Number -> Point
// var numberToPointConverter = R.compose(adjustToMainCircleCenter, getPointByNumber(sectorsCount, radius));
//
// var lineDrawer = drawLine(canvas);
//
// // draw main circle
// drawCircle(canvas, adjustToMainCircleCenter({
//   x: 0,
//   y: 0
// }), radius);
//
// // draw basic numbers and labels
// function drawSectorLabel(number) {
//   // draw text
//   var point = getPointByNumber(sectorsCount, radius + margin - 10, number);
//   drawText(canvas, adjustToMainCircleCenter(point), number.toString());
//
//   // draw small circle
//   var smallCircleCenter = numberToPointConverter(number);
//   drawCircle(canvas, smallCircleCenter, 3);
// }
//
// R.forEach(drawSectorLabel, R.range(0, sectorsCount));
//
//
// for (var i = 0; i < linesCount; i++) {
//   lineDrawer(numberToPointConverter(i), numberToPointConverter(i * multiplier));
// }
//
