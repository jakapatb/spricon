import * as fs from 'fs/promises';
import { dirname } from 'path';

export const ensureWrite = async (fileName: string, text: string): Promise<void> => {
  await fs.mkdir(dirname(fileName), { recursive: true });
  await fs.writeFile(fileName, text, 'utf8');
};
