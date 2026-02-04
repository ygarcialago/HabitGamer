import { prisma } from '../DB/prismaClient.js'
import { User } from '../Models/User.js'

export class UserRepository {
    async save(user: User): Promise<User> {
        const created = await prisma.user.create({
            data: {
                nameApp: user.nameApp,
                email: user.email,
                password: user.password,
            },
        });

        return new User(created.nameApp, created.email, created.password, created.id);
    }

    async findByEmail(email: string): Promise<User | null> {
        const u = await prisma.user.findUnique({ where: { email } });
        if (!u) return null;

        return new User(u.nameApp, u.email, u.password, u.id);
    }
}