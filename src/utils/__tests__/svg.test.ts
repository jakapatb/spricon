import { describe, it, expect } from 'vitest';
import { getSvgIconContent } from '../svg';

describe('getSvgIconContent', () => {
  it('should generate correct svg content', () => {
    const result = getSvgIconContent('TestIcon', 'sprite-123');
    expect(result).toContain('href="/sprite-icons/sprite-123.svg#TestIcon"');
    expect(result).toContain('<svg');
    expect(result).toContain('</svg>');
  });
});
