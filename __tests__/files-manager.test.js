import fsp from 'node:fs/promises';
import { generateFilePath, createDir, saveFile } from '../src/files-manager.js';
import { DataEntry } from '../src/loader.js';

describe('generateFilePath()', () => {
  it('should generate a file path with the default ending', () => {
    const dir = '/root/dir';
    const url = new URL('https://example.com/page');

    const filePath = generateFilePath(dir, url);

    expect(filePath).toBe('/root/dir/example-com-page');
  });
});

describe('createDir()', () => {
  it('should throw an error when directory creation fails', async () => {
    const dir = '/root/dir';
    jest.spyOn(fsp, 'mkdir').mockRejectedValue(new Error('Mock error'));

    await expect(createDir(dir)).rejects.toThrow(`Failed to create ${dir}`);
  });
});

describe('saveFile()', () => {
  it('should throw an error once it is impossible to write a file', async () => {
    const dataEntry = new DataEntry('/link', '', '/root/dir');
    jest.spyOn(fsp, 'writeFile').mockRejectedValue(new Error('Mock error'));

    await expect(saveFile(dataEntry)).rejects.toThrow(`Failed to save ${dataEntry.filePath}`);
  });
});
