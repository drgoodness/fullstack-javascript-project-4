import { LinkFormatter, formatName } from '../src/formatter.js';

describe('formatName()', () => {
  it('should format a name with the default ending', () => {
    const name = 'https://example.com/page';

    const formattedName = formatName(name);

    expect(formattedName).toBe('example-com-page');
  });
});

describe('linkFormatter', () => {
  it('isValid() should format a name with the default ending', () => {
    const url = new URL('https://example.com/page');
    const link = undefined;

    const isValid = new LinkFormatter(url).isValidLink(link);

    expect(isValid).toBe(false);
  });
});
