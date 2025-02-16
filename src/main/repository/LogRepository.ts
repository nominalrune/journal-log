import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LogRepository {
  async createLog(data) {
    return await prisma.log.create({ data });
  }

  async getLogById(id) {
    return await prisma.log.findUnique({ where: { id } });
  }

  async updateLog(id, data) {
    return await prisma.log.update({ where: { id }, data });
  }

  async deleteLog(id) {
    return await prisma.log.delete({ where: { id } });
  }

  async listLogs() {
    return await prisma.log.findMany();
  }
}

export default new LogRepository();
