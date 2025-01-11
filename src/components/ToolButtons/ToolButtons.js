import { BsPencilFill } from 'react-icons/bs';
import { MdRectangle } from 'react-icons/md';
import { MdCircle } from 'react-icons/md';
import Line from '../Line';

function ToolButtons({ currentTool, setCurrentTool }) {
  // ['draw', 'drawLine', 'drawCircle', 'drawRectangle', 'text']

  const toolButtons = [
    {
      tool: 'draw',
      Icon: BsPencilFill,
    },
    {
      tool: 'drawLine',
      Icon: Line,
    },
    {
      tool: 'drawRectangle',
      Icon: MdRectangle,
    },
    {
      tool: 'drawCircle',
      Icon: MdCircle,
    },
  ];
  console.log('hi colleen currentTool', currentTool);

  return (
    <div className='tool-buttons'>
      {toolButtons.map(({ Icon, tool }, index) => {
        return (
          <div key={index} className='tool-wrapper'>
            <input
              type='radio'
              name='tool'
              id={tool}
              value={tool}
              checked={tool === currentTool}
              onChange={(event) => {
                setCurrentTool(event.target.value);
              }}
            />
            <Icon />
          </div>
        );
      })}
    </div>
  );
}

export default ToolButtons;
