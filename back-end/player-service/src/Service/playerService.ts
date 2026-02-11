import { type Player, PlayerType, Gender } from "../../generated/prisma/client.js";
import { PlayerRepository } from "../Repository/playerRepository.js";

interface CreatePlayerDTO {
  id_user: string;
  type: PlayerType;
  gender: Gender;
  title?: string;
}

export class PlayerService {
  constructor(private playerRepository: PlayerRepository) {}

  async createPlayer(data: CreatePlayerDTO): Promise<Player> {

    const existing = await this.playerRepository.getPlayerByUserId(data.id_user);

    if (existing) {
      throw new Error("Player already exists for this user");
    }

    return this.playerRepository.createPlayer(data);
  }

}
