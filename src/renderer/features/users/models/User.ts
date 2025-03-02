import ipcRenderer from '@/util/ipcRenderer';
import { NewUserType } from '../schema/NewUserSchema';
import { EditUserType } from '../schema/EditUserSchema';
import Project from '../../projects/models/Project';
import Task from '../../tasks/models/Task';
import Log from '../../logs/models/Log';
import { UserSchemaWithRelations, UserType, UserTypeWithRelations } from '../schema/UserSchema';
import { ProjectType } from '../../projects/schema/ProjectSchema';
import { TaskType } from '../../tasks/schema/TaskSchema';
import { LogType } from '../../logs/schema/LogSchema';

class User {
  id: number;
  email: string;
  name?: string;
  projects?: Project[];
  tasks?: Task[];
  logs?: Log[];

  static async create(data: NewUserType) {
    const result = await ipcRenderer.invoke('add-user', data);
    return new User(result);
  }

  async update(data: EditUserType) {
    const result = await ipcRenderer.invoke('edit-user', this.id, data);
    return new User(result);
  }

  async delete() {
    return await ipcRenderer.invoke('remove-user', this.id);
  }

  static async list() {
    const result = await ipcRenderer.invoke('list-users');
    return result.map((user: unknown) => new User(UserSchemaWithRelations.parse(user)));
  }

  static async find(id: number) {
    const result = await ipcRenderer.invoke('view-user', id);
    return new User(result);
  }
    
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    };
  }
  constructor(data: UserTypeWithRelations) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    if (data.projects) {
      this.projects = data.projects.map((project: ProjectType) => new Project(project));
    }
    if (data.tasks) {
      this.tasks = data.tasks.map((task: TaskType) => new Task(task));
    }
    if (data.logs) {
      this.logs = data.logs.map((log: LogType) => new Log(log));
    }
  }
}

export default User;
