import type { Request, Response } from "express";
import { PlayerService } from "../Service/playerService.js";
import { PlayerRepository } from "../Repository/playerRepository.js";
import { PlayerType, Gender } from "../../generated/prisma/client.js";

const playerService = new PlayerService(new PlayerRepository());

export class PlayerController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_user, type, gender, title } = req.body;

      if (!id_user || !type || !gender) {
        return res.status(400).json({
          message: "id_user, type and gender are required",
        });
      }

      const player = await playerService.createPlayer({
        id_user,
        type: type as PlayerType,
        gender: gender as Gender,
        title,
      });

      return res.status(201).json(player);

    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Error creating player",
      });
    }
  }

  static async addExperience(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { amount } = req.body;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          message: "Invalid player id",
        });
      }

      const player = await playerService.addExperience(id, amount);

      return res.status(200).json(player);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async takeDamage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { damage } = req.body;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          message: "Invalid player id",
        });
      }

      const player = await playerService.takeDamage(id, damage);

      return res.status(200).json(player);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

}
