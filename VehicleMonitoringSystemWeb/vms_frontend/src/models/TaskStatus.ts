export default class TaskStatus {
  public static getDefaultStatuses() {
    return [
      new TaskStatus(1, 'Created'),
      new TaskStatus(2, 'In progress'),
      new TaskStatus(3, 'Resolved'),
      new TaskStatus(4, 'Closed'),
    ]
  }

  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
