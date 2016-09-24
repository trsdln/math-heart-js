import Rx from 'rx';
import { run } from '@cycle/rx-run';
import { div, canvas, input, label, makeDOMDriver } from '@cycle/dom';

// source: read parameters
// logic: calculate all points
// sink: draw the lines


function main(sources) {
  const testVal$ = sources.DOM.select('.test').events('input').map(e => e.target.value);

  return {
    DOM: testVal$
      .startWith(10)
      .map(testVal =>
        div({style: {textAlign: 'center'}}, [
          div([
            label(`A: ${testVal}`),
            input({attrs: {class: 'test', type: 'range', min: 1, max: 100, value: testVal}})
          ]),
          canvas({attrs: {width: 600, height: 600}}),
        ])
      )
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const drivers = {
    DOM: makeDOMDriver('#app')
  };

  run(main, drivers)
});
