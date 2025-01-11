const colorPalette = [
  { color: 'pink', hex: '#cfaca3' },
  { color: 'red', hex: '#802517' },
  { color: 'orange', hex: '#bb672e' },
  { color: 'yellow', hex: '#d39f4b' },
  { color: 'gold', hex: '#90521a' },
  { color: 'brown', hex: '#67452b' },
  { color: 'green', hex: '#58603c' },
  { color: 'blue', hex: '#0a1e2d' },
  { color: 'paleblue', hex: '#94a9c0' },
  { color: 'purple', hex: '#9c8896' },
  { color: 'lightgray', hex: '#cdcdcd' },
  { color: 'white', hex: '#ffffff' },
  { color: 'black', hex: '#000000' },
];

function ColorPanel({ currentColor, setCurrentColor }) {
  return (
    <div className='color-panel'>
      <div className='color-title'>
        <p>Colors</p>
      </div>
      <div className='colors'>
        {colorPalette.map(({ hex }, index) => {
          return (
            <div key={hex}>
              <input
                type='radio'
                name='color'
                id={hex}
                value={hex}
                checked={hex === currentColor}
                onChange={(event) => {
                  setCurrentColor(event.target.value);
                }}
                style={{ backgroundColor: hex }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ColorPanel;
