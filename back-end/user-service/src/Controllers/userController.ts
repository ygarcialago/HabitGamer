import type { Request, Response } from "express";
import { UserService } from "../Services/userService.js";
import { UserRepository } from "../Repository/userRepository.js";
import type { CreateUserDTO } from "../DTO/createUser.dto.js";
import type { LoginUserDTO } from "../DTO/loginUser.dto.js";

const repo = new UserRepository();
const service = new UserService(repo);

export class UserController {
    static async save(req: Request, res: Response) {
        try {
            const requestData: CreateUserDTO = req.body;
            const user = await service.createUser(requestData);

            if (!user) return res.status(301).json({ error: "Fallo al guardar usuario" });

            res.json({ id: user.id, email: user.email, name: user.nameApp });
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const requestData: LoginUserDTO = req.body;
            const user = await service.login(requestData);

            if (!user) return res.status(401).json({ error: "Credenciales incorrectas" });

            res.json({ id: user.id, email: user.email, name: user.nameApp });
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

}
