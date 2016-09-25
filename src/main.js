import Rx from 'rx';
import R from 'ramda';
import { html } from 'snabbdom-jsx';
import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/rx-run';

import { point, line, text, ellipse, makeOCanvasDriver } from './ocanvas-driver';
import { adjustPointToCircleCenter, getPointByNumber } from './math';


// source: read parameters
// logic: calculate all points
// sink: draw the lines

function mainView({sectorsCount, multiplier}) {
  return (
    <div>
      <div>
        <label>Sectors: {sectorsCount}</label>
        <input className="sectors-count" type="range" min="1" max="100" value={sectorsCount}/>
      </div>
      <div>
        <label>Multiplier: {multiplier}</label>
        <input className="multiplier" type="range" min="1" max="10" value={multiplier}/>
      </div>
    </div>
  );
}

// intValueByEvent :: Event -> Number
// Event = Object
const intValueByEvent = R.compose(parseInt, R.path(['target', 'value']));

function main(sources) {
  const sectorsCount$ = sources.DOM.select('.sectors-count').events('input').map(intValueByEvent);
  const multiplier$ = sources.DOM.select('.multiplier').events('input').map(intValueByEvent);

  const state$ = Rx.Observable.combineLatest(
    sectorsCount$.startWith(30),
    multiplier$.startWith(2),
    (sectorsCount, multiplier) => ({
      sectorsCount,
      multiplier,
    })
  );

  return {
    DOM: state$.map(mainView),
    oCanvas: state$.debounce(500).map(({sectorsCount, multiplier}) => {
      // configuration
      var linesCount = 100;
      var margin = 30; // px

      // todo: refactor code below

      var radiusWithMargin = sources.oCanvas.width / 2;
      var radius = radiusWithMargin - margin;

      var adjustToMainCircleCenter = adjustPointToCircleCenter(radiusWithMargin);

      // numberToPointConverter :: Number -> Point
      var numberToPointConverter = R.compose(adjustToMainCircleCenter, getPointByNumber(sectorsCount, radius));

      // draw basic numbers and labels
      function createSectorLabel(number) {
        const textPosition = getPointByNumber(sectorsCount, radius + margin - 10, number);
        return [
          // point number
          text(R.merge({text: String(number)}, adjustToMainCircleCenter(textPosition))),
          // small circle
          ellipse(R.merge({radius: 3}, numberToPointConverter(number)))
        ];
      }

      function numberToLine(i) {
        return line({
          start: numberToPointConverter(i),
          end: numberToPointConverter(i * multiplier)
        });
      }

      return R.flatten([
        //big circle
        ellipse(R.merge({radius}, adjustToMainCircleCenter(point(0, 0)))),
        // labels on circle
        R.range(0, sectorsCount).map(createSectorLabel),
        // lines itself
        R.range(0, linesCount).map(numberToLine),
      ]);
    }),
  };
}


document.addEventListener('DOMContentLoaded', () => {
  const drivers = {
    DOM: makeDOMDriver('#app'),
    oCanvas: makeOCanvasDriver('#main-canvas'),
  };

  run(main, drivers);
});
