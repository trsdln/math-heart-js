import Rx from 'rx';
import R from 'ramda';
import { html } from 'snabbdom-jsx';
import { makeDOMDriver } from '@cycle/dom';
import { run } from '@cycle/rx-run';

import { point, line, makeOCanvasDriver } from './ocanvas-driver';

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
    sectorsCount$.startWith(10),
    multiplier$.startWith(5),
    (sectorsCount, multiplier) => ({
      sectorsCount,
      multiplier,
    })
  );

  return {
    DOM: state$.map(mainView),
    oCanvas: state$.debounce(500).map(({sectorsCount, multiplier}) => line({
      start: point(0, 0),
      end: point(sectorsCount, multiplier)
    }))
  };
}


document.addEventListener('DOMContentLoaded', () => {
  const drivers = {
    DOM: makeDOMDriver('#app'),
    oCanvas: makeOCanvasDriver('#main-canvas'),
  };

  run(main, drivers);
});
