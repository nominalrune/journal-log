import { PrismaClient } from '@prisma/client';
import { NewUserType } from '../../renderer/features/users/schema/NewUserSchema';
import { EditUserType } from '../../renderer/features/users/schema/EditUserSchema';

const prisma = new PrismaClient();

class UserRepository {
  async createUser(data: NewUserType) {
    return await prisma.user.create({ data });
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  }
  
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async updateUser(id: number, data: EditUserType) {
    return await prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({ where: { id } });
  }

  async listUsers() {
    return await prisma.user.findMany({
      
    });
  }
}

export default new UserRepository();
