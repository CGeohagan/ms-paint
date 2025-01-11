import { useRef, useEffect, useState } from 'react';

// create new context for each time you draw a new element except for default draw tool

function Canvas({ currentColor, currentTool }) {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(undefined);
  const [context, setContext] = useState(undefined);
  const [lineWidth, setLineWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);

  // when you click the button it changes to the different options
  // also set a new canvas each time??
  // for drawLine, drawRectangle, drawCircle, set new canvas on mouse down

  useEffect(() => {
    setCanvas(canvasRef.current);
    if (!canvas) return;

    setContext(canvas.getContext('2d'));
    fitToContainer(canvas);
  }, [canvasRef.current]);

  // create a new canvas when the tool changes
  // for certain tools on mouseDown

  useEffect(() => {
    if (!canvas) return;
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
    };
  }, [canvas]);

  useEffect(() => {
    // only reset this if we are drawing with pencil
    if (currentTool === 'draw') {
      setPrevX(x);
      setPrevY(y);
    }

    if (isDrawing) {
      drawLine(context, prevX, prevY, x, y);
    }
  }, [x, y, isDrawing]);

  function fitToContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function onMouseDown(e) {
    setIsDrawing(true);
    setPrevX(e.offsetX);
    setPrevY(e.offsetY);
  }

  function onMouseMove(e) {
    setX(e.offsetX);
    setY(e.offsetY);
  }

  function onMouseUp(e) {
    setX(0);
    setY(0);
    setIsDrawing(false);
  }

  function draw(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = currentColor;
    context.lineWidth = lineWidth;
    context.lineJoin = 'miter';
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
  }

  function drawLine(context, x1, y1, x2, y2) {
    // Clear the canvas every time the x2 changes so we only have 1 straight line
    clearContext(context);
    draw(context, x1, y1, x2, y2);
  }

  function clearContext(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  return (
    <div className='canvas-wrapper'>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
