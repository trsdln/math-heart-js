import Rx from 'rx';
import R from 'ramda';
import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/rx-run';

import { controlView } from './control-view';

import { resetCanvas, makeOCanvasDriver } from './ocanvas-driver';
import { createNumberToPointConverter } from './math';
import { createSectorLine, createSectorLabel, createBigCircle } from './draw';


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
    DOM: state$.map(controlView),
    oCanvas: state$.debounce(500).flatMap(({sectorsCount, multiplier}) => {
      return Rx.Observable.create(observer => {
        // configuration
        const canvasWidth = sources.oCanvas.width;
        const centerPosition = canvasWidth / 2;

        const margin = centerPosition / 10; // px
        const radius = centerPosition - margin;

        const linesCount = sectorsCount * 2;

        // clear canvas
        observer.onNext(resetCanvas());

        // big circle
        observer.onNext(createBigCircle(centerPosition, radius));

        const lineNumberToPoint = createNumberToPointConverter(centerPosition, sectorsCount, radius);
        const textNumberToPoint = createNumberToPointConverter(centerPosition, sectorsCount, radius + margin / 2);

        // labels on circle
        R.range(0, sectorsCount).forEach(i => observer.onNext(createSectorLabel(lineNumberToPoint, textNumberToPoint, i)));

        // lines itself
        R.range(0, linesCount).forEach(i => observer.onNext(createSectorLine(lineNumberToPoint, multiplier, i)));

        observer.dispose();
      });
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
