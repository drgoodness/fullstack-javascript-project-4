import nock from 'nock';
import { loadResource } from '../src/loader.js';

describe('loadResource()', () => {
  it('should throw an error once a resource does not exist', async () => {
    nock('https://test')
      .get('/page')
      .reply(404, '');

    const url = 'https://test/page';

    await expect(loadResource(url)).rejects.toThrow(`Failed to load ${url}`);
  });
});
