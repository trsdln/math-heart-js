import './lib/math';
import './lib/draw';

const MainAppView = React.createClass({
  render() {
    return (
      <div className="app-wrapper">
        <div className="control-bar">
          <input type="number" placeholder="Lines"/>
          <input type="number" placeholder="Sectors"/>
          <input type="number" placeholder="Multiplier"/>
        </div>

        <div className="canvas-wrapper">
          <canvas id="main" width="600px" height="600px"/>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<MainAppView/>, document.getElementById('app-container'));


// configuration
// todo: ability to change it using UI
var sectorsCount = 100;
var multiplier = 5;
var linesCount = 100;

var margin = 30; // px

// todo: refactor code below

// initialize canvas
var canvas = oCanvas.create({
  canvas: "#main",
  background: "#FFF"
});


var radiusWithMargin = canvas.width / 2;
var radius = radiusWithMargin - margin;

var adjustToMainCircleCenter = adjustPointToCircleCenter(radiusWithMargin);

// numberToPointConverter :: Number -> Point
var numberToPointConverter = R.compose(adjustToMainCircleCenter, getPointByNumber(sectorsCount, radius));

var lineDrawer = drawLine(canvas);

// draw main circle
drawCircle(canvas, adjustToMainCircleCenter({
  x: 0,
  y: 0
}), radius);

// draw basic numbers and labels
function drawSectorLabel(number) {
  // draw text
  var point = getPointByNumber(sectorsCount, radius + margin - 10, number);
  drawText(canvas, adjustToMainCircleCenter(point), number.toString());

  // draw small circle
  var smallCircleCenter = numberToPointConverter(number);
  drawCircle(canvas, smallCircleCenter, 3);
}

R.forEach(drawSectorLabel, R.range(0, sectorsCount));


for (var i = 0; i < linesCount; i++) {
  lineDrawer(numberToPointConverter(i), numberToPointConverter(i * multiplier));
}

