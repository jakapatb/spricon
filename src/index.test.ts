import { describe, it, expect } from 'vitest';
import { buildSpriteIcons } from './index';

describe('buildSpriteIcons', () => {
  it('should be defined', () => {
    expect(buildSpriteIcons).toBeDefined();
  });

  it('should build sprite icons', async () => {
    await buildSpriteIcons({
      input: './src/tests/assets',
      output: {
        spritePath: './src/tests/sprite',
        distPath: './src/tests/dist',
      },
    });

    // expect(result).toBeDefined();
  });
});
