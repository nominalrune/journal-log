import { Prisma, PrismaClient } from '@prisma/client';
import { EditProjectType } from '../../renderer/features/projects/schema/EditProjectSchema';
import { NewProjectType } from '../../renderer/features/projects/schema/NewProjectSchema';
import { DefaultArgs } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

class ProjectRepository {
  async createProject(data: NewProjectType) {
    console.log({data})
    return await prisma.project.create({ data });
  }

  async getProjectById(id:number) {
    return await prisma.project.findUnique({ where: { id }, include: { tasks: true } });
  }

  async updateProject(id:number, data: EditProjectType) {
    const result = await prisma.project.update({ where: { id }, data, include: { tasks: true } });
    console.log({result})
    return result;
  }

  async deleteProject(id:number) {
    return await prisma.project.delete({ where: { id } });
  }

  async listProjects(param?:Prisma.ProjectFindManyArgs<DefaultArgs>) {
    return await prisma.project.findMany(param);
  }
}

export default new ProjectRepository();
