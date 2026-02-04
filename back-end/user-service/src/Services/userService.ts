import type { CreateUserDTO } from "../DTO/createUser.dto.js";
import type { LoginUserDTO } from "../DTO/loginUser.dto.js";
import { User } from "../Models/User.js";
import { UserRepository } from "../Repository/userRepository.js";
import { hashPassword, checkPassword } from "../Utils/hashedPasswordUtils.js";

export class UserService {
    constructor(private repo: UserRepository) { }

    async createUser(data: CreateUserDTO): Promise<User> {
        const { name, email, password } = data
        const exists = await this.repo.findByEmail(email);
        if (exists) throw new Error("Email already in use");

        const hashedPassword = await hashPassword(password)
        const user = new User(name, email, hashedPassword);
        return this.repo.save(user);
    }

    async login(data: LoginUserDTO): Promise<User | null> {
        const {email, plainPassword} = data 
        const user = await this.repo.findByEmail(email);
        if (!user) return null;

        const valid = await checkPassword(plainPassword, user.password);
        if (!valid) return null;

        return user;
    }
}