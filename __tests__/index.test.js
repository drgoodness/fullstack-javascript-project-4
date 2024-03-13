import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import nock from 'nock';
import load from '../src/index.js';

const testDirPrefix = 'page-loader-';
const osTmpDir = os.tmpdir();

const getFixturePath = (filename, dir = '') => path.join(__dirname, '..', '__fixtures__', dir, filename);
const getAssetPath = (filename) => getFixturePath(filename, 'assets');
const getAssetPathInTempDir = (dir, filename) => path.join(dir, 'ru-hexlet-io-courses_files', filename);

const removeItemsWithPrefixInDir = async (dir, prefix) => {
  const dirItems = await fsp.readdir(dir);
  const removedDirPsList = dirItems
    .filter((item) => item.includes(prefix))
    .map((item) => {
      const testDirPath = path.join(dir, item);
      console.log(`Removed directory: ${testDirPath}`);
      return fsp.rm(testDirPath, { recursive: true, force: true });
    });
  console.log('Removed temporary test folders.');

  return Promise.all(removedDirPsList);
};

const createResponseMock = async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .replyWithFile(200, getFixturePath('original.html'))
    .get('/assets/professions/nodejs.png')
    .replyWithFile(200, getAssetPath('nodejs.png'))
    .get('/assets/application.css')
    .replyWithFile(200, getAssetPath('application.css'))
    .get('/packs/js/runtime.js')
    .replyWithFile(200, getAssetPath('runtime.js'))
    .get('/courses')
    .replyWithFile(200, getAssetPath('courses.html'));
  console.log('Created HTTP mocks.');
};

beforeAll(async () => {
  await createResponseMock();
});

afterAll(async () => {
  await removeItemsWithPrefixInDir(osTmpDir, testDirPrefix);
});

describe('load()', () => {
  let tempTestDir;

  beforeEach(async () => {
    tempTestDir = await fsp.mkdtemp(path.join(osTmpDir, testDirPrefix));
    console.log(`Created directory: ${tempTestDir}`);
  });

  it('should load data correctly', async () => {
    const expectedFormattedHtmlPs = fsp.readFile(getFixturePath('formatted.html'), 'utf-8');
    const expectedHtmlPs = fsp.readFile(getAssetPath('courses.html'), 'utf-8');
    const expectedImgPs = fsp.readFile(getAssetPath('nodejs.png'), 'utf-8');
    const expectedCssPs = fsp.readFile(getAssetPath('application.css'), 'utf-8');
    const expectedJsPs = fsp.readFile(getAssetPath('runtime.js'), 'utf-8');

    await load('https://ru.hexlet.io/courses', tempTestDir);
    const actualFormattedHtmlPs = fsp.readFile(path.join(tempTestDir, 'ru-hexlet-io-courses.html'), 'utf-8');
    const actualHtmlPs = fsp.readFile(getAssetPathInTempDir(tempTestDir, 'ru-hexlet-io-courses.html'), 'utf-8');
    const actualImgPs = fsp.readFile(getAssetPathInTempDir(tempTestDir, 'ru-hexlet-io-assets-professions-nodejs.png'), 'utf-8');
    const actualCssPs = fsp.readFile(getAssetPathInTempDir(tempTestDir, 'ru-hexlet-io-assets-application.css'), 'utf-8');
    const actualJsPs = fsp.readFile(getAssetPathInTempDir(tempTestDir, 'ru-hexlet-io-packs-js-runtime.js'), 'utf-8');

    const [
      expectedFormattedHtml,
      actualFormattedHtml,
      expectedHtml,
      actualHtml,
      expectedImg,
      actualImg,
      expectedCss,
      actualCss,
      expectedJs,
      actualJs,
    ] = await Promise.all([
      expectedFormattedHtmlPs,
      actualFormattedHtmlPs,
      expectedHtmlPs,
      actualHtmlPs,
      expectedImgPs,
      actualImgPs,
      expectedCssPs,
      actualCssPs,
      expectedJsPs,
      actualJsPs,
    ]);

    expect(actualFormattedHtml).toBe(expectedFormattedHtml);
    expect(actualHtml).toBe(expectedHtml);
    expect(actualImg).toBe(expectedImg);
    expect(actualCss).toBe(expectedCss);
    expect(actualJs).toBe(expectedJs);
  });
});
