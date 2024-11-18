import React from 'react';
import * as GeneratedIcons from './generated';

export function App() {
  return (
    <div>
      <h1>Icon Examples</h1>
      <div style={{ display: 'flex', gap: '1rem', color: 'red', fontSize: '4rem' }}>
        {Object.entries(GeneratedIcons).map(([key, Icon]) => {
          return (
            <Icon
              key={key}
              strokeWidth={1}
              name={key.replace('Icon', '') as any}
              style={{ width: '64px', height: '64px' }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
