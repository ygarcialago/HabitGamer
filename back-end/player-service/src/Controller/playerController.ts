import type { Request, Response } from "express";
import { PlayerService } from "../Service/playerService.js";
import { PlayerRepository } from "../Repository/playerRepository.js";
import { PlayerType, Gender } from "../../generated/prisma/client.js";

const playerService = new PlayerService(new PlayerRepository());

export class PlayerController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_user, type, gender, title } = req.body;

      // Validación básica
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
}
