import ToolButtons from '../ToolButtons';

function ToolPanel({ currentTool, onToolUpdate }) {
  return (
    <div className='tool-panel'>
      <ToolButtons currentTool={currentTool} onToolUpdate={onToolUpdate} />
    </div>
  );
}

export default ToolPanel;
