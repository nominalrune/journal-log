import { PrismaClient } from '@prisma/client';
import { NewLogType } from '../../renderer/features/logs/schema/NewLogSchema';
import { EditLogType } from '../../renderer/features/logs/schema/EditLogSchema';

const prisma = new PrismaClient();

class LogRepository {
  async createLog(data: NewLogType) {
    return await prisma.log.create({ data });
  }

  async getLogById(id: number) {
    return await prisma.log.findUnique({ where: { id } });
  }

  async updateLog(id: number, data: EditLogType) {
    return await prisma.log.update({ where: { id }, data });
  }

  async deleteLog(id: number) {
    return await prisma.log.delete({ where: { id } });
  }

  async listLogs() {
    return await prisma.log.findMany();
  }
}

export default new LogRepository();
