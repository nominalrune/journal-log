import { ipcRenderer } from 'electron';
import { NewProjectType } from '../schema/NewProjectSchema';
import { EditProjectType } from '../schema/EditProjectSchema';
import User from '../../users/models/User';
import Task from '../../tasks/models/Task';
import { ProjectType } from '../schema/ProjectSchema';

class Project {
  id: number;
  title: string;
  description?: string;
  owner?: User;
  ownerId: number;
  tasks?: Task[];
  static async create(data: NewProjectType) {
    return await ipcRenderer.invoke('add-project', data);
  }

  async update(data: EditProjectType) {
    return await ipcRenderer.invoke('edit-project', this.id, data);
  }

  async delete() {
    return await ipcRenderer.invoke('remove-project', this.id);
  }

  static async list() {
    return await ipcRenderer.invoke('list-projects');
  }

  static async find(id: number) {
    return await ipcRenderer.invoke('view-project', id);
  }
  constructor(data: ProjectType) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.ownerId = data.ownerId;
    if (data.owner) {
      this.owner = new User(data.owner);
    }
    if (data.tasks) {
      this.tasks = data.tasks.map((task) => new Task(task));
    }
  }
}

export default Project;
