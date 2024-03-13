import fsp from 'node:fs/promises';
import path from 'node:path';
import { formatName } from './formatter.js';

const generateFilePath = (dir, url, ending = '') => path.join(dir, formatName(url.href, ending));

const createDir = (dirPath) => fsp.mkdir(dirPath, { recursive: true })
  .catch(() => {
    throw new Error(`Failed to create ${dirPath}`);
  });

const saveFile = (file) => fsp.writeFile(file.filePath, file.data)
  .catch(() => {
    throw new Error(`Failed to save ${file.filePath}`);
  });

const saveFiles = (files) => {
  const writeFilePs = files.map((file) => saveFile(file));
  return Promise.all(writeFilePs);
};

export {
  generateFilePath, createDir, saveFile, saveFiles,
};
