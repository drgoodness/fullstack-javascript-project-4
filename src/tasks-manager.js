import Listr from 'listr';

export default class TaskManager {
  constructor() {
    this.tasks = [];
    this.results = [];
  }

  add(taskTitle, func, ...funcArgs) {
    this.tasks.push({
      title: taskTitle,
      task: () => func(...funcArgs).then((data) => this.results.push(data)),
    });
    return this;
  }

  execute() {
    const tasks = new Listr(this.tasks, { concurrent: true });
    return tasks.run().then(() => this.results);
  }
}
