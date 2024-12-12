import { describe, it, expect } from 'vitest';
import { buildSpriteIcons } from './index';
import fs from 'fs/promises';
import { ensureWrite } from './utils/file';

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

    // Read the generated sprite file
    const spriteContent = await fs.readFile('./src/tests/sprite/sprite-icons.svg', 'utf-8');
    expect(spriteContent).toBeDefined();
    expect(spriteContent).toContain('<svg');
    expect(spriteContent).toContain('</svg>');

    // Read the generated component files
    const distFiles = await fs.readdir('./src/tests/dist');
    expect(distFiles.length).toBeGreaterThan(0);

    // Check for Icon.tsx and index.ts
    expect(distFiles).toContain('Icon.tsx');
    expect(distFiles).toContain('index.ts');

    // Check that component files were generated
    const componentFiles = distFiles.filter((file) => file.endsWith('Icon.tsx'));

    expect(componentFiles.length).toBeGreaterThan(0);
    const { ICON_NAME_LIST } = await import('./tests/dist/index');

    await ensureWrite(
      `${__dirname}/tests/sprite/index.html`,
      `
      <html>
        <body>
          <ul>
            ${ICON_NAME_LIST.map(
              (name) => `
              <svg>
                <use href="./sprite-icons.svg#${name}Icon" />
              </svg>
              `,
            ).join('\n')}
          </ul>
        </body>
      </html>
      `,
    );
  });
});
