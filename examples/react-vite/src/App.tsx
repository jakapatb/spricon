import React from 'react';
import HomeIcon from './generated/HomeIcon';
import { SettingsIcon } from './generated';

export function App() {
  return (
    <div>
      <h1>Icon Examples</h1>
      <div style={{ display: 'flex', gap: '1rem', color: 'red', fontSize: '4rem' }}>
        <HomeIcon strokeWidth={1} />
        <SettingsIcon strokeWidth={1} />
      </div>
    </div>
  );
}

export default App;
