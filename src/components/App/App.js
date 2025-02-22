import { useState } from 'react';

import ColorPanel from '../ColorPanel';
import Canvases from '../Canvases';
import ToolPanel from '../ToolPanel';
import Header from '../Header';

function App() {
  const [currentColor, setCurrentColor] = useState('#cfaca3');
  const [currentTool, setCurrentTool] = useState('draw');
  const [canvases, setCanvases] = useState([{ id: crypto.randomUUID() }]);
  const [currentCanvasId, setCurrentCanvasId] = useState('');

  function onToolUpdate(tool) {
    setCurrentTool(tool);
    addCanvas();
  }

  function addCanvas() {
    const newCanvas = { id: crypto.randomUUID() };
    const updatedCanvases = [...canvases, newCanvas];
    setCanvases(updatedCanvases);
    setCurrentCanvasId(newCanvas.id);
  }

  return (
    <div className='app-wrapper'>
      <Header />
      <div className='main-wrapper'>
        <ToolPanel currentTool={currentTool} onToolUpdate={onToolUpdate} />
        <Canvases
          currentColor={currentColor}
          currentTool={currentTool}
          canvases={canvases}
          addCanvas={addCanvas}
          currentCanvasId={currentCanvasId}
        />
      </div>
      <ColorPanel
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
    </div>
  );
}

export default App;
