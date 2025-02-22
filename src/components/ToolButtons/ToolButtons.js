import { BsPencilFill } from 'react-icons/bs';
import { MdRectangle } from 'react-icons/md';
import { MdCircle } from 'react-icons/md';
import Line from '../Line';

function ToolButtons({ currentTool, onToolUpdate }) {
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
                onToolUpdate(event.target.value);
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
