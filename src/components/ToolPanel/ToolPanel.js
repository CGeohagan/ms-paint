import ToolButtons from '../ToolButtons';

function ToolPanel({ currentTool, setCurrentTool }) {
  console.log('hi colleen inside tool panel', setCurrentTool);
  return (
    <div className='tool-panel'>
      <ToolButtons currentTool={currentTool} setCurrentTool={setCurrentTool} />
    </div>
  );
}

export default ToolPanel;
