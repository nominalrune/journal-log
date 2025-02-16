import { ipcRenderer } from 'electron';
import { NewUserType } from '../schema/NewUserSchema';
import { EditUserType } from '../schema/EditUserSchema';
import Project from '../../projects/models/Project';
import Task from '../../tasks/models/Task';
import Log from '../../logs/models/Log';
import { UserType } from '../schema/UserSchema';

class User {
  id: number;
  email: string;
  name?: string;
  projects?: Project[];
  tasks?: Task[];
  logs?: Log[];

  static async create(data: NewUserType) {
    return await ipcRenderer.invoke('add-user', data);
  }

  async update(data: EditUserType) {
    return await ipcRenderer.invoke('edit-user', this.id, data);
  }

  async delete() {
    return await ipcRenderer.invoke('remove-user', this.id);
  }

  static async list() {
    return await ipcRenderer.invoke('list-users');
  }

  static async find(id: number) {
    return await ipcRenderer.invoke('view-user', id);
  }

  constructor(data: UserType) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    if (data.projects) {
      this.projects = data.projects.map((project) => new Project(project));
    }
    if (data.tasks) {
      this.tasks = data.tasks.map((task) => new Task(task));
    }
    if (data.logs) {
      this.logs = data.logs.map((log) => new Log(log));
    }
  }
}

export default User;
