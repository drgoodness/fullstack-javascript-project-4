import 'axios-debug-log';
import { LinkFormatter } from './formatter.js';
import { loadResource, loadFiles, DataEntry } from './loader.js';
import {
  generateFilePath, createDir, saveFile, saveFiles,
} from './files-manager.js';
import HtmlParser from './html-parser.js';

const SearchedLinks = [
  { tag: 'img', attr: 'src' },
  { tag: 'link', attr: 'href' },
  { tag: 'script', attr: 'src' },
];

export default function load(url, dir = process.cwd()) {
  const urll = new URL(url);
  const linkFormatter = new LinkFormatter(urll);
  const htmlFilePath = generateFilePath(dir, urll, '.html');
  const filesDirPath = generateFilePath(dir, urll, '_files');

  let htmlParser;

  return loadResource(url)
    .then(({ data }) => {
      htmlParser = new HtmlParser(data, linkFormatter);
      return htmlParser;
    })
    .then(() => createDir(filesDirPath))
    .then(() => htmlParser.getLinks(SearchedLinks))
    .then((links) => loadFiles(links))
    .then((files) => linkFormatter.addLocalPath(dir, files))
    .then((files) => saveFiles(files))
    .then(() => htmlParser.formatLinks(SearchedLinks).build())
    .then((html) => saveFile(new DataEntry(url, html, htmlFilePath)));
}
