import { NewProjectType } from '../schema/NewProjectSchema';
import { EditProjectType, EditSubmitData } from '../schema/EditProjectSchema';
import User from '../../users/models/User';
import Task from '../../tasks/models/Task';
import { ProjectSchemaWithRelations, ProjectTypeWithRelations } from '../schema/ProjectSchema';
import prisma from '@/util/prisma';
import ipcRenderer from '@/util/ipcRenderer';
import type { Prisma } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';
class Project {
  id: number;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  title: string;
  description?: string | null;
  owner?: User;
  ownerId: number;
  tasks?: Task[];
  createdAt: Date;
  updatedAt?: Date;
  static async create(data: NewProjectType) {
    // const result = await prisma.project.create({ data });
    const result = await ipcRenderer.invoke('add-project', data);
    console.log({ result });
    return new Project(result);
  }

  async update(data: EditSubmitData) {
    // const result = await prisma.project.update({ where: { id: this.id }, data });
    const result = await ipcRenderer.invoke('edit-project', this.id, data);
    return new Project(result);
  }

  async delete() {
    // return await prisma.project.delete({ where: { id: this.id } });
    return await ipcRenderer.invoke('remove-project', this.id);
  }

  static async list(param: Prisma.ProjectFindManyArgs<DefaultArgs> ={}): Promise<Project[]> {
    // const result = await prisma.project.findMany(param);
    const result = await ipcRenderer.invoke('list-projects', param) ?? [];
    // console.log("list",{result});
    return result.map((project: unknown) => new Project(ProjectSchemaWithRelations.parse(project)));
  }

  static async find(id: number) {
    // const result = await prisma.project.findUnique({ where: { id } });
    const result = await ipcRenderer.invoke('view-project', id);
    return result ? new Project(result) : undefined;
  }
  toJSON() {
    return {
      id: this.id,
      status: this.status,
      title: this.title,
      description: this.description,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  toEdit(): EditProjectType {
    return {
      id: this.id,
      status: this.status,
      title: this.title,
      description: this.description,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tasks: this.tasks?.reduce((acc, task) => task?.id
        ? ({ ...acc, update: [...acc.update, { where: { id: task.id }, data: task }] })
        : ({ ...acc, create: [...acc.create, task] }),
        { create: [], update: [] } as { create: Task[], update: {where:{id:number},data:Task}[]; }
      )
    };
  }
  constructor(data: ProjectTypeWithRelations) {
    this.id = data.id;
    this.status = data.status;
    this.title = data.title;
    this.description = data.description;
    this.ownerId = data.ownerId;
    if (data.owner) {
      this.owner = new User(data.owner);
    }
    if (data.tasks) {
      this.tasks = data.tasks.map((task) => new Task(task));
    }
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
  }
}

export default Project;
