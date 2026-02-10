import { type Player, PlayerType, Gender } from "../../generated/prisma/client.js";
import { prisma } from "../DB/prismaClient.js";


interface CreatePlayerInput {
  id_user: string;
  type: PlayerType;
  gender: Gender;
  title?: string;
}

export class PlayerRepository {

  async createPlayer(input: CreatePlayerInput): Promise<Player> {
    const { id_user, type, gender, title } = input;

    const player = await prisma.player.create({
      data: {
        id_user,
        type,
        gender,
        title: title ?? null,
        xp: 0,
        level: 1,
        life: 100,
        isDead: false,
      },
    });

    return player;
  }
}