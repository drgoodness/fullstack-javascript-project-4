import axios from 'axios';
import TaskManager from './tasks-manager.js';

class DataEntry {
  constructor(link, data, filePath = '') {
    this.link = link;
    this.data = data;
    this.filePath = filePath;
  }
}

const loadResource = (url, respType = '') => axios.get(url, { responseType: respType })
  .catch(() => {
    throw new Error(`Failed to load ${url}`);
  });

const loadFile = (link) => loadResource(link, 'arraybuffer')
  .then((response) => new DataEntry(link, response.data));

const loadFiles = (links) => {
  const taskManager = new TaskManager();
  links.forEach((link) => taskManager.add(`Loading of ${link}`, loadFile, link));
  const result = taskManager.execute();
  return result;
};

export { DataEntry, loadResource, loadFiles };
