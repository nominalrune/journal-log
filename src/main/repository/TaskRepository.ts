import { PrismaClient } from '@prisma/client';
import { NewTaskType } from '../../renderer/features/tasks/schema/NewTaskSchema';
import { EditTaskType } from '../../renderer/features/tasks/schema/EditTaskSchema';

const prisma = new PrismaClient();

class TaskRepository {
  async createTask(data: NewTaskType) {
    return await prisma.task.create({ data });
  }

  async getTaskById(id: number) {
    return await prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id: number, data: EditTaskType) {
    return await prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: number) {
    return await prisma.task.delete({ where: { id } });
  }

  async listTasks() {
    return await prisma.task.findMany();
  }
}

export default new TaskRepository();
