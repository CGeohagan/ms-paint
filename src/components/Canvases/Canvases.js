import { useRef, useEffect, useState, createRef, useMemo } from 'react';

// create new context for each time you draw a new element except for default draw tool

function Canvases({
  currentColor,
  currentTool,
  canvases,
  addCanvas,
  currentCanvasId,
}) {
  const canvasElementsRef = useRef([]);
  const canvasWrapperRef = useRef(null);
  const [context, setContext] = useState(undefined);
  const [lineWidth, setLineWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const toolMethods = {
    draw,
    drawLine,
  };

  const canvasLength = canvases.length;

  canvasElementsRef.current = useMemo(
    () => canvasElementsRef.current.slice(0, canvasLength),
    [canvasLength]
  );

  useEffect(() => {
    console.log('up here canvases', canvasLength);
    const currentCanvas = canvasElementsRef.current[canvasLength - 1];

    // set current canvas to the most index (do we want to change this to id?)
    if (!currentCanvas) return;
    setContext(currentCanvas.getContext('2d'));
    fitToContainer(currentCanvas);

    console.log('end current', canvasElementsRef.current);
  }, [canvasLength, canvasElementsRef?.current]);

  // Set up mouse event listeners
  useEffect(() => {
    if (!canvasWrapperRef.current) return;
    const canvasWrapper = canvasWrapperRef.current;
    canvasWrapper.addEventListener('mousedown', onMouseDown);
    canvasWrapper.addEventListener('mousemove', onMouseMove);
    canvasWrapper.addEventListener('mouseup', onMouseUp);

    return () => {
      canvasWrapper.removeEventListener('mousedown', onMouseDown);
      canvasWrapper.removeEventListener('mousemove', onMouseMove);
      canvasWrapper.removeEventListener('mouseup', onMouseUp);
    };
  }, [canvasWrapperRef.current]);

  // Set up drawing
  useEffect(() => {
    // only reset this if we are drawing with pencil
    if (currentTool === 'draw') {
      setPrevX(x);
      setPrevY(y);
    }

    if (isDrawing) {
      toolMethods[currentTool](context, prevX, prevY, x, y);
    }
  }, [x, y, isDrawing, currentTool, context]);

  function clearContext(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  function fitToContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function onMouseDown(e) {
    setIsDrawing(true);
    // if not 'draw' add another canvas??
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

  return (
    <div className='canvas-wrapper' ref={canvasWrapperRef}>
      {canvases.map((item, index) => {
        return (
          <canvas
            ref={(el) => (canvasElementsRef.current[index] = el)}
            data-id={item.id}
            key={item.id}
          />
        );
      })}
    </div>
  );
}

export default Canvases;
