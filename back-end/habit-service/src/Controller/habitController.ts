import type { Request, Response } from "express";
import type { CreateHabitDTO } from "../DTO/createHabit.dto.js";
import { HabitRepository } from "../Repository/habitRepository.js";
import { HabitService } from "../Service/habitService.js";
import type { changeActivenessHabitDTO } from "../DTO/changeActivenessHabit.dto.js";

const repo = new HabitRepository();
const service = new HabitService(repo);

export class HabitController {
    static async save(req: Request, res: Response) {
        try {
            const requestData: CreateHabitDTO = req.body;
            const habit = await service.createHabit(requestData);

            if (!habit) return res.status(301).json({ error: "Fallo al guardar hábito" });

            res.json({
                id: habit.id,
                userId: habit.userId,
                name: habit.name,
                description: habit.description,
                kind: habit.kind,
                frequency: habit.frequency,
                impact: habit.impact,
                value: habit.value,
                isActive: habit.isActive,
                createdAt: habit.createdAt,
                updatedAt: habit.updatedAt,
            });

        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    static async changeActiveness(req: Request, res: Response) {
        try {
            const requestData: changeActivenessHabitDTO = req.body;
            const habit = await service.changeActiveness(requestData);

            if (!habit) return res.status(301).json({ error: "Fallo al guardar hábito" });

            res.json({
                id: habit.id,
                userId: habit.userId,
                name: habit.name,
                description: habit.description,
                kind: habit.kind,
                frequency: habit.frequency,
                impact: habit.impact,
                value: habit.value,
                isActive: habit.isActive,
                createdAt: habit.createdAt,
                updatedAt: habit.updatedAt,
            });

        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    // GET /users/:userId/habits
    static async getUserHabits(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            if (!userId) {
                return res.status(400).json({ success: false, message: "userId inválido" });
            }

            const habits = await service.getUserHabits(userId);
            res.status(200).json({
                habits,
            });
        } catch (err: any) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}