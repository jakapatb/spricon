import * as fs from 'fs/promises';
import { dirname } from 'path';
import glob from 'glob';

export const ensureWrite = async (fileName: string, text: string): Promise<void> => {
  await fs.mkdir(dirname(fileName), { recursive: true });
  await fs.writeFile(fileName, text, 'utf8');
};

export const ensureCleanFiles = async (globFile: string): Promise<void> => {
  const files = await glob.sync(globFile);
  await Promise.all(files.map((file: string) => fs.rm(file, { recursive: true, force: true })));
};
