import { describe, it, expect } from 'vitest';
import { transform } from './transform';

describe('transform.react', () => {
  it('should transform SVG to React component', async () => {
    const svg = `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>`;
    const result = await transform.react(svg, 'TestIcon');

    console.log(result);

    expect(result).toContain('function TestIcon');
    // expect(result).toContain('id="TestIcon"');
    expect(result).toContain('const ForwardRef = forwardRef(TestIcon)');
  });
});
