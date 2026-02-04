import { User } from "../Models/User.js";
import { UserRepository } from "../Repository/userRepository.js";
import { hashPassword, checkPassword } from "../Utils/hashedPasswordUtils.js";

export class UserService {
    constructor(private repo: UserRepository) { }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const exists = await this.repo.findByEmail(email);
        if (exists) throw new Error("Email already in use");

        const hashedPassword = await hashPassword(password)
        const user = new User(name, email, hashedPassword);
        return this.repo.save(user);
    }

    async login(email: string, plainPassword: string): Promise<User | null> {
    const user = await this.repo.findByEmail(email);
    if (!user) return null;

    const valid = await checkPassword(plainPassword, user.password);
    if (!valid) return null;

    return user;
  }
}