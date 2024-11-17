import React from 'react';
import HomeIcon from './generated/HomeIcon';
import { SettingsIcon } from './generated';

export function App() {
  return (
    <div>
      <h1>Icon Examples</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <HomeIcon width={24} height={24} />
        <SettingsIcon width={24} height={24} />
      </div>
    </div>
  );
}
