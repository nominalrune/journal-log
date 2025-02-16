import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaskRepository {
  async createTask(data) {
    return await prisma.task.create({ data });
  }

  async getTaskById(id) {
    return await prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id, data) {
    return await prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id) {
    return await prisma.task.delete({ where: { id } });
  }

  async listTasks() {
    return await prisma.task.findMany();
  }
}

export default new TaskRepository();
