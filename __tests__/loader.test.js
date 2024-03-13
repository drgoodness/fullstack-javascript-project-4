import nock from 'nock';
import { loadResource } from '../src/loader.js';

describe('loadResource()', () => {
  it('should throw an error once a resource does not exist', async () => {
    nock('https://test')
      .get('/page')
      .reply(404, '');

    const url = 'https://test/page';

    expect.assertions(1);
    try {
      await loadResource(url);
    } catch (e) {
      expect(e.message).toBe(`Failed to load ${url}`);
    }
  });
});
