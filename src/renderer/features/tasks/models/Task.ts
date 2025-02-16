import { ipcRenderer } from 'electron';
import { NewTaskType } from '../schema/NewTaskSchema';
import { EditTaskType } from '../schema/EditTaskSchema';
import Project from '../../projects/models/Project';
import User from '../../users/models/User';
import Log from '../../logs/models/Log';
import { TaskType } from '../schema/TaskSchema';

class Task {
  id: number;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'PENDING';
  title: string;
  description?: string;
  projectId: number;
  project?: Project;
  parentId?: number;
  parent?: Task;
  children?: Task[];
  logs?: Log[];
  assignedToId?: number;
  assignedTo?: User;

  static async create(data: NewTaskType) {
    return await ipcRenderer.invoke('add-task', data);
  }

  async update(data: EditTaskType) {
    return await ipcRenderer.invoke('edit-task', this.id, data);
  }

  async delete() {
    return await ipcRenderer.invoke('remove-task', this.id);
  }

  static async list() {
    return await ipcRenderer.invoke('list-tasks');
  }

  static async find(id: number) {
    return await ipcRenderer.invoke('view-task', id);
  }

  constructor(data: TaskType) {
    this.id = data.id;
    this.status = data.status;
    this.title = data.title;
    this.description = data.description;
    this.projectId = data.projectId;
    if (data.project) {
      this.project = new Project(data.project);
    }
    this.parentId = data.parentId;
    if (data.parent) {
      this.parent = new Task(data.parent);
    }
    if (data.children) {
      this.children = data.children.map((child) => new Task(child));
    }
    if (data.logs) {
      this.logs = data.logs.map((log) => new Log(log));
    }
    this.assignedToId = data.assignedToId;
    if (data.assignedTo) {
      this.assignedTo = new User(data.assignedTo);
    }
  }
}

export default Task;
