import { describe, it, expect, vi } from 'vitest';
import * as fs from 'fs/promises';
import { ensureWrite } from '../file';

vi.mock('fs/promises');

describe('ensureWrite', () => {
  it('should create directory and write file', async () => {
    const mockMkdir = vi.spyOn(fs, 'mkdir');
    const mockWriteFile = vi.spyOn(fs, 'writeFile');

    await ensureWrite('/path/to/file.txt', 'content');

    expect(mockMkdir).toHaveBeenCalledWith('/path/to', { recursive: true });
    expect(mockWriteFile).toHaveBeenCalledWith('/path/to/file.txt', 'content', 'utf8');
  });
});
