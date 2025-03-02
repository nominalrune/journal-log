import ipcRenderer from '@/util/ipcRenderer';
import { NewLogType } from '../schema/NewLogSchema';
import { EditLogType } from '../schema/EditLogSchema';
import Task from '../../tasks/models/Task';
import User from '../../users/models/User';
import { LogSchema, LogTypeWithRelations } from '../schema/LogSchema';

class Log {
  id: number;
  taskId: number;
  task?: Task;
  userId: number;
  user?: User;
  createdAt: Date;
  updatedAt?: Date;

  static async create(data: NewLogType) {
    const result = await ipcRenderer.invoke('add-log', data);
    return new Log(LogSchema.parse(result));
  }

  async update(data: EditLogType) {
    const result = LogSchema.parse(await ipcRenderer.invoke('edit-log', this.id, data));
    return new Log(result);
  }

  async delete() {
    return await ipcRenderer.invoke('remove-log', this.id);
  }

  static async list() {
    const result = await ipcRenderer.invoke('list-logs');
    return result.map((log: unknown) => new Log(LogSchema.parse(log)));
  }

  static async find(id: number) {
    const result = await ipcRenderer.invoke('view-log', id);
    return new Log(result);
  }
  toJSON() {
    return {
      id: this.id,
      taskId: this.taskId,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  constructor(data: LogTypeWithRelations) {
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
