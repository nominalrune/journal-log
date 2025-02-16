import { ipcRenderer } from 'electron';
import { NewLogType } from '../schema/NewLogSchema';
import { EditLogType } from '../schema/EditLogSchema';
import Task from '../../tasks/models/Task';
import User from '../../users/models/User';
import { LogType } from '../schema/LogSchema';

class Log {
  id: number;
  taskId: number;
  task?: Task;
  userId: number;
  user?: User;
  createdAt: Date;
  updatedAt?: Date;

  static async create(data: NewLogType) {
    return await ipcRenderer.invoke('add-log', data);
  }

  async update(data: EditLogType) {
    return await ipcRenderer.invoke('edit-log', this.id, data);
  }

  async delete() {
    return await ipcRenderer.invoke('remove-log', this.id);
  }

  static async list() {
    return await ipcRenderer.invoke('list-logs');
  }

  static async find(id: number) {
    return await ipcRenderer.invoke('view-log', id);
  }

  constructor(data: LogType) {
    this.id = data.id;
    this.taskId = data.taskId;
    if (data.task) {
      this.task = new Task(data.task);
    }
    this.userId = data.userId;
    if (data.user) {
      this.user = new User(data.user);
    }
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
  }
}

export default Log;
