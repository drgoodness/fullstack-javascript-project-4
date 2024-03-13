import path from 'node:path';
import debugLogger from './logger.js';
import { DataEntry } from './loader.js';

function formatName(name, ending = '') {
  const nameWoProtocol = name.replace(/^https?:\/\//i, '');
  const formattedName = nameWoProtocol.replace(/[^a-zA-Z0-9\s]/g, '-');
  return `${formattedName}${ending}`;
}

class LinkFormatter {
  constructor(url) {
    this.url = url;
    this.filesDirName = formatName(url.href, '_files');
  }

  getLocalLink(link) {
    const linkUrl = new URL(link);
    const { hostname } = linkUrl;
    const { pathname } = linkUrl;
    const ext = path.extname(pathname);
    const pathnameWoExt = linkUrl.pathname.slice(0, -ext.length);
    if (pathname === this.url.pathname) {
      return path.join(this.filesDirName, formatName(`${hostname}${pathname}`, '.html'));
    }
    return path.join(this.filesDirName, formatName(`${hostname}${pathnameWoExt}`, ext));
  }

  isValidLink(link) {
    debugLogger(`Validated link: ${link}`);
    if (link === null || typeof link === 'undefined') {
      return false;
    }
    return !link.includes('http') || link.includes(this.url.origin);
  }

  normalizeLink(link) {
    if (!link.includes(this.url.origin)) {
      return `${this.url.origin}${link}`;
    }
    return link;
  }

  addLocalPath(dir, files) {
    const result = files.map((file) => {
      const { link, data } = file;
      const filePath = path.join(dir, this.getLocalLink(link));
      return new DataEntry(link, data, filePath);
    });
    return result;
  }
}

export { formatName, LinkFormatter };
