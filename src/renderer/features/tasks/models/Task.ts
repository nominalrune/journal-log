import ipcRenderer from '@/util/ipcRenderer';
import { NewTaskType } from '../schema/NewTaskSchema';
import { EditTaskType } from '../schema/EditTaskSchema';
import Project from '../../projects/models/Project';
import User from '../../users/models/User';
import Log from '../../logs/models/Log';
import { TaskSchema, TaskSchemaWithRelations, TaskTypeWithRelations } from '../schema/TaskSchema';

class Task {
  id: number;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'PENDING';
  title: string;
  description?: string | null;
  projectId: number;
  project?: Project;
  parentId?: number | null;
  parent?: Task;
  children?: Task[];
  logs?: Log[];
  assignedToId?: number | null;
  assignedTo?: User;
  createdAt: Date;
  updatedAt?: Date;

  static async create(data: NewTaskType) {
    const result = await ipcRenderer.invoke('add-task', data);
    return new Task(TaskSchemaWithRelations.parse(result));
  }

  async update(data: EditTaskType) {
    const result = await ipcRenderer.invoke('edit-task', this.id, data);
    return new Task(result);
  }

  async delete() {
    return await ipcRenderer.invoke('remove-task', this.id);
  }

  static async list() {
    const result = await ipcRenderer.invoke('list-tasks');
    return result.map((task: unknown) => new Task(TaskSchemaWithRelations.parse(task)));
  }

  static async find(id: number) {
    const result = await ipcRenderer.invoke('view-task', id);
    return new Task(result);
  }
  toJSON() {
    return {
      id: this.id,
      status: this.status,
      title: this.title,
      description: this.description,
      projectId: this.projectId,
      parentId: this.parentId,
      assignedToId: this.assignedToId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  constructor(data: TaskTypeWithRelations) {
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
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
  }
}

export default Task;
