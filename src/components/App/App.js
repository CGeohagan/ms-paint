import { useState } from 'react';

import ColorPanel from '../ColorPanel';
import Canvas from '../Canvas';
import ToolPanel from '../ToolPanel';
import Header from '../Header';

function App() {
  const [currentColor, setCurrentColor] = useState('#cfaca3');
  const [currentTool, setCurrentTool] = useState('draw');
  console.log('hi colleen inside app', currentTool, setCurrentTool);

  return (
    <div className='app-wrapper'>
      <Header />
      <div className='main-wrapper'>
        <ToolPanel currentTool={currentTool} setCurrentTool={setCurrentTool} />
        <Canvas currentColor={currentColor} currentTool={currentTool} />
      </div>
      <ColorPanel
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
    </div>
  );
}

export default App;
