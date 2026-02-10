import type { Request, Response } from "express";
import { HabitService } from "../Service/habitLogService.js";
import { HabitRepository } from "../Repository/habitRepository.js";
import { HabitLogRepository } from "../Repository/habitLogRepository.js";

const habitRepo = new HabitRepository();
const logRepo = new HabitLogRepository();
const habitService = new HabitService(habitRepo, logRepo);

export class HabitLogController {
    // POST /habits/:habitId/mark
    static async markHabit(req: Request, res: Response) {
        try {
            const habitId = req.params.habitId;

            if (!habitId || Array.isArray(habitId)) {
                return res.status(400).json({ success: false, message: "habitId inválido" });
            }

            const userId = Number(req.body.userId);

            const log = await habitService.markHabit(habitId, userId);
            res.status(200).json({
                success: true,
                data: {
                    habitLogId: log.id,
                    habitId: log.habitId,
                    date: log.date,
                    completed: log.completed,
                },
            });
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    // GET /habits/:habitId/streak
    static async getStreak(req: Request, res: Response) {
        try {
            const habitId = req.params.habitId;

            if (!habitId || Array.isArray(habitId)) {
                return res.status(400).json({ success: false, message: "habitId inválido" });
            }

            const streak = await habitService.getStreak(habitId);
            res.status(200).json({
                success: true,
                data: { habitId, streak },
            });
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    // POST /habits/:habitId/unmark
    static async unmarkHabit(req: Request, res: Response) {
        try {
            const habitId = req.params.habitId;

            if (!habitId || Array.isArray(habitId)) {
                return res.status(400).json({ success: false, message: "habitId inválido" });
            }

            const log = await habitService.unmarkHabit(habitId);

            res.status(200).json({
                success: true,
                data: {
                    habitLogId: log.id,
                    habitId: log.habitId,
                    date: log.date,
                    completed: log.completed,
                },
            });
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    // POST /habits/:habitId/undo
    static async undoLastCheck(req: Request, res: Response) {
        try {
            const habitId = req.params.habitId;

            if (!habitId || Array.isArray(habitId)) {
                return res.status(400).json({ success: false, message: "habitId inválido" });
            }

            await habitService.undoLastCheck(habitId);

            res.status(200).json({
                success: true,
                message: "Last habit check undone",
            });
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

}
