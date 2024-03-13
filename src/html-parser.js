import * as cheerio from 'cheerio';
import debugLogger from './logger.js';

export default class HtmlParser {
  constructor(html, linkFormatter) {
    this.linkFormatter = linkFormatter;
    this.html = html;
    this.$ = cheerio.load(html);
  }

  getLinksBy(tag, attr) {
    const links = [];
    this.$(tag).each((i, el) => {
      const link = this.$(el).attr(attr);
      if (this.linkFormatter.isValidLink(link)) {
        links.push(this.linkFormatter.normalizeLink(link));
      }
    });

    return [...new Set(links)];
  }

  getLinks(searchedLinks) {
    const links = searchedLinks.map((link) => {
      const { tag, attr } = link;
      return this.getLinksBy(tag, attr);
    });
    const result = links.flat(1);
    debugLogger(`Found links:\n${result}`);
    return [...new Set(result)];
  }

  formatLinksBy(tag, attr) {
    this.$(tag).each((i, el) => {
      const link = this.$(el).attr(attr);
      if (this.linkFormatter.isValidLink(link)) {
        this.$(el).attr(
          attr,
          this.linkFormatter.getLocalLink(this.linkFormatter.normalizeLink(link)),
        );
      }
    });

    return this;
  }

  formatLinks(searchedLinks) {
    searchedLinks.forEach((link) => {
      const { tag, attr } = link;
      return this.formatLinksBy(tag, attr);
    });
    return this;
  }

  build() {
    const newHtml = this.$.html();
    debugLogger(newHtml);

    return newHtml;
  }
}
