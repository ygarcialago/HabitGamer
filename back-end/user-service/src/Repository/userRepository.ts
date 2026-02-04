import { prisma } from '../DB/prismaClient.js'
import { User } from '../Models/User.js'

export class UserRepository {
    async save(user: User): Promise<User> {
    const created = await prisma.user.create({ data: user });
    return new User(created.id, created.nameApp, created.email, created.password);
  }

  async findByEmail(email: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { email } });
    return u ? new User(u.id, u.nameApp, u.email, u.password) : null;
  }

  
}