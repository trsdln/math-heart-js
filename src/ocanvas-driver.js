import oCanvas from 'ocanvas';

export function point(x, y) {
  return {x, y};
}

function basicFigure(type, defaultProps, props) {
  return {
    type,
    props: Object.assign(defaultProps, props)
  };
}

export function ellipse(props) {
  return basicFigure('ellipse', {stroke: '1px #000'}, props);
}

export function line(props) {
  return basicFigure('line', {}, props);
}

export function text(props) {
  return basicFigure('text', {
    origin: point('center', 'center'),
    font: '12px sans-serif',
    fill: '#999'
  }, props);
}

export function resetCanvas() {
  return basicFigure('reset', {}, {});
}

export function makeOCanvasDriver(elementSelector) {
  const currentCanvas = oCanvas.create({
    canvas: elementSelector,
    background: '#FFF'
  });

  function drawFigure(figure) {
    const figureInstance = currentCanvas.display[figure.type](figure.props);
    currentCanvas.addChild(figureInstance);
  }

  return function (canvasFigures$) {
    canvasFigures$.subscribe(figures => {
      if (figures instanceof Array) {
        figures.forEach(drawFigure);
      } else if (figures.type === 'reset') {
        currentCanvas.reset();
      } else {
        drawFigure(figures);
      }
    });

    return currentCanvas;
  };
}
