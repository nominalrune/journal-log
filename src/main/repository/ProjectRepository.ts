import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProjectRepository {
  async createProject(data) {
    return await prisma.project.create({ data });
  }

  async getProjectById(id) {
    return await prisma.project.findUnique({ where: { id } });
  }

  async updateProject(id, data) {
    return await prisma.project.update({ where: { id }, data });
  }

  async deleteProject(id) {
    return await prisma.project.delete({ where: { id } });
  }

  async listProjects() {
    return await prisma.project.findMany();
  }
}

export default new ProjectRepository();
