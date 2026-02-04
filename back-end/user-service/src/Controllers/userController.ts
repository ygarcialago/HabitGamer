import type { Request, Response } from "express";
import { UserService } from "../Services/userService.js";
import { UserRepository } from "../Repository/userRepository.js";

const repo = new UserRepository();
const service = new UserService(repo);

export class UserController {
    static async save(req: Request, res: Response) {
        try {
            const { nameApp ,email, password } = req.body;
            const user = await service.createUser(nameApp, email, password);

            if (!user) return res.status(301).json({ error: "Fallo al guardar usuario" });

            res.json({ id: user.id, email: user.email, name: user.nameApp });
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }
    
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await service.login(email, password);

            if (!user) return res.status(401).json({ error: "Credenciales incorrectas" });

            res.json({ id: user.id, email: user.email, name: user.nameApp });
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

}
